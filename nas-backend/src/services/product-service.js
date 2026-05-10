const { ProductRepository } = require('../repositories')
const { ProductModel } = require('../models')

const productRepository = new ProductRepository()

async function createProduct(data) {
    console.log("Inside create product repo ")
    const product = await productRepository.create(data)
    return product
}

async function getAllProducts() {
    const products = await productRepository.getAllProduct()
    if(!products || products.length===0){
        throw new Error('No Product Found')
    }
    return products
}

async function getProduct(id) {
    const product = await productRepository.getById(id)
    if(!product) {
        throw new Error('Product Not Found for that ID')
    }
    return product
}
 

async function deleteProduct(id) {
    const product = await productRepository.delete(id)
    return product
}

async function updateProduct(id, data) {
    const product = await ProductModel.findById(id);
    if (!product) throw new Error("Product not found");

    // ✅ Replace normal fields (if provided)
    product.name = data.name ?? product.name;
    product.description = data.description ?? product.description;
    product.price = data.price ?? product.price;
    product.isActive = data.isActive ?? product.isActive;
    product.category = data.category ?? product.category;

    // ✅ Delete all old images and replace with new ones
    if (data.images) {
        product.images = data.images; // overwrite everything
    }

    console.log("Data Variant is:", data.variant);

    // ✅ Handle variant updates
    if (data.variant) {
        let variants = data.variant;

        // If frontend sent it as string → parse JSON
        if (typeof variants === "string") {
            try {
                variants = JSON.parse(variants);
            } catch (err) {
                throw new Error("Invalid variant format");
            }
        }

        // Ensure it's an array
        if (!Array.isArray(variants)) {
            throw new Error("Variant must be an array");
        }

        // Merge or insert variants
        variants.forEach((v) => {
            v.stock = Number(v.stock); // ensure stock is Number

            const existing = product.variant.find(x => x.sku === v.sku);
            if (existing) {
                Object.assign(existing, v); // update existing variant
            } else {
                product.variant.push(v); // add new variant
            }
        });
    }

    return await product.save();
}


// async function updateProduct(id, data) {
//         const product = await ProductModel.findById(id);
//         if (!product) throw new Error("Product not found");

//         // ✅ Update normal fields
//         product.name = data.name ?? product.name;
//         product.description = data.description ?? product.description;
//         product.price = data.price ?? product.price;
//         product.isActive = data.isActive ?? product.isActive;
//         product.category = data.category ?? product.category;

//         // ✅ Update / Merge images
//         if (data.images && data.images.length > 0) {
//             // Merge: keep old + add new
//             product.images = [...product.images, ...data.images];
//         }

//         // ✅ Merge variant updates
//         if (data.variant) {
//             data.variant.forEach((v) => {
//                 const existing = product.variant.find(x => x.sku === v.sku);
//                 if (existing) {
//                     Object.assign(existing, v); // update only provided fields
//                 } else {
//                     product.variant.push(v); // add new variant
//                 }
//             });
//         }

//         return await product.save();
//     }  -> Working but not deleted previous images 


async function filteredByCategory(categoryId) {
    console.log("TYPE OF CATEGORY ID",categoryId)
    const product = await productRepository.categoryFilteredProduct(categoryId)
    return product
}

async function getProductFilter({}) {

}



module.exports = {
    createProduct,
    getAllProducts,
    getProductFilter,
    updateProduct,
    getProduct,
    deleteProduct,
    filteredByCategory
}           