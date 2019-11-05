const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    verifiedEmail: {
        type: Boolean,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    verifiedToken: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    contactMe: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    isAdvertiser: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);