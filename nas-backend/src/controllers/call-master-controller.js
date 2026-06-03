const {
  createCallMasterService,
  getAllCallMastersService,
  getCallMasterByIdService,
  updateCallMasterByIdService,
  deleteCallMasterByIdService,
} = require("../services/call-master-service");

// CREATE
const createCallMaster = async (req, res) => {
  try {
    const response = await createCallMasterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Call Master created successfully",
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
const getAllCallMasters = async (req, res) => {
  try {
    const response = await getAllCallMastersService();

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
const getCallMasterById = async (req, res) => {
  try {
    const response = await getCallMasterByIdService(req.params.id);

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
const updateCallMaster = async (req, res) => {
  try {
    const response = await updateCallMasterByIdService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Call Master updated successfully",
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
const deleteCallMaster = async (req, res) => {
  try {
    await deleteCallMasterByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Call Master deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCallMaster,
  getAllCallMasters,
  getCallMasterById,
  updateCallMaster,
  deleteCallMaster,
};