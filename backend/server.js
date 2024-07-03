const express = require('express');
const cors = require('cors');
const mongoose = require("./db/dbConnection");
const user = require('./data/user-Schema');
const secretKey = "very-very-secret-key";
const jwt = require('jsonwebtoken');
const { signupDtoSchema, signinDtoSchema, verificationDtoSchema } = require('./data/validation');
const validate = require('./middleWare');
const bcrypt = require("bcrypt");
const { mailSender } = require('./Mailer');
const cookieParser = require("cookie-parser");
const { pusher } = require('./Pusher');
const saltRounds = 10;

const PORT = process.env.PORT || 3001;
// const host = '192.168.29.150';
const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(cookieParser());

const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

app.post('/auth/signup', validate(signupDtoSchema), async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let userDetail = await user.findOne({ email });
        if (userDetail) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const token = jwt.sign({ user: userDetail }, secretKey, { expiresIn: "1h" });

        const verificationCode = generateVerificationCode();

        const createNewUser = new user({ name, email, password: hashedPassword, accessToken: token, verificationCode });
        await createNewUser.save();

        await mailSender(email, verificationCode);

        res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

app.post('/auth/signin', validate(signinDtoSchema), async (req, res) => {
    const { email, password } = req.body;
    try {
        let userDetail = await user.findOne({ email });
        if (!userDetail) {
            return res.status(400).json({ messsage: "User Not Found" });
        }
        const isPasswordValid = await bcrypt.compare(password, userDetail.password);
        if (!isPasswordValid) {
            return res.status(400).json({ messsage: "Invalid Credentials" });
        }
        const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

        res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).send({ message: "user Logged in successfully", user: userDetail, accessToken: token });
    } catch (error) {
        return res.status(500).send({ message: "Server Error", error });
    }
});

app.post("/auth/verify-account", validate(verificationDtoSchema), async (req, res) => {
    const { verificationCode } = req.body;
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(500).json({ message: "Access Token not found in the cookies" });
    }

    try {
        const userDetail = await user.findOne({ accessToken });
        if (!userDetail) {
            return res.status(400).json({ message: "Invalid User" });
        }

        if (userDetail.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid Verification Code" });
        }

        userDetail.isVerified = true;
        await userDetail.save();

        return res.status(200).json({ message: "Account Verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get("/auth/user", async (req, res) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(500).json({ message: "Access Token not found in the cookies" });
    }

    const userDetail = await user.find({ accessToken });
    if (!user) {
        return res.status(401).send("User not found");
    }
    return res.status(200).send({ message: "access Token provided", userDetail });
})


app.get("/users", async (req, res) => {
    const users = await user.find()
    return res.status(200).json({ message: "getting all chats", data: users })
})

app.post('/message', (req, res) => {
    const { username, message } = req.body;
    pusher.trigger('chat', 'message', {
        username,
        message,
    });
    res.status(200).send('Message sent successfully');
});


app.get("/user-chat/:id", (req, res) => {
    console.log(req.params);
})


app.listen(PORT, function () {
    console.log(`Server is running on PORT:${PORT}`);
})
