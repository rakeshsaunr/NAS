const StatusMaster = require(
  "../models/status-master-model"
);

// CREATE
const createStatusMaster = async (
  payload
) => {
  return await StatusMaster.create(
    payload
  );
};

// GET ALL
const getAllStatusMasters =
  async () => {
    return await StatusMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getStatusMasterById =
  async (id) => {
    return await StatusMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateStatusMasterById =
  async (id, payload) => {
    return await StatusMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteStatusMasterById =
  async (id) => {
    return await StatusMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createStatusMaster,
  getAllStatusMasters,
  getStatusMasterById,
  updateStatusMasterById,
  deleteStatusMasterById,
};