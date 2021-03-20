const Joi = require('joi')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    },
    avatar: {
        type: String
    },
    lastSignIn: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.jwtToken)
    return token
}

const Users = mongoose.model('User', userSchema)

function validateUser(req){
    const userSchema = Joi.object({
        name: Joi.string().min(3).max(225).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    })
    const {error} = userSchema.validate(req)
    return error
}

function validateObjectId(req){
    const blogSchema = Joi.object({
        id: Joi.objectId().required()
    })
    const {error} = blogSchema.validate(req)
    return error
}

exports.Users = Users
exports.validateUser = validateUser
exports.validateObjectId = validateObjectId