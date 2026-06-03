// =====================================
// models/expense-category-model.js
// =====================================

const mongoose = require("mongoose");

const expenseCategorySchema =
  new mongoose.Schema(
    {
      // =====================================
      // CATEGORY NAME
      // =====================================
      categoryName: {
        type: String,
        required: [
          true,
          "Expense category name is required",
        ],
        trim: true,
        unique: true,
      },

      // =====================================
      // DESCRIPTION
      // =====================================
      description: {
        type: String,
        trim: true,
        default: "",
      },

      // =====================================
      // ACTIVE STATUS
      // =====================================
      isActive: {
        type: Boolean,
        default: true,
      },

      // =====================================
      // CATEGORY CODE
      // =====================================
      categoryCode: {
        type: String,
        unique: true,
        sparse: true,
      },

      // =====================================
      // CREATED BY
      // =====================================
      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

// =====================================
// AUTO CATEGORY CODE
// =====================================

expenseCategorySchema.pre(
  "save",
  async function (next) {

    if (!this.categoryCode) {

      const totalCategories =
        await mongoose.models.ExpenseCategory.countDocuments();

      this.categoryCode =
        `EXP-CAT-${String(
          totalCategories + 1
        ).padStart(3, "0")}`;
    }

    next();
  }
);

module.exports = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);