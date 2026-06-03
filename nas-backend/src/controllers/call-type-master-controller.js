const {
  createCallTypeMasterService,
  getAllCallTypeMastersService,
  getCallTypeMasterByIdService,
  updateCallTypeMasterByIdService,
  deleteCallTypeMasterByIdService,
} = require("../services/call-type-master-service");

// CREATE
const createCallTypeMaster = async (req, res) => {
  try {
    const response = await createCallTypeMasterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Call Type Master created successfully",
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
const getAllCallTypeMasters = async (req, res) => {
  try {
    const response = await getAllCallTypeMastersService();

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
const getCallTypeMasterById = async (req, res) => {
  try {
    const response = await getCallTypeMasterByIdService(req.params.id);

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
const updateCallTypeMaster = async (req, res) => {
  try {
    const response = await updateCallTypeMasterByIdService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Call Type Master updated successfully",
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
const deleteCallTypeMaster = async (req, res) => {
  try {
    await deleteCallTypeMasterByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Call Type Master deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCallTypeMaster,
  getAllCallTypeMasters,
  getCallTypeMasterById,
  updateCallTypeMaster,
  deleteCallTypeMaster,
};