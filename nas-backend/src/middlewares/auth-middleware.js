
const jwt = require('jsonwebtoken')
require('dotenv').config()


function auth(req, res, next) {
  try {
    // ✅ Extract token from headers, cookies, or body
    let token;

    // 1. Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If not in header, check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 3. If not in cookies, check body
    else if (req.body && req.body.token) {
      token = req.body.token;
    }

    console.log("TOKEN IS:", token);

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // ✅ Verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODE IS:", decode);
      req.user = decode; // attach decoded payload to request
    } catch (error) {
      console.log("Error is:", error);
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }

    // ✅ Continue
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying user",
    });
  }
}


// Higher-order middleware for role checking
function authorizeRole(role) {
  return (req, res, next) => {
    try {
      if (req.user?.role !== role) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Only ${role}s are allowed`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `${role} role validation failed`,
      });
    }
  };
}



module.exports = {
  auth,
  isAdmin: authorizeRole("admin"),
  isManager: authorizeRole("manager"),
  isStaff: authorizeRole("staff"),
  isCustomer: authorizeRole("customer"),
};