const repository = require("../repositories/department-repository");

// ================= CREATE =================

const create = async (data) => {
  if (!data || !data.name) {
    throw new Error("Department Name is Required");
  }
  try {
    const department = await repository.create(data);
    return department;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET ALL =================

const getAll = async () => {
  try {
    const departments = await repository.getAll();
    return departments;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET SINGLE =================

const getById = async (id) => {
  if (!id) {
    throw new Error("ID is Required");
  }
  try {
    const department = await repository.getById(id);
    if (!department) {
      throw new Error("Department Not Found");
    }
    return department;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= UPDATE =================

const update = async (id, data) => {
  if (!id) {
    throw new Error("ID is Required");
  }
  try {
    const updatedDepartment = await repository.update(id, data);
    if (!updatedDepartment) {
      throw new Error("Department Not Found");
    }
    return updatedDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= DELETE =================

const remove = async (id) => {
  if (!id) {
    throw new Error("ID is Required");
  }
  try {
    const deletedDepartment = await repository.remove(id);
    if (!deletedDepartment) {
      throw new Error("Department Not Found");
    }
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