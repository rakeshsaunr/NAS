// backend/models/auth-model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ✅ NAME
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ EMAIL
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ✅ PASSWORD
    password: {
      type: String,
      required: true,
      select: false,
    },

    // ✅ ROLE
    role: {
      type: String,
      enum: [
        "Admin",
        "Owner",
        "Staff",
        "Accountant",
      ],
      default: "Staff",
    },

    // ✅ PASSWORD RESET
    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpires: {
      type: Date,
      default: null,
    },

    // ✅ 2FA SECRET
    twoFactorSecret: {
      type: String,
      default: null,
    },

    // ✅ TEMP SECRET
    tempTwoFactorSecret: {
      type: String,
      default: null,
    },

    // ✅ 2FA STATUS
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // ✅ RECOVERY CODES
    recoveryCodes: {
      type: [String],
      default: [],
    },

    // ✅ ACCOUNT STATUS
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ PREVENT OVERWRITE MODEL ERROR
module.exports =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );