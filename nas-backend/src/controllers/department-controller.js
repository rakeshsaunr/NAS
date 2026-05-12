const Department = require(
    "../models/department-model"
  );
  
  // ================= CREATE =================
  
  const createDepartment = async (
    req,
    res
  ) => {
    try {
      const data =
        await Department.create(req.body);
  
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // ================= GET ALL =================
  
  const getDepartments = async (
    req,
    res
  ) => {
    try {
      const data =
        await Department.find({
          isActive: true,
        });
  
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    createDepartment,
    getDepartments,
  };