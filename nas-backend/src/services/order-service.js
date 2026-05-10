
const mongoose = require('mongoose')

const { OrderRepository, CrudRepository } = require('../repositories')
const { OrderModel } = require('../models')
const MailService = require('./mail-service')

const orderRepository = new OrderRepository()

async function createOrder(userId, items, shippingAddress) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let updatedItems = [];
    let itemsPrice = 0;

    for (const item of items) {
      if (!item.quantity || item.quantity <= 0) {
        throw new Error(`Invalid quantity for product: ${item.product}`);
      }

      // check stock & lock
      const product = await orderRepository.checkAvailabityAndUpdate(
        item,
        session
      );

      if (!product) {
        throw new Error(
          `Not enough stock for product: ${item.product}, variant: ${item.color} - ${item.size}`
        );
      }

      const quantityPrice = product.price * item.quantity;
      itemsPrice += quantityPrice;

      updatedItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        size: item.size,
        color: item.color,
        sku: item.sku,
      });
    }

    const shippingPrice = itemsPrice > 1000 ? 0 : 0;   // shippinh cost needed to be changes here 
    const taxPrice = 0;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await orderRepository.create(
      {
        user: userId,
        items: updatedItems,
        shippingAddress,
        paymentMethod: "razorpay", // always razorpay
        prices: {
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
      },
      session
    );

    await orderRepository.addOrderToUser(order._id, userId, session);

    const email = await orderRepository.userEmail(userId)

    await session.commitTransaction();
    MailService.sendOrderConfirmationMail(email)
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}


async function getUserOrders(userId) {
    const userOrders = await orderRepository.getAll({user:userId})
    return userOrders
}


async function getOrder(orderId) {
    const order = await orderRepository.getById(orderId)
    return order
}


async function getAllOrders() {
    const orders = await orderRepository.populateOrderDetails()
    return orders
}

async function updateOrderStatus(orderId,orderStatus,session = null) {
          console.log("Insise the Order Status Updation Service")

    const order = await orderRepository.updateOrderStatus(orderId,orderStatus,{session})
    // if(!order) throw 
    return order
}

async function updateOrderPayment(razorpayOrderId, paymentInfo) {
  const order = await OrderModel.findOne({ "paymentInfo.orderId": razorpayOrderId });
  if (!order) throw new Error("Order not found");

  order.paymentInfo = {
    ...order.paymentInfo,
    ...paymentInfo,
  };

  await order.save();
  return order;
}


module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    getOrder,
    updateOrderStatus,
    updateOrderPayment
}