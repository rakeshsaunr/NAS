const {
  createCallUrgency,
  getAllCallUrgencies,
  getCallUrgencyById,
  updateCallUrgencyById,
  deleteCallUrgencyById,
} = require(
  "../repositories/call-urgency-repository"
);

// CREATE
const createCallUrgencyService =
  async (payload) => {
    return await createCallUrgency(
      payload
    );
  };

// GET ALL
const getAllCallUrgenciesService =
  async () => {
    return await getAllCallUrgencies();
  };

// GET SINGLE
const getCallUrgencyByIdService =
  async (id) => {
    return await getCallUrgencyById(
      id
    );
  };

// UPDATE
const updateCallUrgencyByIdService =
  async (id, payload) => {
    return await updateCallUrgencyById(
      id,
      payload
    );
  };

// DELETE
const deleteCallUrgencyByIdService =
  async (id) => {
    return await deleteCallUrgencyById(
      id
    );
  };

module.exports = {
  createCallUrgencyService,
  getAllCallUrgenciesService,
  getCallUrgencyByIdService,
  updateCallUrgencyByIdService,
  deleteCallUrgencyByIdService,
};