const service = require("../services/callslip-service");

const createCallSlip = async (req, res) => {
  try {
    const data = await service.create(req.body);

    res.status(201).json({
      success: true,
      message: "Call Slip Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCallSlips = async (req, res) => {
  try {
    const data = await service.getAll();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCallSlip = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCallSlip = async (req, res) => {
  try {
    const data = await service.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCallSlip = async (req, res) => {
  try {
    await service.remove(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCallSlip,
  getAllCallSlips,
  getCallSlip,
  updateCallSlip,
  deleteCallSlip,
};