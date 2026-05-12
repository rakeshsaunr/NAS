// ===========================================
// repositories/customer-repository.js
// ===========================================

const Customer = require(
    "../models/customer-model"
  );
  
  class CustomerRepository {
    // CREATE
  
    async create(data) {
      return await Customer.create(data);
    }
  
    // GET ALL
  
    async getAll() {
      return await Customer.find({
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
        .sort({
          createdAt: -1,
        });
    }
  
    // GET SINGLE
  
    async getById(id) {
      return await Customer.findById(
        id
      )
        .populate(
          "department",
          "name"
        )
        .populate(
          "category",
          "name"
        );
    }
  
    // UPDATE
  
    async update(id, data) {
      return await Customer.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );
    }
  
    // DELETE
  
    async remove(id) {
      return await Customer.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );
    }
  }
  
  module.exports =
    new CustomerRepository();