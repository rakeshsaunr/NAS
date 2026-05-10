const mongoose = require("mongoose");

const callSlipSchema = new mongoose.Schema(
  {
    customerName: String,
    department: String,
    companyName: String,
    contactNumber: String,
    email: String,
    address: String,

    callNumber: String,
    callDate: String,
    callTime: String,

    callType: {
      projectWork: Boolean,
      installation: Boolean,
      maintenance: Boolean,
      amcVisit: Boolean,
      serviceCall: Boolean,
      siteSurvey: Boolean,
    },

    charges: {
      serviceCharges: Number,
      totalAmount: Number,
      paymentMode: String,
      paymentStatus: String,
    },

    products: {
      cctv: Boolean,
      biometric: Boolean,
      networking: Boolean,
      security: Boolean,
      epabx: Boolean,
      automation: Boolean,
    },

    complaintType: String,
    problemDescription: String,
    serviceDetails: String,
    errorDetails: String,

    priorityLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },

    loggedBy: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CallSlip", callSlipSchema);