const { CartService } = require('../services')

async function createCart(req,res) {
    try {
        const cart = await CartService.createCart(req.body)

        return res.status(201).json({
            success: true,
            message: "Cart Updated Successfully",
            data: cart
        })
    } catch (error) {
        return res.status
    }
}

async function updateItem() {
    
}

async function deleteItem() {

}

async function getCartItems() {

}

module.exports = {
    createCart,
    updateItem,
    deleteItem,
    getCartItems
}