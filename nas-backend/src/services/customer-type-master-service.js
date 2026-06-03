const {
  createCustomerTypeMaster,
  getAllCustomerTypeMasters,
  getCustomerTypeMasterById,
  updateCustomerTypeMasterById,
  deleteCustomerTypeMasterById,
} = require(
  "../repositories/customer-type-master-repository"
);

// CREATE
const createCustomerTypeMasterService =
  async (payload) => {
    return await createCustomerTypeMaster(
      payload
    );
  };

// GET ALL
const getAllCustomerTypeMastersService =
  async () => {
    return await getAllCustomerTypeMasters();
  };

// GET SINGLE
const getCustomerTypeMasterByIdService =
  async (id) => {
    return await getCustomerTypeMasterById(
      id
    );
  };

// UPDATE
const updateCustomerTypeMasterByIdService =
  async (id, payload) => {
    return await updateCustomerTypeMasterById(
      id,
      payload
    );
  };

// DELETE
const deleteCustomerTypeMasterByIdService =
  async (id) => {
    return await deleteCustomerTypeMasterById(
      id
    );
  };

module.exports = {
  createCustomerTypeMasterService,
  getAllCustomerTypeMastersService,
  getCustomerTypeMasterByIdService,
  updateCustomerTypeMasterByIdService,
  deleteCustomerTypeMasterByIdService,
};