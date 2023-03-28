const express = require('express')
const authRouter = express.Router()
const { register, login, logOut } = require('../../services/index')


authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/logout').get(logOut)

module.exports = {
    authRouter
}