const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserRepository } = require("../repositories");
const { AppError } = require("../utils/errors");

const userRepository = new UserRepository();

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

// 🔹 Generate JWT token
function generateToken(id, role) {
  return jwt.sign({ userId: id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 🔹 Build token + user response
function buildAuthResponse(id, role, user) {
  // ✅ Ensure role always correct
  const finalRole = role || user.role || "user";
  console.log("✅ BUILDING TOKEN WITH ROLE:", finalRole);

  const token = generateToken(id, finalRole);

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

// 🔹 SIGNUP — hashes password before saving
const signUp = async (userData) => {
  const existing = await userRepository.findByEmail(userData.email);
  if (existing) throw new AppError(409, "User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;

  // ✅ Default role if not provided
  if (!userData.role) userData.role = "user";

  const newUser = await userRepository.create(userData);
  if (!newUser) throw new AppError(500, "User could not be created");

  const tokenObj = buildAuthResponse(newUser._id, newUser.role, newUser);
  return { newUser, tokenObj };
};

// 🔹 LOGIN — checks password properly
const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new AppError(404, "User not found. Please sign up first.");

  console.log("🟢 USER FOUND:", user.email);
  console.log("🔍 USER ROLE FROM DB:", user.role);
  console.log("HASH IN DB:", user.password);
  console.log("PASSWORD ENTERED:", password);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH RESULT:", isMatch);

  if (!isMatch) throw new AppError(401, "Invalid credentials.");

  // ✅ Ensure role from DB is used (force lowercase)
  const role = user.role ? user.role.toLowerCase() : "user";
  console.log("✅ BUILDING TOKEN WITH ROLE:", role);

  return buildAuthResponse(user._id, role, user);
};

// 🔹 Check if user exists
async function userExist(email) {
  return await userRepository.findByEmail(email);
}

module.exports = {
  signUp,
  login,
  userExist,
};
