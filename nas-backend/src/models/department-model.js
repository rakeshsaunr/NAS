const mongoose = require("mongoose");

const departmentSchema =
  new mongoose.Schema(
    {
      // =====================================
      // DEPARTMENT CODE
      // =====================================

      departmentCode: {
        type: String,
        unique: true,
      },

      // =====================================
      // DEPARTMENT NAME
      // =====================================

      departmentName: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================
      // REMARK
      // =====================================

      remark: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

// =====================================
// AUTO GENERATE CODE
// =====================================

departmentSchema.pre(
  "save",
  async function (next) {
    try {
      const total =
        await mongoose
          .model("Department")
          .countDocuments();

      if (!this.departmentCode) {
        this.departmentCode = `DEP-${String(
          total + 1
        ).padStart(4, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department =
  mongoose.models.Department ||
  mongoose.model(
    "Department",
    departmentSchema
  );

module.exports = Department;