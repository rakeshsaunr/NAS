const mongoose = require("mongoose");

// =====================================
// VENDOR MASTER SCHEMA
// =====================================

const vendorMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // VENDOR CODE
    // Example: VEN-0001
    // =====================================

    vendorCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // VENDOR NAME
    // =====================================

    vendorName: {
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
// AUTO GENERATE VENDOR CODE
// =====================================

vendorMasterSchema.pre(
  "save",
  async function (next) {
    try {
      // Generate code only for new documents
      if (!this.vendorCode) {
        const total =
          await mongoose
            .model("VendorMaster")
            .countDocuments();

        this.vendorCode = `VEN-${String(
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

const VendorMaster =
  mongoose.models.VendorMaster ||
  mongoose.model(
    "VendorMaster",
    vendorMasterSchema
  );

module.exports = VendorMaster;