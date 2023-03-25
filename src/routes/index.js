module.exports = {
    ...require('./auth-route/authRouter'),
    ...require('./users-route/usersRouter'),
    ...require('./pictures-route/picturesRouter'),
    ...require('./captions-route/captionsRouter')
}