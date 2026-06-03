const {
  createVendorMasterService,
  getAllVendorMastersService,
  getVendorMasterByIdService,
  updateVendorMasterByIdService,
  deleteVendorMasterByIdService,
} = require(
  "../services/vender-master-service"
);

// CREATE
const createVendorMaster =
  async (req, res) => {
    try {
      const response =
        await createVendorMasterService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Vendor Master created successfully",
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
const getAllVendorMasters =
  async (req, res) => {
    try {
      const response =
        await getAllVendorMastersService();

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
const getVendorMasterById =
  async (req, res) => {
    try {
      const response =
        await getVendorMasterByIdService(
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
const updateVendorMaster =
  async (req, res) => {
    try {
      const response =
        await updateVendorMasterByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Vendor Master updated successfully",
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
const deleteVendorMaster =
  async (req, res) => {
    try {
      await deleteVendorMasterByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Vendor Master deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createVendorMaster,
  getAllVendorMasters,
  getVendorMasterById,
  updateVendorMaster,
  deleteVendorMaster,
};