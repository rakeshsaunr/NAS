const {
  createCallTypeMaster,
  getAllCallTypeMasters,
  getCallTypeMasterById,
  updateCallTypeMasterById,
  deleteCallTypeMasterById,
} = require(
  "../repositories/call-type-master-repository"
);

// CREATE
const createCallTypeMasterService =
  async (payload) => {
    return await createCallTypeMaster(
      payload
    );
  };

// GET ALL
const getAllCallTypeMastersService =
  async () => {
    return await getAllCallTypeMasters();
  };

// GET SINGLE
const getCallTypeMasterByIdService =
  async (id) => {
    return await getCallTypeMasterById(
      id
    );
  };

// UPDATE
const updateCallTypeMasterByIdService =
  async (id, payload) => {
    return await updateCallTypeMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteCallTypeMasterByIdService =
  async (id) => {
    return await deleteCallTypeMasterById(
      id
    );
  };

module.exports = {
  createCallTypeMasterService,
  getAllCallTypeMastersService,
  getCallTypeMasterByIdService,
  updateCallTypeMasterByIdService,
  deleteCallTypeMasterByIdService,
};