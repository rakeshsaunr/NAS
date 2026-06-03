const EmployeeMaster = require(
  "../models/employee-master-model"
);

// =====================================
// CREATE EMPLOYEE
// =====================================

const createEmployee = async (data) => {
  return await EmployeeMaster.create(data);
};

// =====================================
// GET ALL EMPLOYEES
// =====================================

const getAllEmployees = async () => {
  return await EmployeeMaster.find()
    .populate("division", "divisionName")
    .populate("department", "departmentName")
    .populate(
      "designation",
      "designationName"
    )
    .sort({ createdAt: -1 });
};

// =====================================
// GET EMPLOYEE BY ID
// =====================================

const getEmployeeById = async (
  id
) => {
  return await EmployeeMaster.findById(
    id
  )
    .populate("division", "divisionName")
    .populate("department", "departmentName")
    .populate(
      "designation",
      "designationName"
    );
};

// =====================================
// UPDATE EMPLOYEE
// =====================================

const updateEmployee = async (
  id,
  data
) => {
  return await EmployeeMaster.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("division", "divisionName")
    .populate("department", "departmentName")
    .populate(
      "designation",
      "designationName"
    );
};

// =====================================
// DELETE EMPLOYEE
// =====================================

const deleteEmployee = async (
  id
) => {
  return await EmployeeMaster.findByIdAndDelete(
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