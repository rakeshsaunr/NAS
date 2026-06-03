const {
  createDivisionMasterService,
  getAllDivisionMastersService,
  getDivisionMasterByIdService,
  updateDivisionMasterByIdService,
  deleteDivisionMasterByIdService,
} = require("../services/division-master-service");

// CREATE
const createDivisionMaster = async (req, res) => {
  try {
    const response = await createDivisionMasterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Division created successfully",
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
const getAllDivisionMasters = async (req, res) => {
  try {
    const response = await getAllDivisionMastersService();

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
const getDivisionMasterById = async (req, res) => {
  try {
    const response = await getDivisionMasterByIdService(req.params.id);

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
const updateDivisionMaster = async (req, res) => {
  try {
    const response = await updateDivisionMasterByIdService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Division updated successfully",
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
const deleteDivisionMaster = async (req, res) => {
  try {
    await deleteDivisionMasterByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Division deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDivisionMaster,
  getAllDivisionMasters,
  getDivisionMasterById,
  updateDivisionMaster,
  deleteDivisionMaster,
};