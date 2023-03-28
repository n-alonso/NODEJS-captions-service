// IMPORTS
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const app = express()
const port = process.env.PORT || 5000
const { connectDB } = require('./db')
const { userAuth, forceHttps } = require('./services/index')
const { authRouter, usersRouter, picturesRouter, captionsRouter, docsRouter } = require('./routes/index')

// MIDDLEWARE
app.use(helmet())
app.use(forceHttps)
app.use(express.json())
app.use(cookieParser())
connectDB()

// ROUTES
app.use('/', docsRouter)
app.use('/auth', authRouter)
app.use('/users', userAuth, usersRouter)
app.use('/pictures', userAuth, picturesRouter)
app.use('/captions', userAuth, captionsRouter)

// SPINUP
const server = app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})