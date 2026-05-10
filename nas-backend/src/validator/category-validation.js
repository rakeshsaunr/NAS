const Joi = require('joi')

const categorySchema = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required()
})


module.exports = { categorySchema }