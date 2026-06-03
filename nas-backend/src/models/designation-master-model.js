const mongoose = require("mongoose");

// =====================================
// DESIGNATION MASTER SCHEMA
// =====================================

const designationMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // DESIGNATION CODE
    // Example: DESG-0001
    // =====================================
    designationCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // DESIGNATION NAME
    // =====================================
    designationName: {
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

    // =====================================
    // COMMENTS
    // =====================================
    comments: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE DESIGNATION CODE
// =====================================

designationMasterSchema.pre(
  "save",
  async function (next) {
    try {
      // Generate code only for new documents
      if (!this.designationCode) {
        const total = await mongoose
          .model("DesignationMaster")
          .countDocuments();

        this.designationCode = `DESG-${String(
          total + 1
        ).padStart(4, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

// =====================================
// MODEL EXPORT
// =====================================

const DesignationMaster =
  mongoose.models.DesignationMaster ||
  mongoose.model(
    "DesignationMaster",
    designationMasterSchema
  );

module.exports = DesignationMaster;