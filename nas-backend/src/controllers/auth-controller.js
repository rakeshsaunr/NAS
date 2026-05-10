const { AuthService, MailService } = require('../services')
const otpGenerator = require('otp-generator')
const OTP = require('../models/otp-model')
const { SuccessResponse } = require('../utils/common')

const { AppError } = require('../utils/errors')
const asyncHandler = require('../utils/async-handler')

// const { UserRepository } = require('../repositories')

require('dotenv').config()


const sendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        const message = "Email Not Found req Body"
        throw new AppError(404, message)
    }

    // generate-otp
    let otp
    let existingOtp
    do {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        existingOtp = await OTP.findOne({ otp })
    } while (existingOtp)

    await OTP.create({ email, otp })

    return res.status(200).json({
        success: true,
        message: "OTP Send Successfully"
    })

})

const signUp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        throw new AppError(400, 'All Details Required')
    }

    const recentOTP = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1)


    /// VALIDATE OTP
    if (recentOTP.length === 0) {
        // otp not exist
        throw new AppError(404, 'OTP Not Found')
    } else if (otp !== recentOTP[0].otp) {
        throw new AppError(401, 'Invalid OTP')
    }

    const name = "user_name"

    const { newUser, tokenObj } = await AuthService.signUp({ email, name })


    res.cookie('token', tokenObj.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: 'none'
    })

    MailService.sendWelcomeMail("", req.body.email)

    return res
        .status(201)
        .json({
            token: tokenObj.token,
            user: newUser,
            message: 'User Created Successfully',
        })
})

const login = asyncHandler(async(req,res,next) => {
    const { email, otp } = req.body

        // check request body is valid or not
        if(!email || !otp) {
            throw new AppError(400,'All Credentials Required')
        }

        const recentOTP = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1)

        /// VALIDATE OTP
        if (recentOTP.length === 0) {
            return  next(new AppError(404,'OTP Not Found'))
        } 
        else if (otp !== recentOTP[0].otp) {
            throw new AppError(401,'Invalid OTP')
            //return next(new AppError(401,'Invalid OTP'))
            // return res.status(401).json({
            //     success: false,
            //     message: "Invalid OTP"
            // })
        }

        const result = await AuthService.login(email)

        const token = result.token

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        res.status(200).json({
            token: token,
            message: 'User Login successful',
            user: result.user
        });
})

const checkSignUpOrLogin = asyncHandler(async(req,res,next) => {
    const user = await AuthService.userExist(req.body.email)
        if (user) {
            return login(req, res,next)
        } else {
            return signUp(req, res,next)
        }
})


const logOut = asyncHandler(async(req,res) => {
    res.clearCookie('token')

    return res.status(200).json({
        success: true,
        message: "User Logged Out Successfully"
    })
})



module.exports = { signUp, login, logOut, sendOTP, checkSignUpOrLogin }