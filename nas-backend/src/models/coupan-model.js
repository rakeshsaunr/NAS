const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,         // ensure no duplicate coupon codes
        trim: true,
        uppercase: true       // store as uppercase for consistency
    },
    discountType: {
        type: String,
        enum: ['percentage', 'flat'],  // enum instead of "values"
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 1                // must be > 0
    },
    expiry: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: 1            // total times this coupon can be used globally
    },
    usedCount: {
        type: Number,
        default: 0            // how many times it has been used so far
    },
    perUserLimit: {
        type: Number,
        default: 1            // times a single user can use
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
