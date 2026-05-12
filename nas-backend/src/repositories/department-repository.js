const Department = require("../models/department-model");

// ================= CREATE =================

const create = async (data) => {
  try {
    const department = await Department.create(data);
    return department;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET ALL =================

const getAll = async () => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ createdAt: -1 });
    return departments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET SINGLE =================

const getById = async (id) => {
  try {
    const department = await Department.findById(id);
    return department;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= UPDATE =================

const update = async (id, data) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= DELETE =================

const remove = async (id) => {
  try {
    const deletedDepartment = await Department.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return deletedDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};