// ===========================================
// services/customer-service.js
// ===========================================

const repository = require(
    "../repositories/customer-repository"
  );
  
  const create = async (data) => {
    return await repository.create(
      data
    );
  };
  
  const getAll = async () => {
    return await repository.getAll();
  };
  
  const getById = async (id) => {
    return await repository.getById(
      id
    );
  };
  
  const update = async (
    id,
    data
  ) => {
    return await repository.update(
      id,
      data
    );
  };
  
  const remove = async (id) => {
    return await repository.remove(id);
  };
  
  module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
  };