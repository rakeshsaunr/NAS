const express = require('express')
const router = express.Router()
const {AuthController} = require('../../controllers')
const { emailSchema,otpSchema } = require('../../validator/user-validation')
const validate = require('../../middlewares/validate-middleware')


router.post('/verify',
    validate(otpSchema),
    AuthController.checkSignUpOrLogin
)

// router.post('/login',
//     AuthController.login
// )

router.post('/logout',
    AuthController.logOut
)

router.post('/send-otp',
    validate(emailSchema),
    AuthController.sendOTP
)

module.exports = router