const ServiceCall = require('../models/servicecall-model');

async function createServiceCall(data) {
  return await ServiceCall.create(data);
}

async function getAllServiceCalls() {
  return await ServiceCall.find().sort({ createdAt: -1 });
}

async function getServiceCall(id) {
  const call = await ServiceCall.findById(id);
  if (!call) throw new Error('ServiceCall not found');
  return call;
}

async function updateServiceCall(id, data) {
  const updated = await ServiceCall.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('ServiceCall not found or update failed');
  return updated;
}

async function deleteServiceCall(id) {
  const deleted = await ServiceCall.findByIdAndDelete(id);
  if (!deleted) throw new Error('ServiceCall not found or already deleted');
  return deleted;
}

module.exports = {
  createServiceCall,
  getAllServiceCalls,
  getServiceCall,
  updateServiceCall,
  deleteServiceCall,
};