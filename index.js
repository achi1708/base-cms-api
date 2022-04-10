require('dotenv').config()
require('./connection')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./controllers/Auth')
const userRouter = require('./controllers/User')
const notFound = require('./middleware/notFound')
const exceptions = require('./middleware/exceptions')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello From Windows Service !!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.use(notFound)
app.use(exceptions)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }