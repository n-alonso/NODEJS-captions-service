const { User } = require('../../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


const register = async (req, res) => {

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

const login = async (req, res) => {

    const base64Credentials = req.headers.authorization.split(' ')[1]
    const [ username, password ] = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':')
    
    if (!username || !password) {
        return res.status(401).json({
            message: 'Unauthorized.',
            error: 'Basic Auth header missing or invalid.'
        })
    }

    try {

        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: 'Unauthorised.',
                error: 'User not found.'
            })
        } else {
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        const maxAge = 3 * 60 * 60
                        const token = jwt.sign(
                            { id: user._id, username, role: user.role },
                            jwtSecret,
                            { expiresIn: maxAge } // 3h in s
                        )
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3h in ms
                            secure: (process.env.ENVIRONMENT === 'production')
                        })
                        res.status(200).json({
                            message: 'Login successful.',
                            user
                        })
                    } else {
                        res.status(401).json({
                            message: 'Unauthorised.',
                            error: 'Incorrect password.'
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

const logOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ message: 'Logged out successfully.' })
}

const forceHttps = (req, res, next) => {
    if (req.protocol === 'https' || process.env.ENVIRONMENT !== 'production') {
        return next();
    } else {
        res.status(400).json({
            message: 'Illegal request.',
            error: 'Only HTTPS protocol allowed.'
        })
    }
}


module.exports = {
    register,
    login,
    logOut,
    forceHttps
}