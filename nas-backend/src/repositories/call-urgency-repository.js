const CallUrgency = require(
  "../models/call-urgency-model"
);

// CREATE
const createCallUrgency = async (
  payload
) => {
  return await CallUrgency.create(
    payload
  );
};

// GET ALL
const getAllCallUrgencies =
  async () => {
    return await CallUrgency.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCallUrgencyById =
  async (id) => {
    return await CallUrgency.findById(
      id
    ).lean();
  };

// UPDATE
const updateCallUrgencyById =
  async (id, payload) => {
    return await CallUrgency.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCallUrgencyById =
  async (id) => {
    return await CallUrgency.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCallUrgency,
  getAllCallUrgencies,
  getCallUrgencyById,
  updateCallUrgencyById,
  deleteCallUrgencyById,
};