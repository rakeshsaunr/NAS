const CrudRepository = require('./crud-repository')
const {ProductModel} = require('../models')

class ProductRepository extends CrudRepository {
    constructor(){
        super(ProductModel)
    }

    async getAllProduct() {
        const products = await ProductModel.find().populate('category','name')
        return products
    }

    async categoryFilteredProduct(categoryId) {
            console.log("TYPE OF CATEGORY ID",categoryId)
        const products = await ProductModel.find({category:categoryId}).populate('category','name')
        return products
    }

    
    async updateProduct(id, data) {
        const product = await ProductModel.findById(id);
        if (!product) throw new Error("Product not found");

        // Update normal fields
        product.name = data.name ?? product.name;
        product.description = data.description ?? product.description;
        product.price = data.price ?? product.price;
        product.isActive = data.isActive ?? product.isActive;
        product.category = data.category ?? product.category;

        // Merge variant updates
        if (data.variant) {
            data.variant.forEach((v) => {
                const existing = product.variant.find(x => x.sku === v.sku);
                if (existing) {
                    Object.assign(existing, v); // update only the fields provided
                } else {
                    product.variant.push(v); // optional: add new variant if it doesn't exist
                }
            });
        }

        // Save updated product
        return await product.save();
    }


}

module.exports = ProductRepository