const {
  createSupportPeriod,
  getAllSupportPeriods,
  getSupportPeriodById,
  updateSupportPeriodById,
  deleteSupportPeriodById,
} = require(
  "../repositories/support-period-master-repository"
);

// CREATE
const createSupportPeriodService =
  async (payload) => {
    return await createSupportPeriod(
      payload
    );
  };

// GET ALL
const getAllSupportPeriodsService =
  async () => {
    return await getAllSupportPeriods();
  };

// GET SINGLE
const getSupportPeriodByIdService =
  async (id) => {
    return await getSupportPeriodById(
      id
    );
  };

// UPDATE
const updateSupportPeriodByIdService =
  async (id, payload) => {
    return await updateSupportPeriodById(
      id,
      payload
    );
  };

// DELETE
const deleteSupportPeriodByIdService =
  async (id) => {
    return await deleteSupportPeriodById(
      id
    );
  };

module.exports = {
  createSupportPeriodService,
  getAllSupportPeriodsService,
  getSupportPeriodByIdService,
  updateSupportPeriodByIdService,
  deleteSupportPeriodByIdService,
};