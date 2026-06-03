const express = require("express");

const router = express.Router();

const {
  createTechnicianMaster,
  getAllTechnicianMasters,
  getTechnicianMasterById,
  updateTechnicianMaster,
  deleteTechnicianMaster,
} = require(
  "../../controllers/technician-master-controller"
);

// CREATE
router.post(
  "/",
  createTechnicianMaster
);

// GET ALL
router.get(
  "/",
  getAllTechnicianMasters
);

// GET SINGLE
router.get(
  "/:id",
  getTechnicianMasterById
);

// UPDATE
router.put(
  "/:id",
  updateTechnicianMaster
);

// DELETE
router.delete(
  "/:id",
  deleteTechnicianMaster
);

module.exports = router;