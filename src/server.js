require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const app = express()
const port = process.env.PORT || 5000
const { connectDB } = require('./db')
const { authRouter, usersRouter } = require('./routes/index')
const { userAuth } = require('./routes/auth/authMiddleware')
const { forceHttps } = require('./routes/auth/authController')
const { picturesRouter } = require('./routes/pictures/picturesRouter')


app.use(helmet())
app.use(forceHttps)
app.use(express.json())
app.use(cookieParser())
connectDB()


app.use('/auth', authRouter)
app.use('/users', userAuth, usersRouter)
app.use('/pictures', userAuth, picturesRouter)


const server = app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})