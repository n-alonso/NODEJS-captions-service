const { User } = require('../../models/index')


const getUsers = async (req, res) => {

    await User.find({})
        .then(users => {
            const formatUsers = users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    captionIds: [ ...user.captionIds ]
                }
            })
            res.status(200).json({
                message: 'Users fetched successfully.',
                users: formatUsers
            })
        })
        .catch(err => res.status(401).json({
            message: 'Could not fetch users.',
            error: err.message
        }))

}

const updateUser = async (req, res) => {

    const { id } = req.params
    const { role } = req.body

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
            message: 'Role or id not present.'
        })
    }
}

const deleteUser = async (req, res) => {

    const { id } = req.params

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
    updateUser,
    deleteUser,
    getUsers
}