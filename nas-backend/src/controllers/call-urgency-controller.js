const {
  createCallUrgencyService,
  getAllCallUrgenciesService,
  getCallUrgencyByIdService,
  updateCallUrgencyByIdService,
  deleteCallUrgencyByIdService,
} = require("../services/call-urgency-service");

// CREATE
const createCallUrgency = async (req, res) => {
  try {
    const response = await createCallUrgencyService(req.body);

    return res.status(201).json({
      success: true,
      message: "Call Urgency created successfully",
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
const getAllCallUrgencies = async (req, res) => {
  try {
    const response = await getAllCallUrgenciesService();

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
const getCallUrgencyById = async (req, res) => {
  try {
    const response = await getCallUrgencyByIdService(req.params.id);

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
const updateCallUrgency = async (req, res) => {
  try {
    const response = await updateCallUrgencyByIdService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Call Urgency updated successfully",
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
const deleteCallUrgency = async (req, res) => {
  try {
    await deleteCallUrgencyByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Call Urgency deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCallUrgency,
  getAllCallUrgencies,
  getCallUrgencyById,
  updateCallUrgency,
  deleteCallUrgency,
};