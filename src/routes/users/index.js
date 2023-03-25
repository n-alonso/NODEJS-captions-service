const express = require('express')
const usersRouter = express.Router()
const { updateUser, deleteUser, getUsers } = require('./handlers')
const { adminAuth } = require('../../middleware/auth')

usersRouter.route('/:id').put(adminAuth, updateUser)
usersRouter.route('/:id').delete(adminAuth, deleteUser)
usersRouter.route('/').get(adminAuth, getUsers)

module.exports = {
    usersRouter
}