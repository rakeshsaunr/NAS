const express = require("express");

const router = express.Router();

const {
  createCallTypeMaster,
  getAllCallTypeMasters,
  getCallTypeMasterById,
  updateCallTypeMaster,
  deleteCallTypeMaster,
} = require(
  "../../controllers/call-type-master-controller"
);

// CREATE
router.post(
  "/",
  createCallTypeMaster
);

// GET ALL
router.get(
  "/",
  getAllCallTypeMasters
);

// GET SINGLE
router.get(
  "/:id",
  getCallTypeMasterById
);

// UPDATE
router.put(
  "/:id",
  updateCallTypeMaster
);

// DELETE
router.delete(
  "/:id",
  deleteCallTypeMaster
);

module.exports = router;