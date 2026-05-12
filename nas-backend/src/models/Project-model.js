const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    public_id: {
        type: String
    },
    category: {
        type: String,
    },
    or: {
        type: String,
    }
});

// Prevent OverwriteModelError: check if model already exists
module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
