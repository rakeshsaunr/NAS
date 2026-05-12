const { BlogRepository } = require('../repositories');

const blogRepository = new BlogRepository();

async function createBlog(data) {
  return await blogRepository.create(data);
}

async function getAllBlogs() {
  return await blogRepository.getAll();
}

async function getBlog(id) {
  const blog = await blogRepository.getById(id);
  if (!blog) throw new Error('Blog not found');
  return blog;
}

async function updateBlog(id, data) {
  const updated = await blogRepository.update(id, data);
  if (!updated) throw new Error('Blog not found or update failed');
  return updated;
}

async function deleteBlog(id) {
  const deleted = await blogRepository.delete(id);
  if (!deleted) throw new Error('Blog not found or already deleted');
  return deleted;
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
