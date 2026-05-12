const { ProjectRepository } = require('../repositories');

const projectRepository = new ProjectRepository();

async function createProject(data) {
  return await projectRepository.create(data);
}

async function getAllProjects() {
  return await projectRepository.getAll();
}

async function getProject(id) {
  const project = await projectRepository.getById(id);
  if (!project) throw new Error('Project not found');
  return project;
}

async function updateProject(id, data) {
  const updated = await projectRepository.update(id, data);
  if (!updated) throw new Error('Project not found or update failed');
  return updated;
}

async function deleteProject(id) {
  const deleted = await projectRepository.delete(id);
  if (!deleted) throw new Error('Project not found or already deleted');
  return deleted;
}

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
