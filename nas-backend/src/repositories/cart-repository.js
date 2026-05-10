const CrudRepository = require('./crud-repository')
const { CartModel } = require('../models') 

class CartRepository extends CrudRepository {
    constructor(){
        super(CartModel)
    }
}

module.exports = CartRepository