const express = require("express");

const router = express.Router();

const {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
} = require(
  "../../controllers/designation-master-controller"
);

// CREATE
router.post(
  "/",
  createDesignation
);

// GET ALL
router.get(
  "/",
  getAllDesignations
);

// GET SINGLE
router.get(
  "/:id",
  getDesignationById
);

// UPDATE
router.put(
  "/:id",
  updateDesignation
);

// DELETE
router.delete(
  "/:id",
  deleteDesignation
);

module.exports = router;