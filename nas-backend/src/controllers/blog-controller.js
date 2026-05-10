const asyncHandler = require("../utils/async-handler");
const { AppError } = require("../utils/errors");
const { BlogService } = require("../services");
const cloudinary = require('../config/cloudinary')


const createBlog = asyncHandler(async (req, res) => {
  const { title, description, link } = req.body;

  if (!title || !description || !link) {
    throw new AppError(400, "All Fields are required");
  }

  const imageUrl = req.file.path;
  const publicId = req.file.filename;

  if (!imageUrl) {
    throw new AppError(400, "Image Url is required");
  }

  const blogData = {
    title,
    description,
    link,
    image: imageUrl,
    public_id: publicId,
  };

  await BlogService.createBlog(blogData);

  return res.status(201).json({
    success: true,
    message: "Blog Created Successfully",
  });
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogService.getAllBlogs();

  if (!blogs) {
    throw new AppError(404, "No Blogs are found");
  }

  return res.status(200).json({
    success: true,
    message: "Blogs Fetched Successfully",
    blogss: blogs,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Blog Id required");
  }

  const blog = await BlogService.getBlog(id);

  if (!blog) {
    throw new AppError(400, "Blog Not Found");
  }

  if (blog.public_id) {
    await cloudinary.uploader.destroy(blog.public_id);
  }

  await BlogService.deleteBlog(id);

  return res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully"
  })
});

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
};
