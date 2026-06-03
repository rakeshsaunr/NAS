const {
  createCallNatureMaster,
  getAllCallNatureMasters,
  getCallNatureMasterById,
  updateCallNatureMasterById,
  deleteCallNatureMasterById,
} = require("../repositories/call-nature-master-repository");

// CREATE
const createCallNatureMasterService = async (payload) => {
  return await createCallNatureMaster(payload);
};

// GET ALL
const getAllCallNatureMastersService = async () => {
  return await getAllCallNatureMasters();
};

// GET SINGLE
const getCallNatureMasterByIdService = async (id) => {
  return await getCallNatureMasterById(id);
};

// UPDATE
const updateCallNatureMasterByIdService = async (id, payload) => {
  return await updateCallNatureMasterById(id, payload);
};

// DELETE
const deleteCallNatureMasterByIdService = async (id) => {
  return await deleteCallNatureMasterById(id);
};

module.exports = {
  createCallNatureMasterService,
  getAllCallNatureMastersService,
  getCallNatureMasterByIdService,
  updateCallNatureMasterByIdService,
  deleteCallNatureMasterByIdService,
};