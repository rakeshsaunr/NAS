// src/repositories/crud-repository.js
class CrudRepository {
    constructor(model) {
      if (!model) throw new Error('Model must be provided to repository');
      this.model = model;
    }
  
    async create(data) {
      return this.model.create(data);
    }
  
    async findById(id) {
      return this.model.findById(id);
    }
  
    async findAll(filter = {}, projection = null, options = {}) {
      return this.model.find(filter, projection, options).sort({ createdAt: -1 });
    }
  
    // Backwards-compatible alias for older code that calls getAll()
    async getAll(filter = {}, projection = null, options = {}) {
      return this.findAll(filter, projection, options);
    }
  
    async findOne(filter = {}) {
      return this.model.findOne(filter);
    }
  
    async update(id, data = {}) {
      return this.model.findByIdAndUpdate(id, data, { new: true });
    }
  
    async delete(id) {
      return this.model.findByIdAndDelete(id);
    }
  
    async count(filter = {}) {
      return this.model.countDocuments(filter);
    }
  }
  
  module.exports = CrudRepository;
  
