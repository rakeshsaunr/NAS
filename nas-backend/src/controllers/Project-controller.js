const asyncHandler = require("../utils/async-handler");
const { AppError } = require("../utils/errors");
const ProjectService = require("../services/project-service");
// const cloudinary = require('../config/cloudinary'); // image comment out

const createProject = asyncHandler(async (req, res) => {
  // Destructure and accept optional fields: category, or
  const { title, description, category, or } = req.body;

  if (!title || !description) {
    throw new AppError(400, "Title and description are required");
  }

  const projectData = {
    title,
    description,
    // link, // link comment out
    // image: imageUrl, // image comment out
    // public_id: publicId, // image comment out
  };

  // Add 'category' or 'or' if at least one is present and valid (non-empty string)
  if (typeof category === "string" && category.trim().length > 0) {
    projectData.category = category.trim();
  } else if (typeof or === "string" && or.trim().length > 0) {
    projectData.or = or.trim();
  }

  // ProjectService.createProject will throw 400 if duplicate title found
  const created = await ProjectService.createProject(projectData);

  return res.status(201).json({
    success: true,
    message: "Project Created Successfully",
    data: created,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectService.getAllProjects();

  if (!projects || projects.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No projects found",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Projects Fetched Successfully",
    data: projects,
  });
});

const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Project Id required");

  const project = await ProjectService.getProject(id);
  if (!project) throw new AppError(404, "Project not found");

  return res.status(200).json({
    success: true,
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new AppError(400, "Project Id required");

  // Accept update for title, description, category, or
  const { title, description, category, or } = req.body;
  const updatePayload = { title, description };

  // Only include 'category' or 'or' if at least one is present and valid (non-empty string)
  if (typeof category === "string" && category.trim().length > 0) {
    updatePayload.category = category.trim();
    if (Object.prototype.hasOwnProperty.call(updatePayload, 'or')) {
      delete updatePayload.or;
    }
  } else if (typeof or === "string" && or.trim().length > 0) {
    updatePayload.or = or.trim();
    if (Object.prototype.hasOwnProperty.call(updatePayload, 'category')) {
      delete updatePayload.category;
    }
  }

  // Remove undefined fields
  Object.keys(updatePayload).forEach(key => {
    if (updatePayload[key] === undefined) delete updatePayload[key];
  });

  const updated = await ProjectService.updateProject(id, updatePayload);
  if (!updated) throw new AppError(404, "Project not found or update failed");

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: updated,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Project Id required");
  }

  const project = await ProjectService.getProject(id);

  if (!project) {
    throw new AppError(404, "Project Not Found");
  }

  // if (project.public_id) {
  //   try {
  //     await cloudinary.uploader.destroy(project.public_id);
  //   } catch (err) {
  //     console.error("Cloudinary destroy error:", err.message || err);
  //   }
  // }

  await ProjectService.deleteProject(id);

  return res.status(200).json({
    success: true,
    message: "Project Deleted Successfully"
  });
});

module.exports = {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
};
