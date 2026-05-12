const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    // ===========================================
    // CALL DETAILS
    // ===========================================

    callSheetNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    callDate: {
      type: Date,
      default: Date.now,
    },

    callStartTime: {
      type: String,
      trim: true,
    },

    callEndTime: {
      type: String,
      trim: true,
    },

    totalWorkingHour: {
      type: String,
      trim: true,
    },

    // ===========================================
    // CUSTOMER DETAILS
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

    // ===========================================
    // DEPARTMENT
    // ===========================================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    // ===========================================
    // CATEGORY
    // ===========================================

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    // ===========================================
    // PRODUCT TYPE
    // ===========================================

    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    // ===========================================
    // WORK TYPE
    // ===========================================

    workType: {
      type: String,
      enum: [
        "New Installation",
        "Service Call",
        "Maintenance",
        "AMC Visit",
        "Inspection",
      ],
    },

    // ===========================================
    // SERVICE DETAILS
    // ===========================================

    wiringDetails: {
      type: String,
      trim: true,
    },

    productDetails: {
      type: String,
      trim: true,
    },

    serviceDescription: {
      type: String,
      trim: true,
    },

    problemDescription: {
      type: String,
      trim: true,
    },

    errorDetails: {
      type: String,
      trim: true,
    },

    // ===========================================
    // PRIORITY
    // ===========================================

    priorityLevel: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Urgent",
      ],
      default: "Low",
    },

    // ===========================================
    // WORK STATUS
    // ===========================================

    workStatus: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
        "Closed",
        "Hold",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ===========================================
    // CHARGES
    // ===========================================

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
        enum: [
          "Pending",
          "Paid",
        ],
        default: "Pending",
      },
    },

    // ===========================================
    // ENGINEER DETAILS
    // ===========================================

    assignedEngineer: {
      type: String,
      trim: true,
    },

    technicianName: {
      type: String,
      trim: true,
    },

    // ===========================================
    // REMARKS
    // ===========================================

    customerRemark: {
      type: String,
      trim: true,
    },

    technicianRemarks: {
      type: String,
      trim: true,
    },

    internalRemarks: {
      type: String,
      trim: true,
    },

    // ===========================================
    // LOG DETAILS
    // ===========================================

    loggedBy: {
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

const ServiceCall = mongoose.model(
  "ServiceCall",
  serviceSchema
);

module.exports = ServiceCall;