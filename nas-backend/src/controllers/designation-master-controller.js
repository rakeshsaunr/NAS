const {
  createDesignationService,
  getAllDesignationsService,
  getDesignationByIdService,
  updateDesignationByIdService,
  deleteDesignationByIdService,
} = require(
  "../services/designation-master-service"
);

// CREATE
const createDesignation =
  async (req, res) => {
    try {
      const response =
        await createDesignationService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Designation created successfully",
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
const getAllDesignations =
  async (req, res) => {
    try {
      const response =
        await getAllDesignationsService();

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
const getDesignationById =
  async (req, res) => {
    try {
      const response =
        await getDesignationByIdService(
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
const updateDesignation =
  async (req, res) => {
    try {
      const response =
        await updateDesignationByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Designation updated successfully",
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
const deleteDesignation =
  async (req, res) => {
    try {
      await deleteDesignationByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Designation deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};