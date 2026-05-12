const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    // Call Details
    callSheetNumber: {
      type: String, // This could be an auto-incremented value in future
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    callStartTime: {
      type: String, // Store as string (e.g. "10:30 AM"). Could consider Date if needed.
      required: true,
    },
    callEndTime: {
      type: String,
      required: true,
    },
    totalWorkingHour: {
      type: String, // Store as calculated string ("2 hr 15 min") or Number (minutes)
    },

    // Customer & Company Details
    companyName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },

    // Work Details
    workType: {
      newInstallation: { type: Boolean, default: false },
      serviceCall: { type: Boolean, default: false },
      maintenance: { type: Boolean, default: false },
    },
    wiringDetails: {
      type: String,
    },
    productDetails: {
      type: String,
    },
    serviceDescription: {
      type: String,
    },
    workStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Closed", "Hold"],
      default: "Pending",
    },

    // Remarks
    customerRemark: {
      type: String,
    },
    technicianRemarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceCall', serviceSchema);