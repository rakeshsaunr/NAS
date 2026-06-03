const {
  createInstrumentMaster,
  getAllInstrumentMasters,
  getInstrumentMasterById,
  updateInstrumentMasterById,
  deleteInstrumentMasterById,
} = require(
  "../repositories/instrument-master-repository"
);

// CREATE
const createInstrumentMasterService =
  async (payload) => {
    return await createInstrumentMaster(
      payload
    );
  };

// GET ALL
const getAllInstrumentMastersService =
  async () => {
    return await getAllInstrumentMasters();
  };

// GET SINGLE
const getInstrumentMasterByIdService =
  async (id) => {
    return await getInstrumentMasterById(
      id
    );
  };

// UPDATE
const updateInstrumentMasterByIdService =
  async (id, payload) => {
    return await updateInstrumentMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteInstrumentMasterByIdService =
  async (id) => {
    return await deleteInstrumentMasterById(
      id
    );
  };

module.exports = {
  createInstrumentMasterService,
  getAllInstrumentMastersService,
  getInstrumentMasterByIdService,
  updateInstrumentMasterByIdService,
  deleteInstrumentMasterByIdService,
};