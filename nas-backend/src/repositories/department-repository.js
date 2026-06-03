const Department = require(
  "../models/department-model"
);

// CREATE
const createDepartment = async (
  payload
) => {
  return await Department.create(
    payload
  );
};

// GET ALL
const getAllDepartments =
  async () => {
    return await Department.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getDepartmentById =
  async (id) => {
    return await Department.findById(
      id
    ).lean();
  };

// UPDATE
const updateDepartmentById =
  async (id, payload) => {
    return await Department.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteDepartmentById =
  async (id) => {
    return await Department.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};