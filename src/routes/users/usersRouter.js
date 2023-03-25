const express = require('express')
const usersRouter = express.Router()
const { updateUser, deleteUser, getUsers } = require('./usersController')
const { adminAuth } = require('../auth/authMiddleware')

usersRouter.route('/:id').put(adminAuth, updateUser)
usersRouter.route('/:id').delete(adminAuth, deleteUser)
usersRouter.route('/').get(adminAuth, getUsers)

module.exports = {
    usersRouter
}