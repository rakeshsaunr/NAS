const {
  createDivisionMaster,
  getAllDivisionMasters,
  getDivisionMasterById,
  updateDivisionMasterById,
  deleteDivisionMasterById,
} = require(
  "../repositories/division-master-repository"
);

// CREATE
const createDivisionMasterService =
  async (payload) => {
    return await createDivisionMaster(
      payload
    );
  };

// GET ALL
const getAllDivisionMastersService =
  async () => {
    return await getAllDivisionMasters();
  };

// GET SINGLE
const getDivisionMasterByIdService =
  async (id) => {
    return await getDivisionMasterById(
      id
    );
  };

// UPDATE
const updateDivisionMasterByIdService =
  async (id, payload) => {
    return await updateDivisionMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteDivisionMasterByIdService =
  async (id) => {
    return await deleteDivisionMasterById(
      id
    );
  };

module.exports = {
  createDivisionMasterService,
  getAllDivisionMastersService,
  getDivisionMasterByIdService,
  updateDivisionMasterByIdService,
  deleteDivisionMasterByIdService,
};