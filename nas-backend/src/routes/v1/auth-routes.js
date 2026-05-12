const express = require('express');
const router = express.Router();

const { AuthController } = require('../../controllers');
const { emailSchema, otpSchema } = require('../../validator/user-validation');
const validate = require('../../middlewares/validate-middleware');

// ✅ Safe async handler
let asyncHandler;
try {
  asyncHandler = require('../../utils/async-handler');
} catch (e) {
  asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

/**
 * ✅ Health check route
 * GET /api/v1/auth
 */
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Auth route working fine 🚀' });
});

/**
 * ✅ Send OTP
 */
router.post(
  '/send-otp',
  validate(emailSchema),
  asyncHandler(AuthController.sendOTP)
);

/**
 * ✅ Verify OTP (signup / login / forgot password)
 */
router.post(
  '/verify',
  validate(otpSchema),
  asyncHandler(AuthController.checkSignUpOrLogin)
);

/**
 * ✅ Password-based signup
 */
router.post('/signup', asyncHandler(AuthController.signup));

/**
 * ✅ Password-based login
 */
if (AuthController.login) {
  router.post('/login', asyncHandler(AuthController.login));
}

/**
 * ✅ Logout
 */
router.post('/logout', asyncHandler(AuthController.logOut));

/**
 * ✅ Set Password
 */
router.post('/set-password', asyncHandler(AuthController.setPassword));

/**
 * ✅ Change Password
 */
router.post('/change-password', asyncHandler(AuthController.changePassword));

/* -------------------------------------------------------------------------- */
/* ✅  🔐 2FA (Google Authenticator) Routes - Now for Everyone!               */
/* -------------------------------------------------------------------------- */

/**
 * POST /api/v1/auth/2fa/enable
 * -> User scans QR code in Google Authenticator app
 */
router.post('/2fa/enable', asyncHandler(AuthController.enable2FA));

/**
 * POST /api/v1/auth/2fa/verify
 * -> User enters 6-digit OTP to confirm 2FA setup
 */
router.post('/2fa/verify', asyncHandler(AuthController.verify2FA));

/**
 * POST /api/v1/auth/2fa/verify-login
 * -> User enters 6-digit OTP while logging in
 */
router.post('/2fa/verify-login', asyncHandler(AuthController.verifyAdmin2FA)); // rename in controller for clarity if needed

module.exports = router;
