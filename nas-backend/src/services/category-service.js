const { CategoryRepository } = require('../repositories')
const { AppError } = require('../utils/errors')

const categoryRepository = new CategoryRepository()

async function createCategory(data) {
    const newCategory = await categoryRepository.create(data)

    if(!newCategory) {
        throw new AppError(400,'Error in Category Creation')
    }

    return newCategory
}

async function getAllCategory() {
    const allCategory = await categoryRepository.getAll()

    if(!allCategory) {
        throw new Error('Categories Fetched Successfully')
    }

    return allCategory
}

async function getCategory(id) {
    const category = await categoryRepository.getById(id)
    if(!category) {
        throw new Error('Category Not Found')
    }
    return category
}

async function updateCategory(id,data) {
    const category = await categoryRepository.update(id,data)
    if(!category) {
        throw new Error('Category Not Found')
    }
    return category
}

async function deleteCategory(id) {
    return await categoryRepository.delete(id)
}




module.exports = {
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}