const customerRepository = require(
  "../repositories/customer-master-repository"
);

// =====================================
// CREATE CUSTOMER
// =====================================

const createCustomer = async (data) => {
  return await customerRepository.create(data);
};

// =====================================
// GET ALL CUSTOMERS
// =====================================

const getAllCustomers = async () => {
  return await customerRepository.getAll();
};

// =====================================
// GET CUSTOMER BY ID
// =====================================

const getCustomerById = async (id) => {
  return await customerRepository.getById(id);
};

// =====================================
// UPDATE CUSTOMER
// =====================================

const updateCustomer = async (id, data) => {
  return await customerRepository.update(id, data);
};

// =====================================
// DELETE CUSTOMER
// =====================================

const deleteCustomer = async (id) => {
  return await customerRepository.remove(id);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};