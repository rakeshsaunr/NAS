const express = require("express");

const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require(
  "../../controllers/department-controller"
);

// CREATE
router.post(
  "/",
  createDepartment
);

// GET ALL
router.get(
  "/",
  getAllDepartments
);

// GET SINGLE
router.get(
  "/:id",
  getDepartmentById
);

// UPDATE
router.put(
  "/:id",
  updateDepartment
);

// DELETE
router.delete(
  "/:id",
  deleteDepartment
);

module.exports = router;