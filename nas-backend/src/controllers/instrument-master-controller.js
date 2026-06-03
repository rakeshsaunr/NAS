const {
  createInstrumentMasterService,
  getAllInstrumentMastersService,
  getInstrumentMasterByIdService,
  updateInstrumentMasterByIdService,
  deleteInstrumentMasterByIdService,
} = require("../services/instrument-master-service");

// CREATE
const createInstrumentMaster = async (req, res) => {
  try {
    const response = await createInstrumentMasterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Instrument Master created successfully",
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
const getAllInstrumentMasters = async (req, res) => {
  try {
    const response = await getAllInstrumentMastersService();

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
const getInstrumentMasterById = async (req, res) => {
  try {
    const response = await getInstrumentMasterByIdService(req.params.id);

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
const updateInstrumentMaster = async (req, res) => {
  try {
    const response = await updateInstrumentMasterByIdService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Instrument Master updated successfully",
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
const deleteInstrumentMaster = async (req, res) => {
  try {
    await deleteInstrumentMasterByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Instrument Master deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInstrumentMaster,
  getAllInstrumentMasters,
  getInstrumentMasterById,
  updateInstrumentMaster,
  deleteInstrumentMaster,
};