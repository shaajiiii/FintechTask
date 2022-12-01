const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: String,
    DOB: Date,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    occupation: String,
    company: String,
    password: String,
})

const User = mongoose.model('users', userSchema);

module.exports = { User }