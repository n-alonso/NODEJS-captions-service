require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { connectDB } = require('./db')
const { authRouter } = require('./auth/route')

app.use(express.json())
connectDB()

app.use('/api/auth', authRouter)



const server = app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`)
})

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})