const express = require("express");

const router = express.Router();

const EmployeeController = require(
  "../../controllers/employee-master-controller"
);

// =====================================
// CREATE EMPLOYEE
// =====================================

router.post(
  "/",
  EmployeeController.createEmployee
);

// =====================================
// GET ALL EMPLOYEES
// =====================================

router.get(
  "/",
  EmployeeController.getAllEmployees
);

// =====================================
// GET EMPLOYEE BY ID
// =====================================

router.get(
  "/:id",
  EmployeeController.getEmployeeById
);

// =====================================
// UPDATE EMPLOYEE
// =====================================

router.put(
  "/:id",
  EmployeeController.updateEmployee
);

// =====================================
// DELETE EMPLOYEE
// =====================================

router.delete(
  "/:id",
  EmployeeController.deleteEmployee
);

module.exports = router;