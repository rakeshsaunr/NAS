const joi = require('joi')

const emailSchema = joi.object({
    email: joi.string().email().required()
})

const otpSchema = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().required()
})


module.exports = {emailSchema,otpSchema}
