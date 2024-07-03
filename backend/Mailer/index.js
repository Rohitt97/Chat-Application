const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "rohittkumawat97@gmail.com",
        pass: "7cmI6PynG5bj4qEO",
    },
});

const mailSender = (email, verificationCode) => {
    return transporter.sendMail({
        to: email,
        from: "rohittkumawat97@gmail.com",
        subject: "Verification Code",
        text: `your Verification Code ${verificationCode}`,
    });
}
module.exports = { transporter, mailSender };