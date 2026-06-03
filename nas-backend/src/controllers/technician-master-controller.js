const {
  createTechnicianMasterService,
  getAllTechnicianMastersService,
  getTechnicianMasterByIdService,
  updateTechnicianMasterByIdService,
  deleteTechnicianMasterByIdService,
} = require(
  "../services/technician-master-service"
);

// CREATE
const createTechnicianMaster =
  async (req, res) => {
    try {
      const response =
        await createTechnicianMasterService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Technician created successfully",
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
const getAllTechnicianMasters =
  async (req, res) => {
    try {
      const response =
        await getAllTechnicianMastersService();

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
const getTechnicianMasterById =
  async (req, res) => {
    try {
      const response =
        await getTechnicianMasterByIdService(
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
const updateTechnicianMaster =
  async (req, res) => {
    try {
      const response =
        await updateTechnicianMasterByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Technician updated successfully",
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
const deleteTechnicianMaster =
  async (req, res) => {
    try {
      await deleteTechnicianMasterByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Technician deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createTechnicianMaster,
  getAllTechnicianMasters,
  getTechnicianMasterById,
  updateTechnicianMaster,
  deleteTechnicianMaster,
};