const ServiceCall = require('../models/servicecall-model');

// GET all Service Calls
const getAllServiceCalls = async (req, res) => {
  try {
    const serviceCalls = await ServiceCall.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: serviceCalls
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching service calls",
      error: error.message
    });
  }
};

// GET single Service Call by ID
const getServiceCallById = async (req, res) => {
  try {
    const serviceCall = await ServiceCall.findById(req.params.id);

    if (!serviceCall) {
      return res.status(404).json({
        success: false,
        message: "Service call not found"
      });
    }

    res.status(200).json({
      success: true,
      data: serviceCall
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching service call",
      error: error.message
    });
  }
};

// CREATE new Service Call
const createServiceCall = async (req, res) => {
  try {
    const newServiceCall = await ServiceCall.create(req.body);

    res.status(201).json({
      success: true,
      data: newServiceCall
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating service call",
      error: error.message
    });
  }
};

// UPDATE Service Call
const updateServiceCall = async (req, res) => {
  try {
    const updatedServiceCall = await ServiceCall.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedServiceCall) {
      return res.status(404).json({
        success: false,
        message: "Service call not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedServiceCall
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating service call",
      error: error.message
    });
  }
};

// DELETE Service Call
const deleteServiceCall = async (req, res) => {
  try {
    const deletedServiceCall = await ServiceCall.findByIdAndDelete(req.params.id);

    if (!deletedServiceCall) {
      return res.status(404).json({
        success: false,
        message: "Service call not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service call deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting service call",
      error: error.message
    });
  }
};

module.exports = {
  getAllServiceCalls,
  getServiceCallById,
  createServiceCall,
  updateServiceCall,
  deleteServiceCall
};