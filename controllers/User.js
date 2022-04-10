const User = require('../models/User')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
    const { name, username, password } = req.body

    console.log(req.body)

    if(!name || !username || !password){
        res.status(400).json({
            error: 'Bad request'
        })
    }
    
    const passEnc = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        username,
        password: passEnc
    })

    const userSaved = await newUser.save()
    res.status(201).json(userSaved)
})

module.exports = userRouter