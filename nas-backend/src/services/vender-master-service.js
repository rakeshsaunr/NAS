const {
  createVendorMaster,
  getAllVendorMasters,
  getVendorMasterById,
  updateVendorMasterById,
  deleteVendorMasterById,
} = require(
  "../repositories/vender-master-repository"
);

// CREATE
const createVendorMasterService =
  async (payload) => {
    return await createVendorMaster(
      payload
    );
  };

// GET ALL
const getAllVendorMastersService =
  async () => {
    return await getAllVendorMasters();
  };

// GET SINGLE
const getVendorMasterByIdService =
  async (id) => {
    return await getVendorMasterById(
      id
    );
  };

// UPDATE
const updateVendorMasterByIdService =
  async (id, payload) => {
    return await updateVendorMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteVendorMasterByIdService =
  async (id) => {
    return await deleteVendorMasterById(
      id
    );
  };

module.exports = {
  createVendorMasterService,
  getAllVendorMastersService,
  getVendorMasterByIdService,
  updateVendorMasterByIdService,
  deleteVendorMasterByIdService,
};