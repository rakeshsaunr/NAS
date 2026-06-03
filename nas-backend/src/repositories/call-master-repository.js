const CallMaster = require(
  "../models/call-master-model"
);

// CREATE
const createCallMaster = async (
  payload
) => {
  return await CallMaster.create(
    payload
  );
};

// GET ALL
const getAllCallMasters =
  async () => {
    return await CallMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCallMasterById =
  async (id) => {
    return await CallMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateCallMasterById =
  async (id, payload) => {
    return await CallMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCallMasterById =
  async (id) => {
    return await CallMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCallMaster,
  getAllCallMasters,
  getCallMasterById,
  updateCallMasterById,
  deleteCallMasterById,
};