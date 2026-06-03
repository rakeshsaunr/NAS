const CallNatureMaster = require(
  "../models/call-nature-master-model"
);

// CREATE
const createCallNatureMaster = async (
  payload
) => {
  return await CallNatureMaster.create(
    payload
  );
};

// GET ALL
const getAllCallNatureMasters =
  async () => {
    return await CallNatureMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCallNatureMasterById =
  async (id) => {
    return await CallNatureMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateCallNatureMasterById =
  async (id, payload) => {
    return await CallNatureMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCallNatureMasterById =
  async (id) => {
    return await CallNatureMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCallNatureMaster,
  getAllCallNatureMasters,
  getCallNatureMasterById,
  updateCallNatureMasterById,
  deleteCallNatureMasterById,
};