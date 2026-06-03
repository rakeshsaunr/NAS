const mongoose = require("mongoose");

const divisionMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // DIVISION CODE
    // =====================================
    divisionCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // DIVISION NAME
    // =====================================
    divisionName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // REMARKS
    // =====================================
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE CODE FOR DIVISION CODE
// =====================================

divisionMasterSchema.pre("save", async function (next) {
  try {
    // Only generate when divisionCode is not set (for new documents)
    if (!this.divisionCode) {
      const total = await mongoose.model("DivisionMaster").countDocuments();
      this.divisionCode = `DIV-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const DivisionMaster =
  mongoose.models.DivisionMaster ||
  mongoose.model("DivisionMaster", divisionMasterSchema);

module.exports = DivisionMaster;