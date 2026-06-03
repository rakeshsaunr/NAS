const {
  createCallMaster,
  getAllCallMasters,
  getCallMasterById,
  updateCallMasterById,
  deleteCallMasterById,
} = require(
  "../repositories/call-master-repository"
);

// CREATE
const createCallMasterService =
  async (payload) => {
    return await createCallMaster(
      payload
    );
  };

// GET ALL
const getAllCallMastersService =
  async () => {
    return await getAllCallMasters();
  };

// GET SINGLE
const getCallMasterByIdService =
  async (id) => {
    return await getCallMasterById(
      id
    );
  };

// UPDATE
const updateCallMasterByIdService =
  async (id, payload) => {
    return await updateCallMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteCallMasterByIdService =
  async (id) => {
    return await deleteCallMasterById(
      id
    );
  };

module.exports = {
  createCallMasterService,
  getAllCallMastersService,
  getCallMasterByIdService,
  updateCallMasterByIdService,
  deleteCallMasterByIdService,
};