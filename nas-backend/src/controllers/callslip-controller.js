const service = require("../services/callslip-service");

// ================= CREATE CALL SLIP =================

const createCallSlip = async (req, res) => {
  try {
    const data = await service.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Call Slip Created Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ================= GET ALL CALL SLIPS =================

const getAllCallSlips = async (req, res) => {
  try {
    const data = await service.getAll();

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ================= GET SINGLE CALL SLIP =================

const getCallSlip = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Slip Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ================= UPDATE CALL SLIP =================

const updateCallSlip = async (req, res) => {
  try {
    const data = await service.update(
      req.params.id,
      req.body
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Slip Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Call Slip Updated Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ================= DELETE CALL SLIP =================

const deleteCallSlip = async (req, res) => {
  try {
    const data = await service.remove(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Slip Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Call Slip Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
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