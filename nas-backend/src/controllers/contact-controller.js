
const asyncHandler = require('../utils/async-handler')
const { AppError } = require('../utils/errors')
const { ContactService } = require('../services')

const createContact = asyncHandler(async(req,res) => {

    // fetch data from req body
    const { name,email,message } = req.body

    if(!name || !email || !message) {
        throw new AppError(400,'All Fields are required')
    }

    const data = {name,email,message}

    const contact = await ContactService.createContact(data)

    if(!contact) {
        throw new AppError(400,'Error in Contact Detail creation')
    }

    return res.status(201).json({
        success: true,
        message: "Contact Detail Send Successfully"
    })
})

const getAllContactDetails = asyncHandler(async(req,res) => {
    // fetch detail from DB through contact service
    const contactDetails = await ContactService.getAllContactDetails()

    if(!contactDetails) {
        throw new AppError(404,'No Contact Details Found')
    }

    return res.status(200).json({
        success: true,
        message: "Contact Details Fetched Successfully",
        data: contactDetails
    })
})

const deleteContactDetail = asyncHandler(async(req,res) => {
    // fetch id from req param
    const {id} = req.params

    console.log("Id in the detail Contact Detail:",id)

    if(!id) {
        throw new AppError(400,'Id for contact Deletion not found')
    }

    await ContactService.deleteContactDetail(id)

    return res.status(200).json({
        success: true,
        message: "Contact Detail Deleted Successfully"
    })
})

module.exports = {
    createContact,
    getAllContactDetails,
    deleteContactDetail
}
