const express = require("express");

const router = express.Router();

const {
  createCallNatureMaster,
  getAllCallNatureMasters,
  getCallNatureMasterById,
  updateCallNatureMaster,
  deleteCallNatureMaster,
} = require(
  "../../controllers/call-nature-master-controller"
);

// CREATE
router.post(
  "/",
  createCallNatureMaster
);

// GET ALL
router.get(
  "/",
  getAllCallNatureMasters
);

// GET SINGLE
router.get(
  "/:id",
  getCallNatureMasterById
);

// UPDATE
router.put(
  "/:id",
  updateCallNatureMaster
);

// DELETE
router.delete(
  "/:id",
  deleteCallNatureMaster
);

module.exports = router;