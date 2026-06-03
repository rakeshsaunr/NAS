const CallTypeMaster = require(
  "../models/call-type-master-model"
);

// CREATE
const createCallTypeMaster = async (
  payload
) => {
  return await CallTypeMaster.create(
    payload
  );
};

// GET ALL
const getAllCallTypeMasters =
  async () => {
    return await CallTypeMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCallTypeMasterById =
  async (id) => {
    return await CallTypeMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateCallTypeMasterById =
  async (id, payload) => {
    return await CallTypeMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCallTypeMasterById =
  async (id) => {
    return await CallTypeMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCallTypeMaster,
  getAllCallTypeMasters,
  getCallTypeMasterById,
  updateCallTypeMasterById,
  deleteCallTypeMasterById,
};