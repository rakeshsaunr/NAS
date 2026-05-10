const CrudRepository  = require("./crud-repository");
const { CategoryModel } = require('../models')

class CategoryRepository extends CrudRepository{
    constructor(){
        super(CategoryModel)
    }
}

module.exports = CategoryRepository