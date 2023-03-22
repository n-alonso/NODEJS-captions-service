const { User } = require('../model/user')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {

    const { username, password } = req.body

    if (password.length < 6) {
        return res.status(400).json({ message: 'The password needs to have more than 6 characters.' })
    }

    const hash = await bcrypt.hash(password, 10)
    await User.create({ username, password: hash })
        .then(user => res.status(200).json({
            message: 'User successfully created.',
            user
        }))
        .catch(err => res.status(401).json({
            message: 'Could not create user.',
            error: err.message
        }))

}

const login = async (req, res, next) => {

    const { username, password } = req.body
    
    if (!username || !password) return res.status(400).json({
        message: 'Username or password not present.'
    })

    try {

        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: 'Could not login.',
                error: 'User not found.'
            })
        } else {
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        res.status(200).json({
                            message: 'Login successful.',
                            user
                        })
                    } else {
                        res.status(400).json({
                            message: 'Could not login, password could not be matched.'
                        })
                    }
                })
        }

    } catch (err) {

        res.status(400).json({
            message: 'Could not login.',
            error: err.message
        })

    }

}

const update = async (req, res, next) => {

    const { role, id } = req.body

    if (role && id) {

        await User.findById(id)
            .then(user => {
                if (user.role !== role) {
                    user.role = role
                    user.save()
                        .then(user => res.status(201).json({
                                message: 'Role successfully updated.',
                                user
                            }))
                        .catch(err => {
                                res.status(400).json({
                                    message: 'Error updating role.',
                                    error: err.message
                                })
                                process.exit(1)
                            }
                        )
                } else {
                    res.status(400).json({
                        message: 'User already has that role.'
                    })
                }
            })
            .catch(err => res.status(400).json({
                    message: 'Error updating role.',
                    error: err.message
                }))

    } else {
        res.status(400).json({
            message: 'Rol or id not present.'
        })
    }
}

const deleteUser = async (req, res, next) => {

    const { id } = req.body

    await User.findByIdAndRemove(id)
        .then(user => res.status(200).json({
            message: 'User successfully deleted.',
            user
        }))
        .catch(err => res.status(400).json({
            message: 'Error deleting user.',
            error: err.message
        }))

}


module.exports = {
    register,
    login,
    update,
    deleteUser
}