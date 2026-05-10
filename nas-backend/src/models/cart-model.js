const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required: true},
            quantity: {type:Number,default:1},
            price: {type: Number,required: true} // snapshot of product price
        }
    ]
})

cartSchema.virtual("totalAmount").get(function() {
    return this.items.reduce((sum,item) => sum+item.price*item.quantity,0)
})

// Allow virtual in JSON response
cartSchema.set('toJSON',{virtuals:true})
cartSchema.set('toObject',{virtuals:true})

module.exports = mongoose.model('Cart',cartSchema)