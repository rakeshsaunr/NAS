const mongoose = require("mongoose");

const instrumentMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // INSTRUMENT CODE
    // =====================================

    instrumentCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // INSTRUMENT NAME
    // =====================================

    instrumentName: {
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

instrumentMasterSchema.pre("save", async function (next) {
  try {
    const total = await mongoose.model("InstrumentMaster").countDocuments();

    if (!this.instrumentCode) {
      this.instrumentCode = `INS-${String(total + 1).padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const InstrumentMaster =
  mongoose.models.InstrumentMaster ||
  mongoose.model("InstrumentMaster", instrumentMasterSchema);

module.exports = InstrumentMaster;