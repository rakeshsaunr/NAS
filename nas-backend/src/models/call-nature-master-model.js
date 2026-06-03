const mongoose = require("mongoose");

const callNatureMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // CALL NATURE CODE
    // =====================================
    callNatureCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // CALL NATURE NAME
    // =====================================
    callNatureName: {
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

callNatureMasterSchema.pre("save", async function (next) {
  try {
    const total = await mongoose
      .model("CallNatureMaster")
      .countDocuments();

    if (!this.callNatureCode) {
      this.callNatureCode = `CNM-${String(total + 1).padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const CallNatureMaster =
  mongoose.models.CallNatureMaster ||
  mongoose.model("CallNatureMaster", callNatureMasterSchema);

module.exports = CallNatureMaster;