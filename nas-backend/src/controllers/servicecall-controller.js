const ServiceCall = require(
  "../models/servicecall-model"
);

// ===========================================
// GET ALL SERVICE CALLS
// ===========================================

const getAllServiceCalls = async (
  req,
  res
) => {
  try {
    const serviceCalls =
      await ServiceCall.find({
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
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: serviceCalls.length,
      data: serviceCalls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Error Fetching Service Calls",
    });
  }
};

// ===========================================
// GET SINGLE SERVICE CALL
// ===========================================

const getServiceCallById = async (
  req,
  res
) => {
  try {
    const serviceCall =
      await ServiceCall.findById(
        req.params.id
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

    if (!serviceCall) {
      return res.status(404).json({
        success: false,
        message:
          "Service Call Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: serviceCall,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Error Fetching Service Call",
    });
  }
};

// ===========================================
// CREATE SERVICE CALL
// ===========================================

const createServiceCall = async (
  req,
  res
) => {
  try {
    // ================= AUTO CALL NUMBER =================

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    req.body.callNumber = `SC-${randomNumber}`;

    const newServiceCall =
      await ServiceCall.create(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Service Call Created Successfully",
      data: newServiceCall,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Error Creating Service Call",
    });
  }
};

// ===========================================
// UPDATE SERVICE CALL
// ===========================================

const updateServiceCall = async (
  req,
  res
) => {
  try {
    const updatedServiceCall =
      await ServiceCall.findByIdAndUpdate(
        req.params.id,
        req.body,
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

    if (!updatedServiceCall) {
      return res.status(404).json({
        success: false,
        message:
          "Service Call Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Service Call Updated Successfully",
      data: updatedServiceCall,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Error Updating Service Call",
    });
  }
};

// ===========================================
// DELETE SERVICE CALL
// ===========================================

const deleteServiceCall = async (
  req,
  res
) => {
  try {
    const deletedServiceCall =
      await ServiceCall.findByIdAndUpdate(
        req.params.id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!deletedServiceCall) {
      return res.status(404).json({
        success: false,
        message:
          "Service Call Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Service Call Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Error Deleting Service Call",
    });
  }
};

module.exports = {
  getAllServiceCalls,
  getServiceCallById,
  createServiceCall,
  updateServiceCall,
  deleteServiceCall,
};