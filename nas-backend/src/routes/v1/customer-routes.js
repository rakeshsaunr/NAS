// ===========================================
// routes/v1/customer-routes.js
// ===========================================

const express = require("express");

const router = express.Router();

const controller = require(
  "../../controllers/customer-controller"
);

// CREATE

router.post(
  "/",
  controller.createCustomer
);

// GET ALL

router.get(
  "/",
  controller.getAllCustomers
);

// GET SINGLE

router.get(
  "/:id",
  controller.getCustomer
);

// UPDATE

router.put(
  "/:id",
  controller.updateCustomer
);

// DELETE

router.delete(
  "/:id",
  controller.deleteCustomer
);

module.exports = router;