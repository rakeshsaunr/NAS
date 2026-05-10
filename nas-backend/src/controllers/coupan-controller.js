
const asyncHandler = require('../utils/async-handler')
const { AppError } = require('../utils/errors')
const { CoupanService } = require('../services')

const createCoupan = asyncHandler(async(req,res,next) => {


    // fetch data from req body
    const { code,discountType,discountValue,usageLimit,perUserLimit,expiry,isActive,usedCount } = req.body
    // apply validation 
    if (
  code === undefined || 
  discountType === undefined || 
  discountValue === undefined || 
  usageLimit === undefined || 
  usedCount === undefined || 
  perUserLimit === undefined || 
  expiry === undefined
)  {
        throw new AppError(400,'All fields Required')
    }

    // validate discount type
    const validTypes = ['percentage','flat']
    if(!validTypes.includes(discountType)) {
        throw new AppError(400,'Invalid discount type. Must be "percentage" or "flat."')
    }

    // validate discount value
    if(discountValue <= 0) {
        throw new AppError(400,'Discount value must be greater then 0.')
    }

    // validate expiry date (must be future)
    const expiryDate = new Date(expiry)

    if(isNaN(expiryDate.getTime())) {
        throw new AppError(400,'Invalid expiry Date format.')
    }

    if(expiryDate <= new Date()) {
        throw new AppError(400,'Expiry date must be in the future')
    }

    const payloadData = {
        code: code.toUpperCase().trim(),
        discountType,
        discountValue,
        expiry,
        usageLimit,
        usedCount,
        perUserLimit,
        isActive
    }

    await CoupanService.createCoupan(payloadData)

    return res.status(201).json({
        success: true,
        message: "Coupan Created Successfully"
    })

})

const getAllCoupans = asyncHandler(async(req,res,next) => {
    const allCoupans = await CoupanService.getAllCoupans()

    if(!allCoupans) {
        throw new AppError(404,'No Coupan is Found')
    }

    return res.status(200).json({
        success: true,
        message: "Coupon Fetched Successfully",
        data: allCoupans
    })
})

module.exports = {
    createCoupan,
    getAllCoupans
}