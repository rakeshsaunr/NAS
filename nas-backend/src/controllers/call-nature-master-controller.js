const {
  createCallNatureMasterService,
  getAllCallNatureMastersService,
  getCallNatureMasterByIdService,
  updateCallNatureMasterByIdService,
  deleteCallNatureMasterByIdService,
} = require(
  "../services/call-nature-master-service"
);

// CREATE
const createCallNatureMaster =
  async (req, res) => {
    try {
      const response =
        await createCallNatureMasterService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Call Nature Master created successfully",
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
const getAllCallNatureMasters =
  async (req, res) => {
    try {
      const response =
        await getAllCallNatureMastersService();

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
const getCallNatureMasterById =
  async (req, res) => {
    try {
      const response =
        await getCallNatureMasterByIdService(
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
const updateCallNatureMaster =
  async (req, res) => {
    try {
      const response =
        await updateCallNatureMasterByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Call Nature Master updated successfully",
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
const deleteCallNatureMaster =
  async (req, res) => {
    try {
      await deleteCallNatureMasterByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Call Nature Master deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createCallNatureMaster,
  getAllCallNatureMasters,
  getCallNatureMasterById,
  updateCallNatureMaster,
  deleteCallNatureMaster,
};