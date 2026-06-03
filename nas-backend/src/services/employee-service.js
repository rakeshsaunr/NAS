// =====================================
// services/employee-service.js
// =====================================

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} = require("../repositories/employee-repository");

// CREATE
const createEmployeeService = async (payload) => {
  return createEmployee(payload);
};

// GET ALL
const getAllEmployeesService = async () => {
  return getAllEmployees();
};

// GET BY ID
const getEmployeeByIdService = async (id) => {
  return getEmployeeById(id);
};

// UPDATE
const updateEmployeeByIdService = async (id, payload) => {
  return updateEmployeeById(id, payload);
};

// DELETE
const deleteEmployeeByIdService = async (id) => {
  return deleteEmployeeById(id);
};

module.exports = {
  createEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeByIdService,
  deleteEmployeeByIdService,
};