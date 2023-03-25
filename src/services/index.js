module.exports = {
    ...require('./auth-service/authController'),
    ...require('./auth-service/authMiddleware'),
    ...require('./captions-service/captionsController'),
    ...require('./pictures-service/picturesController'),
    ...require('./users-service/usersController'),
}