const EmployeeRepository = require(
  "../repositories/employee-master-repository"
);

// =====================================
// CREATE EMPLOYEE
// =====================================

const createEmployee = async (data) => {
  return await EmployeeRepository.createEmployee(
    data
  );
};

// =====================================
// GET ALL EMPLOYEES
// =====================================

const getAllEmployees = async () => {
  return await EmployeeRepository.getAllEmployees();
};

// =====================================
// GET EMPLOYEE BY ID
// =====================================

const getEmployeeById = async (id) => {
  return await EmployeeRepository.getEmployeeById(
    id
  );
};

// =====================================
// UPDATE EMPLOYEE
// =====================================

const updateEmployee = async (
  id,
  data
) => {
  return await EmployeeRepository.updateEmployee(
    id,
    data
  );
};

// =====================================
// DELETE EMPLOYEE
// =====================================

const deleteEmployee = async (id) => {
  return await EmployeeRepository.deleteEmployee(
    id
  );
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};