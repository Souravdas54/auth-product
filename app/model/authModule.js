const mongoose = require('mongoose')

const AuthenticationSchema = mongoose.Schema({

    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    city: { type: String, require: true },
    password: { type: String, require: true }
}, {
    timestamp: true
})
module.exports = mongoose.model('authuser', AuthenticationSchema)