// backend/controllers/auth-controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthService, MailService } = require("../services");
const otpGenerator = require("otp-generator");
const OTP = require("../models/otp-model");
const User = require("../models/auth-model");
require("dotenv").config();

const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const crypto = require("crypto");

const ADMIN_SIGNUP_MODE = (process.env.ADMIN_SIGNUP_MODE || "disabled").toLowerCase();
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const OTP_TTL_MS = Number(process.env.OTP_TTL_MS || 5 * 60 * 1000);
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// --- Utility ---
const isWhitelisted = (email) => ADMIN_EMAILS.includes(String(email || "").toLowerCase());
const canSignupAsAdmin = (email) => ADMIN_SIGNUP_MODE === "whitelist" && isWhitelisted(email);

/* -------------------------------------------------------------------------- */
/* Temporary test route to confirm JSON responses and routing                */
/* -------------------------------------------------------------------------- */
const testJson = async (req, res) => {
  try {
    console.log('[TEST] /api/v1/auth/test-json called');
    return res.status(200).json({ ok: true, time: new Date().toISOString(), msg: 'test-json ok' });
  } catch (err) {
    console.error('[TEST] error', err);
    return res.status(500).json({ ok: false, message: 'test error' });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 SEND OTP                                                                */
/* -------------------------------------------------------------------------- */
const sendOTP = async (req, res) => {
  const body = req.body || {};
  const { email } = body;
  let { type } = body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required" });
    type = String(type || "login").toLowerCase();

    if (!["signup", "login", "forgot-password"].includes(type)) type = "login";

    let otp;
    let existing;
    do {
      otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existing = await OTP.findOne({ otp });
    } while (existing);

    const expiresAt = new Date(Date.now() + OTP_TTL_MS);
    await OTP.create({ email, otp, type, expiresAt });

    try {
      await MailService.sendOTPEmail("", email, otp, type);
    } catch (err) {
      console.warn("MailService.sendOTPEmail failed:", err);
    }

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully for ${type}`,
    });
  } catch (err) {
    console.error("sendOTP error:", err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 VERIFY OTP                                                               */
/* -------------------------------------------------------------------------- */
const checkSignUpOrLogin = async (req, res) => {
  const body = req.body || {};
  const { email, otp, type, newPassword, name, role } = body;
  try {
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const normalizedType = String(type || "").toLowerCase();
    const validTypes = ["signup", "login", "forgot-password", "reset-password"];
    if (!validTypes.includes(normalizedType))
      return res.status(400).json({ message: "Invalid type" });

    const recent = await OTP.findOne({ email, type: normalizedType }).sort({ createdAt: -1 });
    if (!recent) return res.status(404).json({ message: "OTP not found" });

    if (new Date() > new Date(recent.expiresAt)) {
      await OTP.deleteOne({ _id: recent._id });
      return res.status(410).json({ message: "OTP expired" });
    }

    if (String(otp).trim() !== String(recent.otp).trim())
      return res.status(401).json({ message: "Invalid OTP" });

    await OTP.deleteOne({ _id: recent._id });

    // ✅ Login via OTP
    if (normalizedType === "login") {
      const user = await AuthService.userExist(email);
      if (!user) return res.status(404).json({ message: "User not found" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      return res.status(200).json({
        token,
        user: {
          ...user.toObject?.() || user,
          twoFactorEnabled: !!user.twoFactorEnabled,
        },
        success: true,
        message: "OTP login successful"
      });
    }

    // ✅ Signup via OTP
    if (normalizedType === "signup") {
      const existing = await AuthService.userExist(email);
      if (existing) return res.status(409).json({ message: "User already exists" });

      const username = name || email.split("@")[0];
      const roleToSet = role === "admin" && canSignupAsAdmin(email) ? "admin" : "user";
      const { newUser, tokenObj } = await AuthService.signUp({
        email,
        name: username,
        role: roleToSet,
        password: "Temp@123", // default password
      });

      return setAuthCookieAndRespond(
        res,
        tokenObj.token,
        { ...newUser.toObject?.() || newUser },
        201,
        "User created successfully"
      );
    }

    // ✅ Forgot password flow
    if (normalizedType === "forgot-password") {
      const user = await AuthService.userExist(email);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({ success: true, message: "OTP verified. Proceed to reset password." });
    }

    // ✅ Reset password flow
    if (normalizedType === "reset-password") {
      if (!newPassword)
        return res.status(400).json({ message: "New password is required" });
      const user = await AuthService.userExist(email);
      if (!user) return res.status(404).json({ message: "User not found" });

      const hashed = await bcrypt.hash(String(newPassword), 10);
      user.password = hashed;
      await user.save();

      return res
        .status(200)
        .json({ success: true, message: "Password reset successful." });
    }
  } catch (err) {
    console.error("checkSignUpOrLogin error:", err);
    return res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
    });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 LOGIN (email + password)                                                 */
/* -------------------------------------------------------------------------- */
const login = async (req, res) => {
  const body = req.body || {};
  const { email, password } = body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const response = await AuthService.login(email, password);

    const userObj = response.user.toObject?.() || response.user;
    const is2FAEnabled = !!userObj.twoFactorEnabled;

    if (is2FAEnabled) {
      return res.status(200).json({
        success: true,
        message: "2FA required",
        user: {
          ...userObj,
          twoFactorEnabled: true,
        },
        twoFactorNeeded: true,
      });
    } else {
      res.cookie("token", response.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return res.status(200).json({
        token: response.token,
        user: {
          ...userObj,
          twoFactorEnabled: false,
        },
        success: true,
        message: "Login successful"
      });
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    const status = err.statusCode || 500;
    return res.status(status).json({ message: err.message || "Server error" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 SET PASSWORD                                                              */
/* -------------------------------------------------------------------------- */
const setPassword = async (req, res) => {
  const body = req.body || {};
  const { email, password } = body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({ success: true, message: "Password set successfully!" });
  } catch (err) {
    console.error("setPassword error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 CHANGE PASSWORD                                                           */
/* -------------------------------------------------------------------------- */
const changePassword = async (req, res) => {
  const body = req.body || {};
  try {
    const userId = (req.user && req.user.id) || (req.user && req.user._id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { currentPassword, newPassword } = body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both current and new passwords are required." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(String(currentPassword), user.password || "");
    if (!match) return res.status(401).json({ message: "Current password is incorrect." });

    const hashed = await bcrypt.hash(String(newPassword), 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({ success: true, message: "Password changed successfully!" });
  } catch (err) {
    console.error("changePassword error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 SIGNUP (normal)                                                           */
/* -------------------------------------------------------------------------- */
const signup = async (req, res) => {
  const body = req.body || {};
  try {
    const { name, email, password, role } = body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const exists = await AuthService.userExist(email);
    if (exists) return res.status(409).json({ message: "User already exists" });

    const roleToSet = role === "admin" && canSignupAsAdmin(email) ? "admin" : "user";
    const { newUser, tokenObj } = await AuthService.signUp({
      name: name || email.split("@")[0],
      email,
      password,
      role: roleToSet,
    });

    return setAuthCookieAndRespond(
      res,
      tokenObj.token,
      { ...newUser.toObject?.() || newUser },
      201,
      "Signup successful"
    );
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🔹 Common Response Helper                                                     */
/* -------------------------------------------------------------------------- */
const setAuthCookieAndRespond = (res, token, user, status = 200, message = "OK") => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(status).json({
    token,
    user: {
      ...user,
      twoFactorEnabled: !!user.twoFactorEnabled,
    },
    success: true,
    message,
  });
};

const logOut = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "User logged out successfully" });
};

/* -------------------------------------------------------------------------- */
/* ----------------------------- 2FA HANDLERS -------------------------------- */
/* -------------------------------------------------------------------------- */

/**
 * Helper: generate recovery codes (plain + hashed)
 */
function generateRecoveryCodes(count = 8) {
  const plain = Array.from({ length: count }).map(() =>
    crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').slice(0, 10).toUpperCase()
  );
  const hashed = plain.map((c) => crypto.createHash('sha256').update(c).digest('hex'));
  return { plain, hashed };
}

/**
 * POST /api/v1/auth/2fa/enable
 * - Generate Base32 secret and QR data url. Save tempTwoFactorSecret in DB for this user (upsert by email).
 * Body: { email } (or authenticated user)
 */
const enable2FA = async (req, res) => {
  try {
    const body = req.body || {};
    console.log('[2FA] enable2FA called - body:', { body, user: req.user?.id });

    const userId = (req.user && req.user.id) || body.userId;
    const user = userId ? await User.findById(userId) : null;

    const email = (user && user.email) || body.email || null;
    const secretObj = speakeasy.generateSecret({
      length: 20,
      name: `YourAppName:${email || 'unknown'}`,
      issuer: 'YourAppName',
    });

    let qrDataUrl = null;
    try {
      qrDataUrl = await QRCode.toDataURL(secretObj.otpauth_url);
    } catch (qrErr) {
      console.warn('[2FA] QR generation failed, returning otpauth URL instead', qrErr);
      qrDataUrl = null;
    }

    // Save temp secret:
    if (user) {
      user.tempTwoFactorSecret = secretObj.base32;
      await user.save();
      console.log('[2FA] tempTwoFactorSecret saved for userId:', user._id.toString());
    } else if (email) {
      // Upsert by email so a later verify with { email, token } will find the secret
      await User.findOneAndUpdate(
        { email },
        { $set: { tempTwoFactorSecret: secretObj.base32 } },
        { upsert: true, new: true }
      );
      console.log('[2FA] tempTwoFactorSecret upserted for email:', email);
    } else {
      console.log('[2FA] no userId/email supplied; not persisting temp secret (client must use secret returned).');
    }

    return res.status(200).json({
      ok: true,
      secret: secretObj.base32,
      otpauthUrl: secretObj.otpauth_url,
      qrDataUrl,
      message: 'Scan this QR in an authenticator app and then POST /api/v1/auth/2fa/verify with the 6-digit code.',
    });
  } catch (err) {
    console.error('enable2FA error:', err);
    return res.status(500).json({ ok: false, message: err?.message || 'Failed to generate 2FA secret' });
  }
};

/**
 * POST /api/v1/auth/2fa/verify
 * - Verify token (from authenticator) during setup.
 * Body: { token, secret?, email? } - if secret not provided, read user's tempTwoFactorSecret via email or userId
 */
const verify2FA = async (req, res) => {
  try {
    const body = req.body || {};
    const userId = req.user?.id || body.userId;
    const { token } = body;
    let { secret } = body || {};

    if (!token) return res.status(400).json({ ok: false, message: 'Token (6-digit) is required' });

    // If secret not provided, try to find from email or userId
    if (!secret && body.email) {
      const userByEmail = await User.findOne({ email: body.email }).lean();
      secret = userByEmail?.tempTwoFactorSecret || userByEmail?.twoFactorSecret;
    }

    if (!secret && userId) {
      const userById = await User.findById(userId).lean();
      secret = userById?.tempTwoFactorSecret || userById?.twoFactorSecret;
    }

    if (!secret) return res.status(400).json({ ok: false, message: 'Secret missing. Start setup again.' });

    const valid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!valid) return res.status(400).json({ ok: false, message: 'Invalid authentication code.' });

    // success -> generate recovery codes and persist
    const { plain: recoveryPlain, hashed: recoveryHashed } = generateRecoveryCodes(8);

    // If no user context (signup flow), return recovery codes & let client send secret to server later
    if (!userId && !body.email) {
      return res.status(200).json({
        ok: true,
        message: 'Verified. Provide secret to server for storage or complete signup.',
        recoveryCodes: recoveryPlain,
      });
    }

    // Persist to user doc: set twoFactorSecret, twoFactorEnabled, save hashed recovery codes, clear temp
    const encSecret = secret; // plain base32 stored; consider encryption in prod
    const findQuery = userId ? { _id: userId } : { email: body.email };

    await User.findOneAndUpdate(findQuery, {
      $set: {
        twoFactorSecret: encSecret,
        twoFactorEnabled: true,
        recoveryCodes: recoveryHashed,
      },
      $unset: { tempTwoFactorSecret: "" },
    });

    return res.status(200).json({
      ok: true,
      message: 'Two-factor authentication enabled. Save recovery codes — shown only once.',
      recoveryCodes: recoveryPlain,
    });
  } catch (err) {
    console.error('verify2FA error:', err);
    return res.status(500).json({ ok: false, message: '2FA verification failed' });
  }
};

/**
 * POST /api/v1/auth/2fa/verify-login
 * - Verify TOTP during login or accept a recovery code
 * Body: { userId, token?, recoveryCode? }  (prefer req.user)
 */
const verifyAdmin2FA = async (req, res) => {
  try {
    const body = req.body || {};
    const userId = req.user?.id || body.userId;
    const { token, recoveryCode } = body || {};

    if (!userId) return res.status(400).json({ ok: false, message: 'User id required for 2FA verification.' });

    const user = await User.findById(userId).lean();
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ ok: false, message: '2FA not enabled for this account.' });
    }

    // Recovery code path
    if (recoveryCode) {
      const hash = crypto.createHash('sha256').update(String(recoveryCode)).digest('hex');
      const idx = (user.recoveryCodes || []).indexOf(hash);
      if (idx !== -1) {
        // remove used recovery code
        await User.findByIdAndUpdate(userId, { $pull: { recoveryCodes: hash } });
        return res.status(200).json({ ok: true, method: 'recovery-code', message: 'Recovery code accepted.' });
      } else {
        return res.status(400).json({ ok: false, message: 'Invalid recovery code.' });
      }
    }

    // TOTP verification
    const secret = user.twoFactorSecret;
    const valid = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!valid) return res.status(400).json({ ok: false, message: 'Invalid authentication code.' });

    return res.status(200).json({ ok: true, message: '2FA verified successfully.' });
  } catch (err) {
    console.error('verifyAdmin2FA error:', err);
    return res.status(500).json({ ok: false, message: '2FA verification failed' });
  }
};

/* -------------------------------------------------------------------------- */
module.exports = {
  sendOTP,
  checkSignUpOrLogin,
  login,
  signup,
  logOut,
  setPassword,
  changePassword,
  // 2FA handlers
  enable2FA,
  verify2FA,
  verifyAdmin2FA,
  // test
  testJson,
};
