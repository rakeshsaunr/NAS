
const BlogRepository = require('../repositories/blog-repository');

const blogRepository = new BlogRepository();

async function createBlog(data) {
    const blog = await blogRepository.create(data);
    return blog;
}

async function getAllBlogs() {
    const blogs = await blogRepository.getAll();
    return blogs;
}

async function getBlog(id) {
    const blog = await blogRepository.getById(id);
    return blog;
}

async function deleteBlog(id) {
    return await blogRepository.delete(id);
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    deleteBlog
};