const express = require("express");

const router = express.Router();

const {
  createSupportPeriod,
  getAllSupportPeriods,
  getSupportPeriodById,
  updateSupportPeriod,
  deleteSupportPeriod,
} = require(
  "../../controllers/support-period-master-controller"
);

// CREATE
router.post(
  "/",
  createSupportPeriod
);

// GET ALL
router.get(
  "/",
  getAllSupportPeriods
);

// GET SINGLE
router.get(
  "/:id",
  getSupportPeriodById
);

// UPDATE
router.put(
  "/:id",
  updateSupportPeriod
);

// DELETE
router.delete(
  "/:id",
  deleteSupportPeriod
);

module.exports = router;