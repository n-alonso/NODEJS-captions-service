const express = require('express')
const authRouter = express.Router()
const { register, login, update, deleteUser } = require('./auth')

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/update').post(update)
authRouter.route('/deleteUser').post(deleteUser)

module.exports = {
    authRouter
}