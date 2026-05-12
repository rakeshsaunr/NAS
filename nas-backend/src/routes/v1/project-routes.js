const express = require('express');
const router = express.Router();

const { AuthMiddleware } = require('../../middlewares');
const { ProjectController } = require('../../controllers');

// ================= CREATE PROJECT =================
router.post(
  '/',
  AuthMiddleware.auth,
  ProjectController.createProject
);

// ================= GET ALL PROJECTS (optionally by category or "or") =================
router.get(
  '/',
  (req, res, next) => {
    // Support filtering by ?category=... or ?or=...
    req.filter = {};
    if (typeof req.query.category === "string" && req.query.category.trim().length > 0) {
      req.filter.category = req.query.category.trim();
    }
    if (typeof req.query.or === "string" && req.query.or.trim().length > 0) {
      req.filter.or = req.query.or.trim();
    }
    next();
  },
  (req, res, next) => {
    // Patch the controller to forward the filter
    if (Object.keys(req.filter).length > 0 && ProjectController.getAllProjects.length >= 2) {
      // If controller supports filter; optional, for extensibility
      return ProjectController.getAllProjects(req, res, next, req.filter);
    }
    // Otherwise, just call as normal (controller should extract filter itself)
    ProjectController.getAllProjects(req, res, next);
  }
);

// ================= GET SINGLE PROJECT =================
router.get(
  '/:id',
  ProjectController.getProject
);

// ================= UPDATE PROJECT =================
router.put(
  '/:id',
  AuthMiddleware.auth,
  ProjectController.updateProject
);

// ================= DELETE PROJECT =================
router.delete(
  '/:id',
  AuthMiddleware.auth,
  ProjectController.deleteProject
);

module.exports = router;