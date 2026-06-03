const {
  createStatusMaster,
  getAllStatusMasters,
  getStatusMasterById,
  updateStatusMasterById,
  deleteStatusMasterById,
} = require(
  "../repositories/status-master-repository"
);

// CREATE
const createStatusMasterService =
  async (payload) => {
    return await createStatusMaster(
      payload
    );
  };

// GET ALL
const getAllStatusMastersService =
  async () => {
    return await getAllStatusMasters();
  };

// GET SINGLE
const getStatusMasterByIdService =
  async (id) => {
    return await getStatusMasterById(
      id
    );
  };

// UPDATE
const updateStatusMasterByIdService =
  async (id, payload) => {
    return await updateStatusMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteStatusMasterByIdService =
  async (id) => {
    return await deleteStatusMasterById(
      id
    );
  };

module.exports = {
  createStatusMasterService,
  getAllStatusMastersService,
  getStatusMasterByIdService,
  updateStatusMasterByIdService,
  deleteStatusMasterByIdService,
};