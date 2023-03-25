const express = require('express')
const authRouter = express.Router()
const { register, login, logOut } = require('../../services/auth')

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/logout').get(logOut)

module.exports = {
    authRouter
}