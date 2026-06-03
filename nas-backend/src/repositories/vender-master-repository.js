const VendorMaster = require(
  "../models/vender-master-model"
);

// CREATE
const createVendorMaster = async (
  payload
) => {
  return await VendorMaster.create(
    payload
  );
};

// GET ALL
const getAllVendorMasters =
  async () => {
    return await VendorMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getVendorMasterById =
  async (id) => {
    return await VendorMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateVendorMasterById =
  async (id, payload) => {
    return await VendorMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteVendorMasterById =
  async (id) => {
    return await VendorMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createVendorMaster,
  getAllVendorMasters,
  getVendorMasterById,
  updateVendorMasterById,
  deleteVendorMasterById,
};