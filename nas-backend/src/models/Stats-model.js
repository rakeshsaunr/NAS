const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
});

// ✅ Prevent OverwriteModelError by reusing the existing model if it's already compiled
module.exports =
  mongoose.models.Stat || mongoose.model('Stat', statSchema);
