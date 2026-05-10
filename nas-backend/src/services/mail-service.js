
const transporter = require('../config/nodemailer')
const welcomeEmailTemplate = require('../emails/welcome-email');
const emailVerificationTemplate = require('../emails/email-verification')
const orderConfirmationTemplate = require('../emails/order-confirmation')

require('dotenv').config()



async function sendWelcomeMail(firstName,emailId) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailId,
        subject: "Welcome !",
        html: welcomeEmailTemplate(firstName)
    })
}

async function sendVerificationEmail(email,otp) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification Email from Navdana",
            html: emailVerificationTemplate(otp)
        })
    } catch (error) {
        console.log("Error in Email Verification",error)
    }
}

async function sendOrderConfirmationMail(email) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Order Confirmation Mail',
            html:orderConfirmationTemplate()
        })
    } catch (error) {
        console.log("Error in the Order confirmation email")
    }
}

module.exports = {
    sendWelcomeMail,
    sendVerificationEmail,
    sendOrderConfirmationMail
}