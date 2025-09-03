const mongoose = require('mongoose')

const AuthenticationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Please enter a valid email address'],
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})
module.exports = mongoose.model('authuser', AuthenticationSchema)