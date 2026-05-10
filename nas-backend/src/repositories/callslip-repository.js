const CallSlip = require("../models/callslip-model");

const createCallSlip = async (data) => {
  return await CallSlip.create(data);
};

const getAllCallSlips = async () => {
  return await CallSlip.find().sort({ createdAt: -1 });
};

const getCallSlipById = async (id) => {
  return await CallSlip.findById(id);
};

const updateCallSlip = async (id, data) => {
  return await CallSlip.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteCallSlip = async (id) => {
  return await CallSlip.findByIdAndDelete(id);
};

module.exports = {
  createCallSlip,
  getAllCallSlips,
  getCallSlipById,
  updateCallSlip,
  deleteCallSlip,
};