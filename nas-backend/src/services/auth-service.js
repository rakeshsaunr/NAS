const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { UserRepository } = require('../repositories')
const { AppError } = require('../utils/errors')

const userRepository = new UserRepository()


function generateToken(id, role) {

  if (!process.env.JWT_SECRET) {
    throw new AppError(500, 'JWT_SECRET not defined in env', 500)
  }

  return jwt.sign(
    { userId: id, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}



// Authentication Response
function buildAuthResponse(id, role, newUser) {
  // generate the token
  const token = generateToken(id, role)

  return {
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    }
  }
}

const signUp = async (userData) => {

  // create new user
  const newUser = await userRepository.create(userData);

  if (!newUser) {
    throw new AppError(500, 'User Could not be created')
  }

  // generate token for new user
  const tokenObj = buildAuthResponse(newUser._id, newUser.role, newUser);

  return { newUser, tokenObj };

};



const login = async (email) => {
  // after OTP verification is successful
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new AppError("User not found. Please sign up first.");
  }

  return buildAuthResponse(user._id, user.role, user);
};

async function userExist(email) {
  return await userRepository.findByEmail(email)
}


module.exports = {
  signUp,
  login,
  userExist,
}