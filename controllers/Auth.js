const User = require('../models/User')
const authRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./../middleware/authMiddleware')

authRouter.get('/', authMiddleware, async (req, res) => {
    console.log(req)
    res.send('Authenticated !!')
})

authRouter.post('/', async (req, res) => {
    const { user, password } = req.body

    const userFound = await User.findOne({ username: user })
    
    const passCheck = userFound === null ? false : await bcrypt.compare(password, userFound.password)

    if(!userFound || !passCheck){
        return res.status(401).json({
            error: 'User and Password are not correct'
        })
    }

    const payloadToken = {
        id: userFound._id,
        name: userFound.name,
        username: userFound.username,
        role: userFound.role
    }

    const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {expiresIn: '1d' })

    res.send({
        token
    })

})

module.exports = authRouter