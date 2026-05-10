const repository = require("../repositories/callslip-repository");

const create = async (data) => {
  return await repository.createCallSlip(data);
};

const getAll = async () => {
  return await repository.getAllCallSlips();
};

const getById = async (id) => {
  return await repository.getCallSlipById(id);
};

const update = async (id, data) => {
  return await repository.updateCallSlip(id, data);
};

const remove = async (id) => {
  return await repository.deleteCallSlip(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};