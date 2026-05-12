const asyncHandler = require("../utils/async-handler");
const { AppError } = require("../utils/errors");
const ProjectService = require("../services/project-service");


// ================= CREATE PROJECT =================
const createProject = asyncHandler(async (req, res) => {

  const {
    name,
    description,
    category,
    price,
    stock,
  } = req.body;

  // Validation
  if (!name || !description) {
    throw new AppError(
      400,
      "Name and description are required"
    );
  }

  const projectData = {
    name,
    description,
    category,
    price,
    stock,
  };

  const createdProject =
    await ProjectService.createProject(projectData);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: createdProject,
  });
});


// ================= GET ALL PROJECTS =================
const getAllProjects = asyncHandler(async (req, res) => {

  const projects =
    await ProjectService.getAllProjects();

  return res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});


// ================= GET SINGLE PROJECT =================
const getProject = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Project ID is required");
  }

  const project =
    await ProjectService.getProject(id);

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
});


// ================= UPDATE PROJECT =================
const updateProject = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Project ID is required");
  }

  const {
    name,
    description,
    category,
    price,
    stock,
  } = req.body;

  const updateData = {
    name,
    description,
    category,
    price,
    stock,
  };

  // Remove undefined fields
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  const updatedProject =
    await ProjectService.updateProject(
      id,
      updateData
    );

  if (!updatedProject) {
    throw new AppError(
      404,
      "Project not found"
    );
  }

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});


// ================= DELETE PROJECT =================
const deleteProject = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Project ID is required");
  }

  const deletedProject =
    await ProjectService.deleteProject(id);

  if (!deletedProject) {
    throw new AppError(
      404,
      "Project not found"
    );
  }

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});


module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};