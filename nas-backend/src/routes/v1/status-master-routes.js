const express = require("express");

const router = express.Router();

const {
  createStatusMaster,
  getAllStatusMasters,
  getStatusMasterById,
  updateStatusMaster,
  deleteStatusMaster,
} = require(
  "../../controllers/status-master-controller"
);

// CREATE
router.post(
  "/",
  createStatusMaster
);

// GET ALL
router.get(
  "/",
  getAllStatusMasters
);

// GET SINGLE
router.get(
  "/:id",
  getStatusMasterById
);

// UPDATE
router.put(
  "/:id",
  updateStatusMaster
);

// DELETE
router.delete(
  "/:id",
  deleteStatusMaster
);

module.exports = router;