const express = require("express");

const router = express.Router();

const {
  createCustomerTypeMaster,
  getAllCustomerTypeMasters,
  getCustomerTypeMasterById,
  updateCustomerTypeMaster,
  deleteCustomerTypeMaster,
} = require(
  "../../controllers/customer-type-master-controller"
);

// CREATE
router.post(
  "/",
  createCustomerTypeMaster
);

// GET ALL
router.get(
  "/",
  getAllCustomerTypeMasters
);

// GET SINGLE
router.get(
  "/:id",
  getCustomerTypeMasterById
);

// UPDATE
router.put(
  "/:id",
  updateCustomerTypeMaster
);

// DELETE
router.delete(
  "/:id",
  deleteCustomerTypeMaster
);

module.exports = router;