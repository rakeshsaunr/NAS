const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} = require(
  "../repositories/department-repository"
);

// CREATE
const createDepartmentService =
  async (payload) => {
    return await createDepartment(
      payload
    );
  };

// GET ALL
const getAllDepartmentsService =
  async () => {
    return await getAllDepartments();
  };

// GET SINGLE
const getDepartmentByIdService =
  async (id) => {
    return await getDepartmentById(
      id
    );
  };

// UPDATE
const updateDepartmentByIdService =
  async (id, payload) => {
    return await updateDepartmentById(
      id,
      payload
    );
  };

// DELETE
const deleteDepartmentByIdService =
  async (id) => {
    return await deleteDepartmentById(
      id
    );
  };

module.exports = {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentByIdService,
  deleteDepartmentByIdService,
};