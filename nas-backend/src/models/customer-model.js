// ===========================================
// models/customer-model.js
// ===========================================

const mongoose = require("mongoose");

const customerSchema =
  new mongoose.Schema(
    {
      // ===========================================
      // BASIC DETAILS
      // ===========================================

      customerName: {
        type: String,
        required: true,
        trim: true,
      },

      companyName: {
        type: String,
        trim: true,
      },

      // ===========================================
      // CONTACT DETAILS
      // ===========================================

      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },

      alternateNumber: {
        type: String,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
      },

      website: {
        type: String,
        trim: true,
      },

      // ===========================================
      // ADDRESS DETAILS
      // ===========================================

      address: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      pincode: {
        type: String,
        trim: true,
      },

      // ===========================================
      // CUSTOMER TYPE
      // ===========================================

      customerType: {
        type: String,
        enum: [
          "Residential",
          "Commercial",
          "Corporate",
          "Government",
        ],
        default: "Residential",
      },

      // ===========================================
      // DEPARTMENT
      // ===========================================

      department: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },

      // ===========================================
      // CATEGORY
      // ===========================================

      category: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },

      // ===========================================
      // GST DETAILS
      // ===========================================

      gstNumber: {
        type: String,
        trim: true,
      },

      // ===========================================
      // STATUS
      // ===========================================

      status: {
        type: String,
        enum: [
          "Active",
          "Inactive",
        ],
        default: "Active",
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      // ===========================================
      // REMARKS
      // ===========================================

      remarks: {
        type: String,
        trim: true,
      },

      // ===========================================
      // LOG DETAILS
      // ===========================================

      createdBy: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Customer = mongoose.model(
  "Customer",
  customerSchema
);

module.exports = Customer;