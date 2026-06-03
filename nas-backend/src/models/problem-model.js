const mongoose = require("mongoose");

// =====================================
// PROBLEM MASTER SCHEMA
// =====================================

const problemSchema = new mongoose.Schema(
  {
    // Problem Code: e.g. PRO-0001, auto generate
    problemCode: {
      type: String,
      unique: true,
    },

    // Problem Name/Title
    problemName: {
      type: String,
      required: true,
      trim: true,
    },

    // Remark/Description (optional)
    remark: {
      type: String,
      trim: true,
    },

    // Comments (optional, array of strings)
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
// AUTO GENERATE PROBLEM CODE
// =====================================

problemSchema.pre("save", async function (next) {
  try {
    if (!this.problemCode) {
      const total = await mongoose.model("Problem").countDocuments();
      this.problemCode = `PRO-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// =====================================
// MODEL EXPORT
// =====================================

const Problem =
  mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);

module.exports = Problem;