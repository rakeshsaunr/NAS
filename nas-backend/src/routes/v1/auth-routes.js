const express = require('express');

const router = express.Router();

const { AuthController } = require('../../controllers');

const {
  emailSchema,
  otpSchema,
} = require('../../validator/user-validation');

const validate = require(
  '../../middlewares/validate-middleware'
);

const {
  auth,
} = require('../../middlewares/auth-middleware');

// ✅ SAFE ASYNC HANDLER
let asyncHandler;

try {
  asyncHandler = require(
    '../../utils/async-handler'
  );
} catch (e) {
  asyncHandler =
    (fn) =>
    (req, res, next) =>
      Promise.resolve(
        fn(req, res, next)
      ).catch(next);
}

/* -------------------------------------------------------------------------- */
/* ✅ HEALTH CHECK                                                            */
/* -------------------------------------------------------------------------- */

router.get('/', (req, res) => {
  res.json({
    success: true,
    message:
      'Auth route working fine 🚀',
  });
});

/* -------------------------------------------------------------------------- */
/* ✅ SEND OTP                                                                */
/* -------------------------------------------------------------------------- */

router.post(
  '/send-otp',
  validate(emailSchema),
  asyncHandler(
    AuthController.sendOTP
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ VERIFY OTP                                                              */
/* -------------------------------------------------------------------------- */

router.post(
  '/verify',
  validate(otpSchema),
  asyncHandler(
    AuthController.checkSignUpOrLogin
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ SIGNUP                                                                  */
/* -------------------------------------------------------------------------- */

router.post(
  '/signup',
  asyncHandler(
    AuthController.signup
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ GET USERS                                                               */
/* -------------------------------------------------------------------------- */

router.get(
  '/users',
  asyncHandler(
    AuthController.getUsers
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ DELETE USER                                                             */
/* -------------------------------------------------------------------------- */

router.delete(
  '/users/:id',
  asyncHandler(
    AuthController.deleteUser
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ CREATE USER (ADMIN / OWNER ONLY)                                        */
/* -------------------------------------------------------------------------- */

router.post(
  '/create-user',
  auth,
  asyncHandler(
    (req, res, next) => {
      const role =
        String(
          req.user?.role || ''
        ).toLowerCase();

      // ✅ ONLY ADMIN & OWNER
      if (
        role !== 'admin' &&
        role !== 'owner'
      ) {
        return res.status(403).json({
          success: false,
          message:
            'Access Denied',
        });
      }

      next();
    }
  ),
  asyncHandler(
    AuthController.createUser
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ LOGIN                                                                   */
/* -------------------------------------------------------------------------- */

router.post(
  '/login',
  asyncHandler(
    AuthController.login
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ LOGOUT                                                                  */
/* -------------------------------------------------------------------------- */

router.post(
  '/logout',
  asyncHandler(
    AuthController.logOut
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ SET PASSWORD                                                            */
/* -------------------------------------------------------------------------- */

router.post(
  '/set-password',
  asyncHandler(
    AuthController.setPassword
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ CHANGE PASSWORD                                                         */
/* -------------------------------------------------------------------------- */

router.post(
  '/change-password',
  auth,
  asyncHandler(
    AuthController.changePassword
  )
);

/* -------------------------------------------------------------------------- */
/* ✅ 2FA                                                                     */
/* -------------------------------------------------------------------------- */

router.post(
  '/2fa/enable',
  asyncHandler(
    AuthController.enable2FA
  )
);

router.post(
  '/2fa/verify',
  asyncHandler(
    AuthController.verify2FA
  )
);

router.post(
  '/2fa/verify-login',
  asyncHandler(
    AuthController.verifyAdmin2FA
  )
);

module.exports = router;