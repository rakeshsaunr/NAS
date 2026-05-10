const express = require('express')
const router = express.Router()
const {CategoryController} = require('../../controllers')
const {AuthMiddleware} = require('../../middlewares')
const parser = require('../../middlewares/upload')
const { categorySchema } = require('../../validator/category-validation')
const validate = require('../../middlewares/validate-middleware')

router.post('/',
    // AuthMiddleware.auth,
    // AuthMiddleware.isAdmin,
    validate(categorySchema),
    parser.single('image'),
    CategoryController.createCategory
)

router.get('/',
    CategoryController.getAllCategory
)

router.get('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CategoryController.getCategory
)

router.put('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    CategoryController.updateCategory
)

router.delete('/:id',
    CategoryController.deleteCategory
)

module.exports = router




