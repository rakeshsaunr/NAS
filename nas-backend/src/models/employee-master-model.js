const mongoose = require("mongoose");

// =====================================
// EMPLOYEE MASTER SCHEMA
// =====================================

const employeeMasterSchema = new mongoose.Schema(
  {
    // =====================================
    // EMPLOYEE CODE (AUTO)
    // Example: EMP-0001
    // =====================================

    employeeCode: {
      type: String,
      unique: true,
    },

    // =====================================
    // TITLE
    // =====================================

    title: {
      type: String,
      enum: ["Mr.", "Ms.", "Mrs."],
      required: true,
    },

    // =====================================
    // EMPLOYEE NAME
    // =====================================

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================
    // FATHER / HUSBAND NAME
    // =====================================

    fatherOrHusbandName: {
      type: String,
      trim: true,
    },

    // =====================================
    // DIVISION (REFERENCE)
// Use correct model name: DivisionMaster
    // =====================================

    division: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DivisionMaster",
      required: true,
    },

    // =====================================
    // DATE OF BIRTH
    // =====================================

    dob: {
      type: Date,
    },

    // =====================================
    // EDUCATION
    // =====================================

    education: {
      type: String,
      trim: true,
    },

    // =====================================
    // PERMANENT ADDRESS
    // =====================================

    permanentAddress: {
      type: String,
      trim: true,
    },

    // =====================================
    // PRESENT ADDRESS
    // =====================================

    presentAddress: {
      type: String,
      trim: true,
    },

    // =====================================
    // DESIGNATION (REFERENCE)
// Use correct model name: DesignationMaster
    // =====================================

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesignationMaster",
      required: true,
    },

    // =====================================
    // DEPARTMENT (REFERENCE)
// Use correct model name: Department
    // =====================================

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // =====================================
    // DATE OF JOINING
    // =====================================

    dateOfJoining: {
      type: Date,
    },

    // =====================================
    // GENDER
    // =====================================

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    // =====================================
    // EMAIL ID
    // =====================================

    emailId: {
      type: String,
      trim: true,
      lowercase: true,
    },

    // =====================================
    // PHONE / MOBILE
    // =====================================

    phoneMobile: {
      type: String,
      trim: true,
    },

    // =====================================
    // MARITAL STATUS
    // =====================================

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },

    // =====================================
    // WEDDING ANNIVERSARY DATE
    // =====================================

    weddingAnniversaryDate: {
      type: Date,
    },

    // =====================================
    // NUMBER OF CHILDREN
    // =====================================

    noOfChilds: {
      type: Number,
      default: 0,
    },

    // =====================================
    // WORK EXPERIENCE
    // =====================================

    workExperience: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// AUTO GENERATE EMPLOYEE CODE
// =====================================

employeeMasterSchema.pre("save", async function (next) {
  try {
    if (!this.employeeCode) {
      const total = await mongoose
        .model("EmployeeMaster")
        .countDocuments({
          employeeCode: { $exists: true, $ne: null },
        });

      this.employeeCode = `EMP-${String(total + 1).padStart(4, "0")}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// =====================================
// MODEL EXPORT
// =====================================
const EmployeeMaster =
  mongoose.models.EmployeeMaster ||
  mongoose.model("EmployeeMaster", employeeMasterSchema);

module.exports = EmployeeMaster;