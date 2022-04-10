const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'superadmin'
    }

})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User