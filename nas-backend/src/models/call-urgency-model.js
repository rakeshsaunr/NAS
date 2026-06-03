const mongoose = require("mongoose");

const callUrgencySchema = new mongoose.Schema(
  {
    // =====================================
    // URGENCY CODE
    // =====================================
    urgencyCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // URGENCY LEVEL
    // =====================================
    urgencyLevel: {
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
// AUTO GENERATE CODE FOR URGENCY CODE
// =====================================

callUrgencySchema.pre("save", async function (next) {
  try {
    // Only generate when urgencyCode is not set (for new documents)
    if (!this.urgencyCode) {
      const total = await mongoose.model("CallUrgency").countDocuments();
      this.urgencyCode = `URGENCY-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CallUrgency =
  mongoose.models.CallUrgency ||
  mongoose.model("CallUrgency", callUrgencySchema);

module.exports = CallUrgency;