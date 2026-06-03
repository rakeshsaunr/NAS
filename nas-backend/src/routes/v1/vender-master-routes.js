const express = require("express");

const router = express.Router();

const {
  createVendorMaster,
  getAllVendorMasters,
  getVendorMasterById,
  updateVendorMaster,
  deleteVendorMaster,
} = require(
  "../../controllers/vender-master-controller"
);

// CREATE
router.post(
  "/",
  createVendorMaster
);

// GET ALL
router.get(
  "/",
  getAllVendorMasters
);

// GET SINGLE
router.get(
  "/:id",
  getVendorMasterById
);

// UPDATE
router.put(
  "/:id",
  updateVendorMaster
);

// DELETE
router.delete(
  "/:id",
  deleteVendorMaster
);

module.exports = router;