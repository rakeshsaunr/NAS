const express = require('express')
const router = express.Router()
const { AuthMiddleware } = require('../../middlewares')
const { BlogController }  = require('../../controllers')
const parser = require('../../middlewares/upload')

// post req to create blog
router.post('/',
    parser.single('image'),
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    BlogController.createBlog
)


// get all blogs
router.get('/',
    BlogController.getAllBlogs
)

router.delete('/:id',
    AuthMiddleware.auth,
    AuthMiddleware.isAdmin,
    BlogController.deleteBlog
)


module.exports = router