// =====================================
// models/order-model.js
// ORDER MANAGEMENT SYSTEM
// =====================================

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // =====================================
    // BASIC ORDER DETAILS
    // =====================================
    orderId: {
      type: String,
      unique: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    // =====================================
    // CLIENT DETAILS
    // =====================================
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    // =====================================
    // ORDER SOURCE
    // =====================================
    orderSource: {
      type: String,
      enum: [
        "Call",
        "WhatsApp",
        "Website",
        "Reference",
        "Walk-In",
        "Facebook",
        "Instagram",
        "Justdial",
      ],
      default: "Call",
    },

    // =====================================
    // SERVICE / PRODUCT DETAILS
    // =====================================
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    serviceDetails: {
      type: String,
      trim: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    materialsRequired: {
      type: String,
      trim: true,
    },

    // =====================================
    // TEAM ASSIGNMENT
    // =====================================
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    assignedTeam: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    // =====================================
    // ORDER TIMELINE
    // =====================================
    startDate: Date,

    expectedCompletionDate: Date,

    completionDate: Date,

    // =====================================
    // WORK TRACKING
    // =====================================
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completedWork: {
      type: String,
      trim: true,
    },

    pendingWork: {
      type: String,
      trim: true,
    },

    issuesBlockers: {
      type: String,
      trim: true,
    },

    // =====================================
    // FINANCIAL DETAILS
    // =====================================
    estimatedAmount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    receivedAmount: {
      type: Number,
      default: 0,
    },

    pendingAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Partial",
        "Paid",
      ],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Bank",
      ],
    },

    // =====================================
    // INVOICE
    // =====================================
    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    // =====================================
    // ORDER STATUS
    // =====================================
    orderStatus: {
      type: String,
      enum: [
        "Incoming",
        "In-Hand",
        "Running",
        "Completed",
        "Cancelled",
      ],
      default: "Incoming",
    },

    // =====================================
    // PRIORITY
    // =====================================
    priority: {
      type: String,
      enum: [
        "High",
        "Medium",
        "Low",
      ],
      default: "Medium",
    },

    // =====================================
    // FEEDBACK
    // =====================================
    feedback: {
      type: String,
      trim: true,
    },

    // =====================================
    // REMARKS
    // =====================================
    remarks: {
      type: String,
      trim: true,
    },

    // =====================================
    // CREATED BY
    // =====================================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO CALCULATIONS
// =====================================
orderSchema.pre("save", function (next) {

  // PENDING AMOUNT
  this.pendingAmount =
    Number(this.finalAmount) -
    Number(this.receivedAmount);

  // PAYMENT STATUS
  if (this.pendingAmount <= 0) {
    this.paymentStatus = "Paid";
  } else if (
    this.receivedAmount > 0 &&
    this.pendingAmount > 0
  ) {
    this.paymentStatus = "Partial";
  } else {
    this.paymentStatus = "Pending";
  }

  next();
});

// =====================================
// AUTO ORDER ID & INVOICE NUMBER
// =====================================
orderSchema.pre("save", async function (next) {

  const totalOrders =
    await mongoose.models.Order.countDocuments();

  // ORDER ID
  if (!this.orderId) {
    this.orderId =
      `ORD-${String(totalOrders + 1).padStart(
        5,
        "0"
      )}`;
  }

  // INVOICE NUMBER
  if (
    this.orderStatus === "Completed" &&
    !this.invoiceNumber
  ) {
    this.invoiceNumber =
      `INV-${String(totalOrders + 1).padStart(
        5,
        "0"
      )}`;
  }

  next();
});

module.exports = mongoose.model(
  "Order",
  orderSchema
);