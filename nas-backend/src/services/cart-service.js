const { CartRepository } = require('../repositories')

const cartRepository = new CartRepository()

async function createCart() {
    const cart = await cartRepository.create()
    return cart
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