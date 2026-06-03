const mongoose = require("mongoose");

// =====================================
// SUPPORT PERIOD MASTER SCHEMA
// =====================================

const supportPeriodMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // SUPPORT PERIOD CODE
    // Example: SUPP-0001
    // =====================================

    supportPeriodCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // SUPPORT PERIOD NAME
    // =====================================

    supportPeriodName: {
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
// AUTO GENERATE SUPPORT PERIOD CODE
// =====================================

supportPeriodMasterSchema.pre(
  "save",
  async function (next) {
    try {
      // Generate code only for new documents
      if (!this.supportPeriodCode) {
        const total = await mongoose
          .model("SupportPeriodMaster")
          .countDocuments();

        this.supportPeriodCode = `SUPP-${String(
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

const SupportPeriodMaster =
  mongoose.models.SupportPeriodMaster ||
  mongoose.model(
    "SupportPeriodMaster",
    supportPeriodMasterSchema
  );

module.exports = SupportPeriodMaster;