const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String, // Store image URL or path
        default: ''
    },
    public_id:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('Category', categorySchema);
                        