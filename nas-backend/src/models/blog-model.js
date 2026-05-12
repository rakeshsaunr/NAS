const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    tagline: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    public_id: {
        type: String
    }
})

module.exports = mongoose.model('Blog', blogSchema)
