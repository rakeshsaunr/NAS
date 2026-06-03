const express = require("express");

const router = express.Router();

const {
  createCallMaster,
  getAllCallMasters,
  getCallMasterById,
  updateCallMaster,
  deleteCallMaster,
} = require(
  "../../controllers/call-master-controller"
);

// CREATE
router.post(
  "/",
  createCallMaster
);

// GET ALL
router.get(
  "/",
  getAllCallMasters
);

// GET SINGLE
router.get(
  "/:id",
  getCallMasterById
);

// UPDATE
router.put(
  "/:id",
  updateCallMaster
);

// DELETE
router.delete(
  "/:id",
  deleteCallMaster
);

module.exports = router;