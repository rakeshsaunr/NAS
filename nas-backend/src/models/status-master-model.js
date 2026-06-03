const mongoose = require("mongoose");

const statusMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // STATUS CODE
    // =====================================

    statusCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // STATUS NAME
    // =====================================

    statusName: {
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

statusMasterSchema.pre(
  "save",
  async function (next) {
    try {
      const total =
        await mongoose
          .model("StatusMaster")
          .countDocuments();

      if (!this.statusCode) {
        this.statusCode = `STA-${String(
          total + 1
        ).padStart(4, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const StatusMaster =
  mongoose.models.StatusMaster ||
  mongoose.model(
    "StatusMaster",
    statusMasterSchema
  );

module.exports = StatusMaster;