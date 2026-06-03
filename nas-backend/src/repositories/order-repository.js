// =====================================
// repositories/order-repository.js
// =====================================

const Order = require("../models/order-model");

// CREATE ORDER
const createOrder = async (payload) => {
  return await Order.create(payload);
};

// GET ALL ORDERS
const getAllOrders = async () => {

  return await Order.find({})

    .populate({
      path: "client",
      select:
        "clientName mobileNumber companyName address",
    })

    .populate({
      path: "category",
      select: "categoryName",
    })

    .populate({
      path: "assignedTo",
      select: "employeeName",
    })

    .populate({
      path: "assignedTeam",
      select: "employeeName",
    })

    .sort({ createdAt: -1 });
};

// GET SINGLE ORDER
const getOrderById = async (id) => {

  return await Order.findById(id)

    .populate({
      path: "client",
      select:
        "clientName mobileNumber companyName address",
    })

    .populate({
      path: "category",
      select: "categoryName",
    })

    .populate({
      path: "assignedTo",
      select: "employeeName",
    })

    .populate({
      path: "assignedTeam",
      select: "employeeName",
    });
};

// UPDATE ORDER
const updateOrderById = async (
  id,
  payload
) => {

  return await Order.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  )

    .populate({
      path: "client",
      select:
        "clientName mobileNumber companyName address",
    })

    .populate({
      path: "category",
      select: "categoryName",
    })

    .populate({
      path: "assignedTo",
      select: "employeeName",
    })

    .populate({
      path: "assignedTeam",
      select: "employeeName",
    });
};

// DELETE ORDER
const deleteOrderById = async (id) => {

  return await Order.findByIdAndDelete(id);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};