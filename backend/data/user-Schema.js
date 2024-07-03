const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
        min: 6,
        max: 8,
    },
    accessToken: [String],
    verificationCode: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 4,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    chat: [{
        user: mongoose.Schema.Types.ObjectId,
        message: String,
    }]
}, { timeseries: true })

module.exports = mongoose.model('users', usersSchema);