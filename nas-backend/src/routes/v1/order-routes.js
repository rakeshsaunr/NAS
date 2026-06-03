// =====================================
// routes/v1/order-routes.js
// =====================================

const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require("../../controllers/order-controller");

// =====================================
// ORDER ROUTES
// BASE URL => /api/v1/order
// =====================================

// CREATE ORDER
// POST => /api/v1/order
router.post("/", createOrder);

// GET ALL ORDERS
// GET => /api/v1/order
router.get("/", getAllOrders);

// GET SINGLE ORDER
// GET => /api/v1/order/:id
router.get("/:id", getOrderById);

// UPDATE ORDER
// PUT => /api/v1/order/:id
router.put("/:id", updateOrderById);

// DELETE ORDER
// DELETE => /api/v1/order/:id
router.delete("/:id", deleteOrderById);

module.exports = router;