const service = require(
    "../services/end-user-master-service"
  );
  
  // =====================================
  // CREATE END USER
  // =====================================
  
  const createEndUser = async (req, res) => {
    try {
      const response =
        await service.createEndUser(req.body);
  
      return res.status(201).json({
        success: true,
        message:
          "End User created successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // =====================================
  // GET ALL END USERS
  // =====================================
  
  const getAllEndUsers = async (req, res) => {
    try {
      const response =
        await service.getAllEndUsers(
          req.query.search
        );
  
      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // =====================================
  // GET SINGLE END USER
  // =====================================
  
  const getEndUserById = async (req, res) => {
    try {
      const response =
        await service.getEndUserById(
          req.params.id
        );
  
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "End User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // =====================================
  // UPDATE END USER
  // =====================================
  
  const updateEndUser = async (req, res) => {
    try {
      const response =
        await service.updateEndUser(
          req.params.id,
          req.body
        );
  
      return res.status(200).json({
        success: true,
        message:
          "End User updated successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // =====================================
  // DELETE END USER
  // =====================================
  
  const deleteEndUser = async (req, res) => {
    try {
      await service.deleteEndUser(
        req.params.id
      );
  
      return res.status(200).json({
        success: true,
        message:
          "End User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    createEndUser,
    getAllEndUsers,
    getEndUserById,
    updateEndUser,
    deleteEndUser,
  };