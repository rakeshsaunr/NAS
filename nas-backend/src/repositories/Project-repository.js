const Project = require('../models/project-model');

class ProjectRepository {
  // Create new project
  async create(data) {
    return await Project.create(data);
  }

  // Get all projects, optionally filter by category or "or" (ord)
  async getAll({ category, ord } = {}) {
    const query = {};
    if (typeof category === "string" && category.trim().length > 0) {
      query.category = category.trim();
    }
    if (typeof ord === "string" && ord.trim().length > 0) {
      query.or = ord.trim();
    }
    return await Project.find(query).sort({ createdAt: -1 });
  }

  // Get one project by ID
  async findById(id) {
    return await Project.findById(id);
  }

  // Alias for get project by ID
  async getById(id) {
    return await this.findById(id);
  }

  // Delete a project
  async delete(id) {
    return await Project.findByIdAndDelete(id);
  }

  // Update a project
  async update(id, data) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = ProjectRepository;
