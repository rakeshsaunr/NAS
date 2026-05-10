const { OrderService } = require('../services')
const razorpay = require('../config/razorpay')

async function createOrder(req, res) {
  try {
    
    const { items, shippingAddress } = req.body;
    const userId = req.user.userId;

    // Step 1: Create DB order (pending)
    const order = await OrderService.createOrder(userId, items, shippingAddress);

    // Step 2: Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.prices.totalPrice * 100, // in paise
      currency: "INR",
      receipt: order._id.toString(),
    });

    console.log("Razorpay Order:",razorpayOrder)

    // Step 3: Save Razorpay order ID in DB
    order.paymentInfo = {
      orderId: razorpayOrder.id,
      status: "created",
    };

    console.log("Order Created is:",order)

    await order.save();

    // Step 4: Send both DB order + Razorpay order to frontend
    return res.status(201).json({
      success: true,
      message: "Order created, proceed to payment",
      order,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID, // 🔑 frontend needs this
    });
  } catch (error) {
    console.error("CreateOrder Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}


async function getUserOrders(req,res) {
    try {
        const userId = req.user.userId
        const userOrders = await OrderService.getUserOrders(userId)
        return res.status(200).json({
            success:true,
            message:"User Orders Fetched Successfully",
            orders: userOrders
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Fetching User Order",
            error: error.message
        })   
    }
}

async function getOrder(req,res) {
    try {
        const {orderId} = req.params
        
        const order = await OrderService.getOrder(orderId)
        return res.status(200).json({
            success: true,
            message: "Order Fetched Successfully",
            data: order
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in Order Fetching",
            error: error.message
        })
    }
}

async function getAllOrders(req,res) {
    try {
        const orders = await OrderService.getAllOrders()
        return res.status(200).json({
            success: true,
            message: "Orders Fetched Successfully",
            orders: orders
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in all Orders Fetching",
            error: error.message
        })
    }
}

async function updateOrderStatus(req,res) {
    try {
        console.log("Insise the Order Status Updation Controller")
        const { orderId } = req.params
        const orderStatus = req.body.status

        const order = await OrderService.updateOrderStatus(orderId,orderStatus)

        return res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            updatedStatusOrder: order
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Error in Order Status Updation",
            error: error.message
        })
    }
}

module.exports = {
    createOrder,
    getUserOrders,
    getOrder,
    getAllOrders,
    updateOrderStatus
}