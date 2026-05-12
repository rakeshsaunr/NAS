// backend/models/auth-model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "staff", "customer", "user"],
      default: "user",
    },

    // Password reset
    resetOtp: { type: String },
    resetOtpExpires: { type: Date },

    /* ---------------- 2FA fields ----------------
     * twoFactorSecret      - final Base32 secret (stored after user verifies)
     * tempTwoFactorSecret  - temporary secret during setup (used for email-flow)
     * twoFactorEnabled     - boolean flag when 2FA is enabled for account
     * recoveryCodes        - array of hashed recovery codes (sha256)
     */
    twoFactorSecret: { type: String, default: null },
    tempTwoFactorSecret: { type: String, default: null },
    twoFactorEnabled: { type: Boolean, default: false },
    recoveryCodes: { type: [String], default: [] },

    // any other helper fields can go here
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
