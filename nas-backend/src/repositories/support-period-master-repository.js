const SupportPeriodMaster = require(
  "../models/support-period-master-model"
);

// CREATE
const createSupportPeriod = async (
  payload
) => {
  return await SupportPeriodMaster.create(
    payload
  );
};

// GET ALL
const getAllSupportPeriods =
  async () => {
    return await SupportPeriodMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getSupportPeriodById =
  async (id) => {
    return await SupportPeriodMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateSupportPeriodById =
  async (id, payload) => {
    return await SupportPeriodMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteSupportPeriodById =
  async (id) => {
    return await SupportPeriodMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createSupportPeriod,
  getAllSupportPeriods,
  getSupportPeriodById,
  updateSupportPeriodById,
  deleteSupportPeriodById,
};