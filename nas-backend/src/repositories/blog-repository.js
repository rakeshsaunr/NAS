// src/repositories/blog-repository.js
const Blog = require('../models/blog-model');

class BlogRepository {
  // ✅ Create new blog
  async create(data) {
    return await Blog.create(data);
  }

  // ✅ Get all blogs
  async getAll() {
    return await Blog.find().sort({ createdAt: -1 });
  }

  // ✅ Get one blog by ID
  async findById(id) {
    return await Blog.findById(id);
  }

  // ✅ Alias (Fixes your error)
  async getById(id) {
    return await this.findById(id);
  }

  // ✅ Delete a blog
  async delete(id) {
    return await Blog.findByIdAndDelete(id);
  }

  // ✅ Update blog (optional)
  async update(id, data) {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = BlogRepository;
