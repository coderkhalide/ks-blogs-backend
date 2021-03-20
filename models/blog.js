const Joi = require('joi')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 225
    },
    thumbnail: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blocks: {
        type: Array
    },
    categorys: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

const Blogs = mongoose.model('Blog', blogSchema)

function validateBlog(req){
    const blogSchema = Joi.object({
        title: Joi.string().required().min(1).max(225),
        thumbnail: Joi.string().required(),
        user: Joi.objectId().required(),
        blocks: Joi.array().required(),
        categorys: Joi.array().required(),
        updatedAt: Joi.string()
    })
    const {error} = blogSchema.validate(req)
    return error
}

function validateObjectId(req){
    const blogSchema = Joi.object({
        id: Joi.objectId().required()
    })
    const {error} = blogSchema.validate(req)
    return error
}

exports.Blogs = Blogs
exports.validateBlog = validateBlog
exports.validateObjectId = validateObjectId