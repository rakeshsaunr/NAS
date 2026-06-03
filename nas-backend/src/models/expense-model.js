// =====================================
// src/models/expense-model.js
// =====================================

const mongoose =
  require("mongoose");

const expenseSchema =
  new mongoose.Schema(
    {
      expenseDate: {
        type: Date,
        default: Date.now,
      },

      expenseCategory: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "ExpenseCategory",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      paymentMode: {
        type: String,
        enum: [
          "Cash",
          "UPI",
          "Bank Transfer",
          "Card",
        ],
        default: "Cash",
      },

      description: {
        type: String,
        trim: true,
      },

      remark: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "Approved",
          "Pending",
          "Rejected",
        ],
        default: "Approved",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Expense",
    expenseSchema
  );