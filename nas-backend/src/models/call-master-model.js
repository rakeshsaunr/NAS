const mongoose = require("mongoose");

const callMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // CALL TYPE CODE
    // =====================================
    callTypeCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // CALL TYPE
    // =====================================
    callType: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // DESCRIPTION
    // =====================================
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE CODE FOR CALL TYPE CODE
// =====================================

callMasterSchema.pre("save", async function (next) {
  try {
    // Only generate when callTypeCode is not set (for new documents)
    if (!this.callTypeCode) {
      const total = await mongoose.model("CallMaster").countDocuments();
      this.callTypeCode = `CALL-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CallMaster =
  mongoose.models.CallMaster ||
  mongoose.model("CallMaster", callMasterSchema);

module.exports = CallMaster;