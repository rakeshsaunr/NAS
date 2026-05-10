const { ProductService } = require('../services')
const cloudinary = require('../config/cloudinary')

async function createProduct(req, res) {
  try {
    const { name, description, category, price, variant } = req.body;

    console.log("Variant is:",variant)

    console.log("REQUEST FILES",req.files)

    if (!name || !description || !category || !price) {
      throw new Error("All required fields must be provided");
    }

    const images = req.files.map(file => ({ url: file.path, alt: name, public_id:file.filename }));

    console.log("Data is:",req.body)
    // Expecting variants as an array of objects: [{ color, size, stock }]
    // If variants is a JSON string (from form-data), parse it
    let parsedVariants = [];
    if (typeof variant === 'string') {
      parsedVariants = JSON.parse(variant); // make sure client sends JSON string
    } else if (Array.isArray(variant)) {
      parsedVariants = variant;
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      images,
      variant: parsedVariants,
      ratings: { average: 0, count: 0 },
      isActive: true
    };

    const product = await ProductService.createProduct(productData);

    return res.status(201).json({ success: true, message: "Product Created Successfully", data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Error in Product Creation", error: error.message });
  }
}


async function getAllProducts(req, res) { 
    try {
        const products = await ProductService.getAllProducts(req.body)
        return res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            data: products
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in Product Fetching",
            error: error.message
        })
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params 
        // console.log("User ID is:",req.user.userId)
        const product = await ProductService.getProduct(id)
        return res.status(200).json({
            success: false,
            message: "Product Fetched By ID",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in Product Fetching",
            error: error.message
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        
        // find product is present in the db or not
        const product = await ProductService.getProduct(id)

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
         
        // if product found delete its assests from the cloudinary
        const images = product.images

        // find image exist in the database or not first
        if(images && images.length > 0){
            for(const img of images) {
                if(img.public_id) {
                    try {
                        await cloudinary.uploader.destroy(img.public_id)
                    } catch (error) {
                        console.error(`Failed to delete image ${img.public_id}:`, err.message)
                    }
                }
            }
        }

        // delete product from the database 
        const deletedProduct = await ProductService.deleteProduct(id)
        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            deletedProduct: deletedProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error in Product Deletion",
            error: error.message
        })
    }
}

// ProductController.js

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        // Handle uploaded images
        if (req.files && req.files.length > 0) {
            data.images = req.files.map(file => ({
                url: file.path,
                alt: file.originalname,
                public_id: file.filename
            }));
        } else {
            // if no new images uploaded, clear images completely
            data.images = [];
        }

        const updatedProduct = await ProductService.updateProduct(id, data);

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            updatedProduct
        });
    } catch (error) {
        console.error("Error in updateProduct controller:", error);
        return res.status(400).json({
            success: false,
            message: "Error in Product Updation",
            error: error.message
        });
    }
}


// async function updateProduct(req, res) {  -> updted working but add previous image also 
//     try {
//         const { id } = req.params;
//         const data = req.body;

//         console.log("Product Update body is:", data);
//         console.log("Uploaded files:", req.files);

//         // Handle uploaded images (map them to schema format)
//         if (req.files && req.files.length > 0) {
//             data.images = req.files.map(file => ({
//                 url: file.path,            // cloudinary/multer gives path
//                 alt: file.originalname,    // optional: use filename as alt text
//                 public_id: file.filename   // depends on your uploader
//             }));
//         }

//         const updatedProduct = await ProductService.updateProduct(id, data);

//         return res.status(200).json({
//             success: true,
//             message: "Product Updated Successfully",
//             updatedProduct
//         });
//     } catch (error) {
//         console.error("Error in updateProduct controller:", error);
//         return res.status(400).json({
//             success: false,
//             message: "Error in Product Updation",
//             error: error.message
//         });
//     }
// }




// async function updateProduct(req, res) {
//     try {
//         const { id } = req.params
//         const data = req.body
//         console.log("Product Update body is:",data)


        
//         const updatedProduct = await ProductService.updateProduct(id,data)
//         return res.status(200).json({
//             success: true,
//             message: "Product Updated Successfully",
//             updatedProduct: updatedProduct
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: "Error in Product Updation",
//             error: error.message
//         })
//     }
// }                    

async function filteredByCategory(req,res) {
    try {
        const products = await ProductService.filteredByCategory(req.params.id)
        return res.status(200).json({
            success: true,
            data : products
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: "Error in the fetching category related products",
            error: error.message
        })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    filteredByCategory
}