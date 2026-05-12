const mongoose = require("mongoose");

const callSlipSchema = new mongoose.Schema(
  {
    // ================= CUSTOMER DETAILS =================

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
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

    address: {
      type: String,
      trim: true,
    },

    // ================= DYNAMIC DEPARTMENT =================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // ================= DYNAMIC CATEGORY =================

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ================= CALL DETAILS =================

    callNumber: {
      type: String,
      trim: true,
      unique: true,
    },

    callDate: {
      type: Date,
      default: Date.now,
    },

    callTime: {
      type: String,
      trim: true,
    },

    // ================= CALL TYPE =================

    callType: {
      type: String,
      enum: [
        "Project Work",
        "Installation",
        "Maintenance",
        "AMC Visit",
        "Service Call",
        "Site Survey",
      ],
    },

    // ================= DYNAMIC PRODUCT TYPE =================

    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    // ================= COMPLAINT DETAILS =================

    complaintType: {
      type: String,
      trim: true,
    },

    problemDescription: {
      type: String,
      trim: true,
    },

    serviceDetails: {
      type: String,
      trim: true,
    },

    errorDetails: {
      type: String,
      trim: true,
    },

    // ================= PRIORITY =================

    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },

    // ================= PAYMENT DETAILS =================

    charges: {
      serviceCharges: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        default: 0,
      },

      paymentMode: {
        type: String,
        enum: [
          "Cash",
          "UPI",
          "Card",
          "Bank Transfer",
          "Cheque",
        ],
      },

      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
      },
    },

    // ================= SERVICE STATUS =================

    serviceStatus: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ================= ASSIGNED ENGINEER =================

    assignedEngineer: {
      type: String,
      trim: true,
    },

    // ================= LOG DETAILS =================

    loggedBy: {
      type: String,
      trim: true,
    },

    remarks: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CallSlip = mongoose.model(
  "CallSlip",
  callSlipSchema
);

module.exports = CallSlip;