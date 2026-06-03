const mongoose = require("mongoose");

const technicianMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // TECHNICIAN CODE
    // =====================================

    technicianCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // TECHNICIAN NAME
    // =====================================

    technicianName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // CONTACT NO
    // =====================================

    contactNo: {
      type: String,
      trim: true,
    },

    // =====================================
    // EMAIL
    // =====================================

    email: {
      type: String,
      trim: true,
      lowercase: true,
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

technicianMasterSchema.pre(
  "save",
  async function (next) {
    try {
      const total =
        await mongoose
          .model("TechnicianMaster")
          .countDocuments();

      if (!this.technicianCode) {
        this.technicianCode = `TEC-${String(
          total + 1
        ).padStart(4, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const TechnicianMaster =
  mongoose.models.TechnicianMaster ||
  mongoose.model(
    "TechnicianMaster",
    technicianMasterSchema
  );

module.exports = TechnicianMaster;