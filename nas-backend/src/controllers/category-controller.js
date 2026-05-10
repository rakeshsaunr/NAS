
const {CategoryService} = require('../services')
const cloudinary = require('../config/cloudinary')
const asyncHandler = require('../utils/async-handler')
const { AppError } = require('../utils/errors')

const createCategory = asyncHandler(async(req,res) => {

    const { name,slug,description } = req.body 

    if(!name || !slug || !description) {
        throw new AppError(400,'All fields are required')
    }

    const imageUrl = req.file.path
    const publicId = req.file.filename

    if(!imageUrl) {
        throw new AppError(404,'Image Url Not Found for Category')
    }

    const categoryData = {
        name,
        slug,
        description,
        image:imageUrl,
        public_id: publicId
    }

    const newCategory = await CategoryService.createCategory(categoryData)
    
    return res.status(201).json({
        success: true,
        message: "Category Created Successfully",
        data: newCategory
    })
})


const getAllCategory = asyncHandler(async(req,res) => {
    
    const allCategory = await CategoryService.getAllCategory()

    if(!allCategory) {
        throw new AppError(404,'No Category is Found')
    }

    return res.status(200).json({
        success: true,
        message: "Category Fetched Successfully",
        categories: allCategory  
    })
})



const getCategory = asyncHandler(async(req,res) => {
    
    const { id } = req.params 
    
    if(!id) {
        throw new AppError(404,'CategoryId not found')
    }

    const category = await CategoryService.getCategory(id)

    if(!category) {
        throw new AppError(404,'No Category Found Corresponds to that ID')
    }

    return res.status(200).json({
        success: true,
        message: "Category Fetched Successfully",
        data: category
    })
})


// async function getCategory(req,res) {
//     try {
//         const { id } = req.params
//         const category = await CategoryService.getCategory(id)
//         return res.status(200).json({
//             success: true,
//             message: "Category Fetched Successfully",
//             data: category
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: "Category Fetched Failed",
//             error: error.message
//         })
//     }
// }

const updateCategory = asyncHandler(async(req,res) => {
    const { id }  = req.params

    if(!id) {
        throw new AppError(404,'Category Id Not Found')
    }


    const updateCategory = await CategoryService.updateCategory(id,req.body)

    return res.status(200).json({
        success: true,
        message: "Category Updated Successfully",
        data: updateCategory
    })
})


const deleteCategory = asyncHandler(async(req,res) => {
    const { id } = req.params

    if(!id) {
        throw new AppError(400,'Category Id Not Found')
    }

    const category = await CategoryService.getCategory(id)

    if(!category) {
        throw new AppError(404,'Category for Deletion Not Found')
    }

    if(category.public_id) {
        await cloudinary.uploader.destroy(category.public_id)
    }
    
    await CategoryService.deleteCategory(id)

    return res.status(200).json({
        success: true,
        message: "Category Deleted Successfully"
    })
})


module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    getCategory,
    deleteCategory
}