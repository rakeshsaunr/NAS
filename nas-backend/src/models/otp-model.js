const mongoose = require('mongoose')
const { MailService } = require('../services')

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await MailService.sendVerificationEmail(email, otp)
        console.log("Mail Response is:", mailResponse);
    } catch (error) {
        onsole.log("Error occured while verifying the email", error);
    }
}

OTPSchema.post('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp)
})

module.exports = mongoose.model('OTP', OTPSchema)