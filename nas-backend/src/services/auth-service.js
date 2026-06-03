const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRepository = require(
  "../repositories/auth-repository"
);

const { AppError } = require(
  "../utils/errors"
);

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "replace_this_secret";

const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN || "1d";

// 🔹 GENERATE JWT TOKEN
function generateToken(id, role) {
  return jwt.sign(
    {
      userId: id,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

// 🔹 BUILD TOKEN RESPONSE
function buildAuthResponse(
  id,
  role,
  user
) {
  const finalRole =
    role || user.role || "Staff";

  console.log(
    "✅ BUILDING TOKEN WITH ROLE:",
    finalRole
  );

  const token = generateToken(
    id,
    finalRole
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: finalRole,
    },
  };
}

// 🔹 SIGNUP
const signUp = async (
  userData
) => {
  // ✅ CHECK EXISTING USER
  const existing =
    await userRepository.getUserByEmail(
      userData.email
    );

  console.log(
    "EXISTING USER:",
    existing
  );

  // ✅ USER ALREADY EXISTS
  if (existing) {
    throw new AppError(
      409,
      "User already exists"
    );
  }

  // ✅ HASH PASSWORD
  const salt =
    await bcrypt.genSalt(10);

  const hashedPassword =
    await bcrypt.hash(
      userData.password,
      salt
    );

  // ✅ SAVE HASHED PASSWORD
  userData.password =
    hashedPassword;

  // ✅ DEFAULT ROLE
  if (!userData.role) {
    userData.role = "Staff";
  }

  // ✅ CREATE USER
  const newUser =
    await userRepository.create(
      userData
    );

  if (!newUser) {
    throw new AppError(
      500,
      "User could not be created"
    );
  }

  // ✅ TOKEN RESPONSE
  const tokenObj =
    buildAuthResponse(
      newUser._id,
      newUser.role,
      newUser
    );

  return {
    newUser,
    tokenObj,
  };
};

// 🔹 LOGIN
const login = async (
  email,
  password
) => {
  // ✅ FIND USER
  const user =
    await userRepository.getUserByEmail(
      email
    );

  if (!user) {
    throw new AppError(
      404,
      "User not found. Please sign up first."
    );
  }

  console.log(
    "🟢 USER FOUND:",
    user.email
  );

  console.log(
    "🔍 USER ROLE:",
    user.role
  );

  // ✅ PASSWORD MATCH
  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  console.log(
    "PASSWORD MATCH RESULT:",
    isMatch
  );

  if (!isMatch) {
    throw new AppError(
      401,
      "Invalid credentials."
    );
  }

  // ✅ ROLE
  const role = user.role
    ? user.role
    : "Staff";

  // ✅ RETURN TOKEN
  return buildAuthResponse(
    user._id,
    role,
    user
  );
};

// 🔹 CHECK USER EXISTS
const userExist = async (
  email
) => {
  const user =
    await userRepository.getUserByEmail(
      email
    );

  return user || null;
};

module.exports = {
  signUp,
  login,
  userExist,
};