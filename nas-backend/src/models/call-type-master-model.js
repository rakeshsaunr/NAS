const mongoose = require("mongoose");

const callTypeMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // CALL TYPE CODE
    // =====================================
    callTypeCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // CALL TYPE NAME
    // =====================================
    callTypeName: {
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
callTypeMasterSchema.pre(
  "save",
  async function (next) {
    try {
      const total =
        await mongoose
          .model("CallTypeMaster")
          .countDocuments();

      if (!this.callTypeCode) {
        this.callTypeCode = `CTM-${String(
          total + 1
        ).padStart(4, "0")}`;
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

const CallTypeMaster =
  mongoose.models.CallTypeMaster ||
  mongoose.model(
    "CallTypeMaster",
    callTypeMasterSchema
  );

module.exports = CallTypeMaster;