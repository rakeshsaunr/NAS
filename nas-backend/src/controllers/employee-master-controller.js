const EmployeeService = require("../services/employee-master-service");

// =====================================
// CREATE EMPLOYEE
// =====================================

const createEmployee = async (req, res) => {
  try {
    const response = await EmployeeService.createEmployee(req.body);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating employee.",
    });
  }
};

// =====================================
// GET ALL EMPLOYEES
// =====================================

const getAllEmployees = async (req, res) => {
  try {
    const response = await EmployeeService.getAllEmployees();

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving employees.",
    });
  }
};

// =====================================
// GET EMPLOYEE BY ID
// =====================================

const getEmployeeById = async (req, res) => {
  try {
    const response = await EmployeeService.getEmployeeById(req.params.id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving employee.",
    });
  }
};

// =====================================
// UPDATE EMPLOYEE
// =====================================

const updateEmployee = async (req, res) => {
  try {
    const response = await EmployeeService.updateEmployee(req.params.id, req.body);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating employee.",
    });
  }
};

// =====================================
// DELETE EMPLOYEE
// =====================================

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await EmployeeService.deleteEmployee(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting employee.",
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};