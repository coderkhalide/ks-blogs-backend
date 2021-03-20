const Joi = require('joi')

function validateAuthBody(req){
    const authSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    })
    const {error} = authSchema.validate(req)
    return error
}

exports.validateAuthBody = validateAuthBody