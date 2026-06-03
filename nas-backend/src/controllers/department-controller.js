const {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentByIdService,
  deleteDepartmentByIdService,
} = require(
  "../services/department-service"
);

// CREATE
const createDepartment =
  async (req, res) => {
    try {
      const response =
        await createDepartmentService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Department created successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL
const getAllDepartments =
  async (req, res) => {
    try {
      const response =
        await getAllDepartmentsService();

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET SINGLE
const getDepartmentById =
  async (req, res) => {
    try {
      const response =
        await getDepartmentByIdService(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE
const updateDepartment =
  async (req, res) => {
    try {
      const response =
        await updateDepartmentByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Department updated successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE
const deleteDepartment =
  async (req, res) => {
    try {
      await deleteDepartmentByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Department deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};