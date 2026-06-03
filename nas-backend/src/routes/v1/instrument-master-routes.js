const express = require("express");

const router = express.Router();

const {
  createInstrumentMaster,
  getAllInstrumentMasters,
  getInstrumentMasterById,
  updateInstrumentMaster,
  deleteInstrumentMaster,
} = require(
  "../../controllers/instrument-master-controller"
);

// CREATE
router.post(
  "/",
  createInstrumentMaster
);

// GET ALL
router.get(
  "/",
  getAllInstrumentMasters
);

// GET SINGLE
router.get(
  "/:id",
  getInstrumentMasterById
);

// UPDATE
router.put(
  "/:id",
  updateInstrumentMaster
);

// DELETE
router.delete(
  "/:id",
  deleteInstrumentMaster
);

module.exports = router;