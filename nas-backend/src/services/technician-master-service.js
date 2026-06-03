const {
  createTechnicianMaster,
  getAllTechnicianMasters,
  getTechnicianMasterById,
  updateTechnicianMasterById,
  deleteTechnicianMasterById,
} = require(
  "../repositories/technician-master-repository"
);

// CREATE
const createTechnicianMasterService =
  async (payload) => {
    return await createTechnicianMaster(
      payload
    );
  };

// GET ALL
const getAllTechnicianMastersService =
  async () => {
    return await getAllTechnicianMasters();
  };

// GET SINGLE
const getTechnicianMasterByIdService =
  async (id) => {
    return await getTechnicianMasterById(
      id
    );
  };

// UPDATE
const updateTechnicianMasterByIdService =
  async (id, payload) => {
    return await updateTechnicianMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteTechnicianMasterByIdService =
  async (id) => {
    return await deleteTechnicianMasterById(
      id
    );
  };

module.exports = {
  createTechnicianMasterService,
  getAllTechnicianMastersService,
  getTechnicianMasterByIdService,
  updateTechnicianMasterByIdService,
  deleteTechnicianMasterByIdService,
};