const express = require("express");

const router = express.Router();

const { ProjectController } = require("../../controllers");


// ================= CREATE PROJECT =================
router.post(
  "/",
  ProjectController.createProject
);


// ================= GET ALL PROJECTS =================
router.get(
  "/",
  ProjectController.getAllProjects
);


// ================= GET SINGLE PROJECT =================
router.get(
  "/:id",
  ProjectController.getProject
);


// ================= UPDATE PROJECT =================
router.put(
  "/:id",
  ProjectController.updateProject
);


// ================= DELETE PROJECT =================
router.delete(
  "/:id",
  ProjectController.deleteProject
);


// ================= EXPORT ROUTER =================
module.exports = router;