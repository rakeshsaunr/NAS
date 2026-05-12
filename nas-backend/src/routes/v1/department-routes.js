const express = require("express");

const router = express.Router();

const {
  createDepartment,
  getDepartments,
} = require(
  "../../controllers/department-controller"
);

// CREATE
router.post("/", createDepartment);

// GET ALL
router.get("/", getDepartments);

module.exports = router;