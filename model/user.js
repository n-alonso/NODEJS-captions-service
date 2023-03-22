const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        required: true,
        default: 'Basic'
    }
})

const User = Mongoose.model('user', UserSchema)
module.exports = { User }