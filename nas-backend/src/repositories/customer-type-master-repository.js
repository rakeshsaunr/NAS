const CustomerTypeMaster = require(
  "../models/customer-type-master-model"
);

// CREATE
const createCustomerTypeMaster = async (
  payload
) => {
  return await CustomerTypeMaster.create(
    payload
  );
};

// GET ALL
const getAllCustomerTypeMasters =
  async () => {
    return await CustomerTypeMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getCustomerTypeMasterById =
  async (id) => {
    return await CustomerTypeMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateCustomerTypeMasterById =
  async (id, payload) => {
    return await CustomerTypeMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteCustomerTypeMasterById =
  async (id) => {
    return await CustomerTypeMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createCustomerTypeMaster,
  getAllCustomerTypeMasters,
  getCustomerTypeMasterById,
  updateCustomerTypeMasterById,
  deleteCustomerTypeMasterById,
};