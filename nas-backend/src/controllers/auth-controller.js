const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const crypto = require("crypto");

require("dotenv").config();

const {
  AuthService,
  MailService,
} = require("../services");

const OTP = require("../models/otp-model");
const User = require("../models/auth-model");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "replace_this_secret";

const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN ||
  "1d";

const OTP_TTL_MS = Number(
  process.env.OTP_TTL_MS ||
    5 * 60 * 1000
);

// ------------------------------------------------------------------
// TEST ROUTE
// ------------------------------------------------------------------

const testJson = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    message:
      "Auth controller working 🚀",
    time: new Date().toISOString(),
  });
};

// ------------------------------------------------------------------
// SEND OTP
// ------------------------------------------------------------------

const sendOTP = async (
  req,
  res
) => {
  try {
    const { email, type } =
      req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message:
          "Email is required",
      });
    }

    let otp;

    do {
      otp = otpGenerator.generate(
        6,
        {
          digits: true,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        }
      );
    } while (
      await OTP.findOne({ otp })
    );

    const expiresAt =
      new Date(
        Date.now() + OTP_TTL_MS
      );

    await OTP.create({
      email,
      otp,
      type:
        type || "login",
      expiresAt,
    });

    try {
      await MailService.sendOTPEmail(
        "",
        email,
        otp,
        type
      );
    } catch (err) {
      console.log(
        "MAIL ERROR:",
        err
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "OTP sent successfully",
    });
  } catch (err) {
    console.log(
      "SEND OTP ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to send OTP",
    });
  }
};

// ------------------------------------------------------------------
// VERIFY OTP
// ------------------------------------------------------------------

const checkSignUpOrLogin =
  async (req, res) => {
    try {
      const {
        email,
        otp,
      } = req.body || {};

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message:
            "Email and OTP are required",
        });
      }

      const recent =
        await OTP.findOne({
          email,
        }).sort({
          createdAt: -1,
        });

      if (!recent) {
        return res.status(404).json({
          success: false,
          message:
            "OTP not found",
        });
      }

      if (
        String(recent.otp) !==
        String(otp)
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid OTP",
        });
      }

      await OTP.deleteOne({
        _id: recent._id,
      });

      return res.status(200).json({
        success: true,
        message:
          "OTP verified successfully",
      });
    } catch (err) {
      console.log(
        "VERIFY OTP ERROR:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "OTP verification failed",
      });
    }
  };

// ------------------------------------------------------------------
// SIGNUP
// ------------------------------------------------------------------

const signup = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const allowedRoles = [
      "Admin",
      "Owner",
      "Staff",
      "Accountant",
    ];

    const roleToSet =
      allowedRoles.includes(role)
        ? role
        : "Staff";

    const {
      newUser,
      tokenObj,
    } = await AuthService.signUp({
      name:
        name ||
        email.split("@")[0],
      email,
      password,
      role: roleToSet,
    });

    return setAuthCookieAndRespond(
      res,
      tokenObj.token,
      {
        ...(newUser.toObject?.() ||
          newUser),
      },
      201,
      "Signup successful"
    );
  } catch (err) {
    console.log(
      "SIGNUP ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Server error during signup",
      error: err,
    });
  }
};

// ------------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------------

const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const response =
      await AuthService.login(
        email,
        password
      );

    return setAuthCookieAndRespond(
      res,
      response.token,
      response.user,
      200,
      "Login successful"
    );
  } catch (err) {
    console.log(
      "LOGIN ERROR:",
      err
    );

    return res.status(
      err.statusCode || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Server error",
    });
  }
};

// ------------------------------------------------------------------
// CREATE USER
// ------------------------------------------------------------------

const createUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body || {};

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required",
      });
    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const allowedRoles = [
      "Admin",
      "Owner",
      "Staff",
      "Accountant",
    ];

    const roleToSet =
      allowedRoles.includes(role)
        ? role
        : "Staff";

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role: roleToSet,
      });

    return res.status(201).json({
      success: true,
      message:
        "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email:
          newUser.email,
        role: newUser.role,
        password:
          newUser.password,
      },
    });
  } catch (err) {
    console.log(
      "CREATE USER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to create user",
      error: err,
    });
  }
};

// ------------------------------------------------------------------
// GET USERS
// ------------------------------------------------------------------

const getUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find().select(
        "+password"
      );

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(
      "GET USERS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch users",
    });
  }
};

// ------------------------------------------------------------------
// DELETE USER
// ------------------------------------------------------------------

const deleteUser = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const deletedUser =
      await User.findByIdAndDelete(
        id
      );

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (err) {
    console.log(
      "DELETE USER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete user",
    });
  }
};

// ------------------------------------------------------------------
// SET PASSWORD
// ------------------------------------------------------------------

const setPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const hashed =
      await bcrypt.hash(
        password,
        10
      );

    user.password = hashed;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to set password",
    });
  }
};

// ------------------------------------------------------------------
// CHANGE PASSWORD
// ------------------------------------------------------------------

const changePassword =
  async (req, res) => {
    try {
      const userId =
        req.user?.userId;

      const {
        currentPassword,
        newPassword,
      } = req.body || {};

      const user =
        await User.findById(
          userId
        ).select("+password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Current password incorrect",
        });
      }

      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to change password",
      });
    }
  };

// ------------------------------------------------------------------
// LOGOUT
// ------------------------------------------------------------------

const logOut = async (
  req,
  res
) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message:
      "Logout successful",
  });
};

// ------------------------------------------------------------------
// COOKIE HELPER
// ------------------------------------------------------------------

const setAuthCookieAndRespond =
  (
    res,
    token,
    user,
    status = 200,
    message = "Success"
  ) => {
    res.cookie(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        maxAge:
          24 *
          60 *
          60 *
          1000,
      }
    );

    return res.status(status).json({
      success: true,
      message,
      token,
      user,
    });
  };

// ------------------------------------------------------------------
// 2FA
// ------------------------------------------------------------------

const enable2FA = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    message:
      "2FA enabled",
  });
};

const verify2FA = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    message:
      "2FA verified",
  });
};

const verifyAdmin2FA =
  async (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "2FA login verified",
    });
  };

// ------------------------------------------------------------------

module.exports = {
  sendOTP,
  checkSignUpOrLogin,
  signup,
  login,
  createUser,
  getUsers,
  deleteUser,
  logOut,
  setPassword,
  changePassword,
  enable2FA,
  verify2FA,
  verifyAdmin2FA,
  testJson,
};