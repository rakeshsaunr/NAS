const express = require("express");

const router = express.Router();

const {
  createCallUrgency,
  getAllCallUrgencies,
  getCallUrgencyById,
  updateCallUrgency,
  deleteCallUrgency,
} = require(
  "../../controllers/call-urgency-controller"
);

// CREATE
router.post(
  "/",
  createCallUrgency
);

// GET ALL
router.get(
  "/",
  getAllCallUrgencies
);

// GET SINGLE
router.get(
  "/:id",
  getCallUrgencyById
);

// UPDATE
router.put(
  "/:id",
  updateCallUrgency
);

// DELETE
router.delete(
  "/:id",
  deleteCallUrgency
);

module.exports = router;