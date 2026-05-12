// ===========================================
// controllers/customer-controller.js
// ===========================================

const service = require(
    "../services/customer-service"
  );
  
  // CREATE
  
  const createCustomer =
    async (req, res) => {
      try {
        const data =
          await service.create(
            req.body
          );
  
        res.status(201).json({
          success: true,
          message:
            "Customer Created Successfully",
          data,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  // GET ALL
  
  const getAllCustomers =
    async (req, res) => {
      try {
        const data =
          await service.getAll();
  
        res.status(200).json({
          success: true,
          count: data.length,
          data,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  // GET SINGLE
  
  const getCustomer =
    async (req, res) => {
      try {
        const data =
          await service.getById(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  // UPDATE
  
  const updateCustomer =
    async (req, res) => {
      try {
        const data =
          await service.update(
            req.params.id,
            req.body
          );
  
        res.status(200).json({
          success: true,
          message:
            "Customer Updated Successfully",
          data,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  // DELETE
  
  const deleteCustomer =
    async (req, res) => {
      try {
        await service.remove(
          req.params.id
        );
  
        res.status(200).json({
          success: true,
          message:
            "Customer Deleted Successfully",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
  };