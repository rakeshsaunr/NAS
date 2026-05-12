// src/controllers/blog-controller.js
const asyncHandler = require("../utils/async-handler");
const { AppError } = require("../utils/errors");
const BlogService = require("../services/blog-service"); // path to service file
const cloudinary = require('../config/cloudinary');

const createBlog = asyncHandler(async (req, res) => {
  const { title, tagline, description, link } = req.body;

  if (!title || !description || !link) {
    throw new AppError(400, "Title, description and link are required");
  }

  const imageUrl = req.file && req.file.path;
  const publicId = req.file && req.file.filename;

  if (!imageUrl) {
    throw new AppError(400, "Image Url is required");
  }

  const blogData = {
    title,
    tagline,
    description,
    link,
    image: imageUrl,
    public_id: publicId,
  };

  // BlogService.createBlog will throw 400 if duplicate title found
  const created = await BlogService.createBlog(blogData);

  return res.status(201).json({
    success: true,
    message: "Blog Created Successfully",
    data: created,
  });
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogService.getAllBlogs();

  if (!blogs || blogs.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No blogs found",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Blogs Fetched Successfully",
    data: blogs,
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Blog Id required");

  const blog = await BlogService.getBlog(id);
  if (!blog) throw new AppError(404, "Blog not found");

  return res.status(200).json({
    success: true,
    data: blog,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Blog Id required");

  const { title, tagline, description, link } = req.body;
  const updatePayload = { title, tagline, description, link };

  if (req.file && req.file.path) {
    const newImageUrl = req.file.path;
    const newPublicId = req.file.filename;

    const existing = await BlogService.getBlog(id);
    if (!existing) throw new AppError(404, "Blog not found");

    if (existing.public_id) {
      try {
        await cloudinary.uploader.destroy(existing.public_id);
      } catch (err) {
        console.error("Cloudinary destroy error:", err.message || err);
      }
    }

    updatePayload.image = newImageUrl;
    updatePayload.public_id = newPublicId;
  }

  Object.keys(updatePayload).forEach(key => {
    if (updatePayload[key] === undefined) delete updatePayload[key];
  });

  const updated = await BlogService.updateBlog(id, updatePayload);
  if (!updated) throw new AppError(404, "Blog not found or update failed");

  return res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: updated,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Blog Id required");
  }

  const blog = await BlogService.getBlog(id);

  if (!blog) {
    throw new AppError(404, "Blog Not Found");
  }

  if (blog.public_id) {
    try {
      await cloudinary.uploader.destroy(blog.public_id);
    } catch (err) {
      console.error("Cloudinary destroy error:", err.message || err);
    }
  }

  await BlogService.deleteBlog(id);

  return res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully"
  });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
