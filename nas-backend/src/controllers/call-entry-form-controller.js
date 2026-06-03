const mongoose = require("mongoose");
const CallEntry = require("../models/call-entry-form-model");
const cloudinary = require("../config/cloudinary");
const {
  assignCallService,
} = require("../services/call-entry-form-service");

// CREATE
const createCallEntryController = async (req, res) => {
  try {
    const {
      customer,
      customerType,
      callType,
      // rest optional fields from schema, if sent
    } = req.body;

    if (
      !customer ||
      !customerType ||
      !callType ||
      !mongoose.Types.ObjectId.isValid(customer) ||
      !mongoose.Types.ObjectId.isValid(customerType) ||
      !mongoose.Types.ObjectId.isValid(callType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "customer, customerType, and callType are required and must be valid IDs.",
      });
    }

    let attachmentData = {};

    // ATTACHMENT
    if (req.files?.attachment?.[0]) {
      attachmentData = {
        attachment: {
          url: req.files.attachment[0].path,
          public_id: req.files.attachment[0].filename,
        },
      };
    }

    // Merge body and attachment
    const callEntryData = {
      ...req.body,
      ...attachmentData,
    };

    // Create the call entry
    const data = await CallEntry.create(callEntryData);

    // Repopulate the record to send all populated fields back
    const populatedData = await CallEntry.findById(data._id)
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency")
      .populate("engineerAssigned")
      .populate("callLoggedBy")
      .populate("callNotedBy");

    return res.status(201).json({
      success: true,
      message: "Call Entry created successfully",
      data: populatedData,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate call number or serial number.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
const getAllCallEntriesController = async (req, res) => {
  try {
    const data = await CallEntry.find()
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency")
      .populate("engineerAssigned")
      .populate("callLoggedBy")
      .populate("callNotedBy")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: Array.isArray(data) ? data.length : 0,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE
const getCallEntryByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const data = await CallEntry.findById(id)
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency")
      .populate("engineerAssigned")
      .populate("callLoggedBy")
      .populate("callNotedBy");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCallEntryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    // Find old entry to get old attachment
    const oldCall = await CallEntry.findById(id);

    if (!oldCall) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    let data = { ...req.body };

    // UPDATE ATTACHMENT
    if (req.files?.attachment?.[0]) {
      // delete old image
      if (oldCall.attachment?.public_id) {
        await cloudinary.uploader.destroy(oldCall.attachment.public_id);
      }

      data.attachment = {
        url: req.files.attachment[0].path,
        public_id: req.files.attachment[0].filename,
      };
    }

    // Update and return the populated document
    const updatedData = await CallEntry.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("customer")
      .populate("customerType")
      .populate("department")
      .populate("endUser")
      .populate("callType")
      .populate("natureOfCall")
      .populate("instrument")
      .populate("problemDetails")
      .populate("callUrgency")
      .populate("engineerAssigned")
      .populate("callLoggedBy")
      .populate("callNotedBy");

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCallEntryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const data = await CallEntry.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Call Entry not found",
      });
    }

    // DELETE ATTACHMENT
    if (data.attachment?.public_id) {
      await cloudinary.uploader.destroy(data.attachment.public_id);
    }

    await CallEntry.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ASSIGN/REASSIGN CALL (Assignment Module)
const assignCall = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Call ID",
      });
    }

    const data = await assignCallService(
      id,
      req.body,
      req.user
    );

    return res.status(200).json({
      success: true,
      message: "Call assigned successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCallEntry: createCallEntryController,
  getAllCallEntries: getAllCallEntriesController,
  getCallEntryById: getCallEntryByIdController,
  updateCallEntry: updateCallEntryController,
  deleteCallEntry: deleteCallEntryController,
  assignCall: assignCall,
};