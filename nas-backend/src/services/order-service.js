// =====================================
// services/order-service.js
// =====================================

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require(
  "../repositories/order-repository"
);

// =====================================
// GENERATE ORDER ID
// =====================================

const generateOrderId = () => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `ORD-${Date.now()}-${random}`;
};

// =====================================
// CREATE ORDER
// =====================================

const createOrderService =
  async (payload) => {

    // VALIDATION

    if (!payload.client) {
      throw new Error(
        "Client is required"
      );
    }

    if (!payload.category) {
      throw new Error(
        "Category is required"
      );
    }

    // AUTO ORDER ID

    payload.orderId =
      generateOrderId();

    // DEFAULT STATUS

    if (!payload.orderStatus) {
      payload.orderStatus =
        "Incoming";
    }

    // FINAL AMOUNT

    payload.finalAmount =
      Number(
        payload.finalAmount || 0
      );

    // RECEIVED AMOUNT

    payload.receivedAmount =
      Number(
        payload.receivedAmount || 0
      );

    // PENDING AMOUNT

    payload.pendingAmount =
      payload.finalAmount -
      payload.receivedAmount;

    // PAYMENT STATUS

    if (
      payload.pendingAmount <= 0
    ) {

      payload.paymentStatus =
        "Paid";

    } else if (
      payload.receivedAmount > 0
    ) {

      payload.paymentStatus =
        "Partial";

    } else {

      payload.paymentStatus =
        "Pending";
    }

    return await createOrder(
      payload
    );
  };

// =====================================
// GET ALL ORDERS
// =====================================

const getAllOrdersService =
  async () => {

    return await getAllOrders();
  };

// =====================================
// GET SINGLE ORDER
// =====================================

const getOrderByIdService =
  async (id) => {

    return await getOrderById(
      id
    );
  };

// =====================================
// UPDATE ORDER
// =====================================

const updateOrderByIdService =
  async (id, payload) => {

    // FINAL AMOUNT

    payload.finalAmount =
      Number(
        payload.finalAmount || 0
      );

    // RECEIVED AMOUNT

    payload.receivedAmount =
      Number(
        payload.receivedAmount || 0
      );

    // PENDING AMOUNT

    payload.pendingAmount =
      payload.finalAmount -
      payload.receivedAmount;

    // PAYMENT STATUS

    if (
      payload.pendingAmount <= 0
    ) {

      payload.paymentStatus =
        "Paid";

    } else if (
      payload.receivedAmount > 0
    ) {

      payload.paymentStatus =
        "Partial";

    } else {

      payload.paymentStatus =
        "Pending";
    }

    return await updateOrderById(
      id,
      payload
    );
  };

// =====================================
// DELETE ORDER
// =====================================

const deleteOrderByIdService =
  async (id) => {

    return await deleteOrderById(
      id
    );
  };

module.exports = {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderByIdService,
  deleteOrderByIdService,
};