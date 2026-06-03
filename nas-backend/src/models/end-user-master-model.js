const mongoose = require("mongoose");

// =====================================
// END USER MASTER SCHEMA
// =====================================

const endUserMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // END USER CODE
    // Example: ENDUSR-0001
    // =====================================

    endUserCode: {
      type: String,
      unique: true,
      trim: true,
    },

    // =====================================
    // END USER NAME
    // =====================================

    endUserName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // CUSTOMER (from customer master)
    // =====================================
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerMaster",
      required: true,
    },

    // =====================================
    // DEPARTMENT
    // =====================================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // =====================================
    // DESIGNATION
    // =====================================

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesignationMaster",
      required: true,
    },

    // =====================================
    // MOBILE NUMBER
    // =====================================

    mobileNumber: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================
    // EMAIL ADDRESS
    // =====================================

    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // =====================================
    // PHONE
    // =====================================

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================
    // DATE OF BIRTH
    // =====================================

    dob: {
      type: Date,
    },

    // =====================================
    // REMARK
    // =====================================

    remark: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================
    // COMMENTS
    // =====================================

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
// AUTO GENERATE END USER CODE
// =====================================

endUserMasterSchema.pre("save", async function (next) {
  try {
    if (!this.endUserCode) {
      const total = await mongoose.models.EndUserMaster.countDocuments();
      this.endUserCode = `ENDUSR-${String(total + 1).padStart(4, "0")}`;
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
  mongoose.models.EndUserMaster ||
  mongoose.model("EndUserMaster", endUserMasterSchema);