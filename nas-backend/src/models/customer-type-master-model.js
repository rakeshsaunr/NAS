const mongoose = require("mongoose");

// =====================================
// CUSTOMER TYPE MASTER SCHEMA
// =====================================

const customerTypeMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // CUSTOMER TYPE CODE
    // Example: CT-0001
    // =====================================
    customerTypeCode: {
      type: String,
      unique: true,
      trim: true,
    },

    // =====================================
    // CUSTOMER TYPE NAME
    // =====================================
    customerTypeName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // REMARKS
    // =====================================
    remark: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE CUSTOMER TYPE CODE
// =====================================

customerTypeMasterSchema.pre("save", async function (next) {
  try {
    if (!this.customerTypeCode) {
      const total = await mongoose.models.CustomerTypeMaster.countDocuments();
      this.customerTypeCode = `CT-${String(total + 1).padStart(4, "0")}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// =====================================
// MODEL EXPORT
// =====================================

module.exports =
  mongoose.models.CustomerTypeMaster ||
  mongoose.model("CustomerTypeMaster", customerTypeMasterSchema);