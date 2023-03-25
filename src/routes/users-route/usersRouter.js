const express = require('express')
const usersRouter = express.Router()
const { updateUser, deleteUser, getUsers, adminAuth } = require('../../services/index')

usersRouter.route('/:id').put(adminAuth, updateUser)
usersRouter.route('/:id').delete(adminAuth, deleteUser)
usersRouter.route('/').get(adminAuth, getUsers)

module.exports = {
    usersRouter
}