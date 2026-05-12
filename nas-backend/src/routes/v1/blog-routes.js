const express = require('express');
const router = express.Router();
const { AuthMiddleware } = require('../../middlewares');
const { BlogController } = require('../../controllers');
const parser = require('../../middlewares/upload');

// Create a new blog post
router.post(
  '/',
  parser.single('image'),
  AuthMiddleware.auth,
  AuthMiddleware.isAdmin,
  BlogController.createBlog
);

// Get all blogs
router.get('/', BlogController.getAllBlogs);

// Get a single blog by id
router.get('/:id', BlogController.getBlog);

// Update a blog by id
router.put(
  '/:id',
  parser.single('image'),
  AuthMiddleware.auth,
  AuthMiddleware.isAdmin,
  BlogController.updateBlog
);

// Delete a blog by id
router.delete(
  '/:id',
  AuthMiddleware.auth,
  AuthMiddleware.isAdmin,
  BlogController.deleteBlog
);

module.exports = router;
