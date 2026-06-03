const mongoose = require("mongoose");

// =====================================
// CUSTOMER MASTER SCHEMA
// =====================================

const customerMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // BASIC DETAILS
    // =====================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    address1: {
      type: String,
      required: true,
      trim: true,
    },

    address2: {
      type: String,
      trim: true,
    },

    landmark: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // CONTACT DETAILS
    // =====================================

    phone1: {
      type: String,
      required: true,
      trim: true,
    },

    phone2: {
      type: String,
      trim: true,
    },

    faxNumber: {
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

    // =====================================
    // SUPPORT PERIOD
    // =====================================

    supportPeriod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportPeriodMaster",
      required: true,
    },

    // =====================================
    // WARRANTY DATES
    // =====================================

    warrantyStartDate: {
      type: Date,
    },

    warrantyEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// MODEL EXPORT
// =====================================

const CustomerMaster =
  mongoose.models.CustomerMaster ||
  mongoose.model(
    "CustomerMaster",
    customerMasterSchema
  );

module.exports = CustomerMaster;