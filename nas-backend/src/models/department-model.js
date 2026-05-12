const mongoose = require("mongoose");

const departmentSchema =
  new mongoose.Schema(
    {
      // ===========================================
      // BASIC DETAILS
      // ===========================================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      code: {
        type: String,
        trim: true,
        uppercase: true,
      },

      description: {
        type: String,
        trim: true,
      },

      // ===========================================
      // CONTACT DETAILS
      // ===========================================

      contactPerson: {
        type: String,
        trim: true,
      },

      contactNumber: {
        type: String,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
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
      // EXTRA DETAILS
      // ===========================================

      createdBy: {
        type: String,
        trim: true,
      },

      remarks: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Department = mongoose.model(
  "Department",
  departmentSchema
);

module.exports = Department;