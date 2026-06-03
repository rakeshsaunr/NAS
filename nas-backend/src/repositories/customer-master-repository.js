const CustomerMaster = require("../models/customer-master-model");

// =====================================
// CREATE CUSTOMER
// =====================================

const create = async (data) => {
  return await CustomerMaster.create(data);
};

// =====================================
// GET ALL CUSTOMERS
// =====================================

const getAll = async () => {
  return await CustomerMaster.find()
    .populate("supportPeriod")
    .sort({ createdAt: -1 });
};

// =====================================
// GET SINGLE CUSTOMER
// =====================================

const getById = async (id) => {
  return await CustomerMaster.findById(id).populate("supportPeriod");
};

// =====================================
// UPDATE CUSTOMER
// =====================================

const update = async (id, data) => {
  return await CustomerMaster.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).populate("supportPeriod");
};

// =====================================
// DELETE CUSTOMER
// =====================================

const remove = async (id) => {
  return await CustomerMaster.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};