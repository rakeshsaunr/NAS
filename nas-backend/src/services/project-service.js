const { ProjectRepository } = require("../repositories");

const projectRepository = new ProjectRepository();


// ================= CREATE PROJECT =================
const createProject = async (data) => {
  try {
    return await projectRepository.create(data);

  } catch (error) {
    throw new Error(error.message);
  }
};


// ================= GET ALL PROJECTS =================
const getAllProjects = async () => {
  try {
    return await projectRepository.getAll();

  } catch (error) {
    throw new Error(error.message);
  }
};


// ================= GET SINGLE PROJECT =================
const getProject = async (id) => {
  try {
    const project = await projectRepository.getById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;

  } catch (error) {
    throw new Error(error.message);
  }
};


// ================= UPDATE PROJECT =================
const updateProject = async (id, data) => {
  try {
    const updatedProject = await projectRepository.update(
      id,
      data
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;

  } catch (error) {
    throw new Error(error.message);
  }
};


// ================= DELETE PROJECT =================
const deleteProject = async (id) => {
  try {
    const deletedProject = await projectRepository.delete(id);

    if (!deletedProject) {
      throw new Error("Project not found");
    }

    return deletedProject;

  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};