const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  


    name: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        // required: true,
    },

    DOB: {
        type: Date,
        // required: true
    },
    role: {
        type: String,
        enum: ['customer', 'staff', 'manager', 'admin'],
        default: 'customer'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },

    phoneNumber: {
        type: String,
        // required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Adjust for your country
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]

}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
