const InstrumentMaster = require(
  "../models/instrument-master-model"
);

// CREATE
const createInstrumentMaster = async (
  payload
) => {
  return await InstrumentMaster.create(
    payload
  );
};

// GET ALL
const getAllInstrumentMasters =
  async () => {
    return await InstrumentMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getInstrumentMasterById =
  async (id) => {
    return await InstrumentMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateInstrumentMasterById =
  async (id, payload) => {
    return await InstrumentMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteInstrumentMasterById =
  async (id) => {
    return await InstrumentMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createInstrumentMaster,
  getAllInstrumentMasters,
  getInstrumentMasterById,
  updateInstrumentMasterById,
  deleteInstrumentMasterById,
};