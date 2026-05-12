const ServiceModel = require(
    "../models/servicecall-model"
  );
  
  class ServiceRepository {
    // ===========================================
    // CREATE CALL SHEET
    // ===========================================
  
    async create(data) {
      try {
        const callSheet =
          await ServiceModel.create(data);
  
        return callSheet;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    // ===========================================
    // GET ALL CALL SHEETS
    // ===========================================
  
    async getAll() {
      try {
        const callSheets =
          await ServiceModel.find({
            isActive: true,
          })
            .populate(
              "department",
              "name"
            )
            .populate(
              "category",
              "name"
            )
            .populate(
              "productType",
              "name"
            )
            .sort({
              createdAt: -1,
            });
  
        return callSheets;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    // ===========================================
    // GET SINGLE CALL SHEET
    // ===========================================
  
    async getById(id) {
      try {
        const callSheet =
          await ServiceModel.findById(id)
            .populate(
              "department",
              "name"
            )
            .populate(
              "category",
              "name"
            )
            .populate(
              "productType",
              "name"
            );
  
        return callSheet;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    // ===========================================
    // UPDATE CALL SHEET
    // ===========================================
  
    async update(id, data) {
      try {
        const updatedCallSheet =
          await ServiceModel.findByIdAndUpdate(
            id,
            data,
            {
              new: true,
              runValidators: true,
            }
          )
            .populate(
              "department",
              "name"
            )
            .populate(
              "category",
              "name"
            )
            .populate(
              "productType",
              "name"
            );
  
        return updatedCallSheet;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    // ===========================================
    // SOFT DELETE CALL SHEET
    // ===========================================
  
    async remove(id) {
      try {
        const deletedCallSheet =
          await ServiceModel.findByIdAndUpdate(
            id,
            {
              isActive: false,
            },
            {
              new: true,
            }
          );
  
        return deletedCallSheet;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  
  module.exports =
    new ServiceRepository();