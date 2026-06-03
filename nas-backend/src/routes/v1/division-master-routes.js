const express = require("express");

const router = express.Router();

const {
  createDivisionMaster,
  getAllDivisionMasters,
  getDivisionMasterById,
  updateDivisionMaster,
  deleteDivisionMaster,
} = require(
  "../../controllers/division-master-controller"
);

// CREATE
router.post(
  "/",
  createDivisionMaster
);

// GET ALL
router.get(
  "/",
  getAllDivisionMasters
);

// GET SINGLE
router.get(
  "/:id",
  getDivisionMasterById
);

// UPDATE
router.put(
  "/:id",
  updateDivisionMaster
);

// DELETE
router.delete(
  "/:id",
  deleteDivisionMaster
);

module.exports = router;