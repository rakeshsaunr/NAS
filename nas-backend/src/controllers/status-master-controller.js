const {
  createStatusMasterService,
  getAllStatusMastersService,
  getStatusMasterByIdService,
  updateStatusMasterByIdService,
  deleteStatusMasterByIdService,
} = require(
  "../services/status-master-service"
);

// CREATE
const createStatusMaster =
  async (req, res) => {
    try {
      const response =
        await createStatusMasterService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Status created successfully",
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
const getAllStatusMasters =
  async (req, res) => {
    try {
      const response =
        await getAllStatusMastersService();

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
const getStatusMasterById =
  async (req, res) => {
    try {
      const response =
        await getStatusMasterByIdService(
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
const updateStatusMaster =
  async (req, res) => {
    try {
      const response =
        await updateStatusMasterByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Status updated successfully",
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
const deleteStatusMaster =
  async (req, res) => {
    try {
      await deleteStatusMasterByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Status deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createStatusMaster,
  getAllStatusMasters,
  getStatusMasterById,
  updateStatusMaster,
  deleteStatusMaster,
};