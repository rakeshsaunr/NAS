const repository = require(
    "../repositories/end-user-master-repository"
  );
  
  // =====================================
  // CREATE END USER
  // =====================================
  
  const createEndUser = async (data) => {
    return await repository.createEndUser(data);
  };
  
  // =====================================
  // GET ALL END USERS
  // =====================================
  
  const getAllEndUsers = async (search) => {
    if (search) {
      return await repository.searchEndUsers(search);
    }
  
    return await repository.getAllEndUsers();
  };
  
  // =====================================
  // GET SINGLE END USER
  // =====================================
  
  const getEndUserById = async (id) => {
    return await repository.getEndUserById(id);
  };
  
  // =====================================
  // UPDATE END USER
  // =====================================
  
  const updateEndUser = async (id, data) => {
    return await repository.updateEndUser(id, data);
  };
  
  // =====================================
  // DELETE END USER
  // =====================================
  
  const deleteEndUser = async (id) => {
    return await repository.deleteEndUser(id);
  };
  
  module.exports = {
    createEndUser,
    getAllEndUsers,
    getEndUserById,
    updateEndUser,
    deleteEndUser,
  };