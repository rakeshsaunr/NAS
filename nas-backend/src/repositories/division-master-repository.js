const DivisionMaster = require(
  "../models/division-master-model"
);

// CREATE
const createDivisionMaster = async (
  payload
) => {
  return await DivisionMaster.create(
    payload
  );
};

// GET ALL
const getAllDivisionMasters =
  async () => {
    return await DivisionMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getDivisionMasterById =
  async (id) => {
    return await DivisionMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateDivisionMasterById =
  async (id, payload) => {
    return await DivisionMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteDivisionMasterById =
  async (id) => {
    return await DivisionMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createDivisionMaster,
  getAllDivisionMasters,
  getDivisionMasterById,
  updateDivisionMasterById,
  deleteDivisionMasterById,
};