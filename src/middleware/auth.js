const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err || decodedToken.role !== 'admin') {
            return res.status(403).json({ message: 'Not Authorised.', error: 'Insuficient permissions.' })
        } else {
            next()
        }
    })
}

const userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err) => {
            if (err) {
                return res.status(401).json({ message: 'Not Authorised.', error: 'JWT token invalid.' })
            } else {
                next()
            }
        })
    } else {
        return res.status(401).json({ message: 'Not Authorised.', error: 'JWT token missing.' })
    }
}

module.exports = {
    adminAuth,
    userAuth
}