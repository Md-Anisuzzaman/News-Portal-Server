const mongoose = require('mongoose');
const moment = require('moment');
const date = moment().format('LLLL');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: 'array',
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "user"
    },
    user_created_at: {
        type: String,
        default: date
    },
},
    {
        timestamps: true,
        versionKey: false
    }

);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

