const express = require("express");

const router = express.Router();

const {
  createItemType,
  getAllItemTypes,
  getItemTypeById,
  updateItemType,
  deleteItemType,
} = require(
  "../../controllers/item-type-master-controller"
);

// CREATE
router.post(
  "/",
  createItemType
);

// GET ALL
router.get(
  "/",
  getAllItemTypes
);

// GET SINGLE
router.get(
  "/:id",
  getItemTypeById
);

// UPDATE
router.put(
  "/:id",
  updateItemType
);

// DELETE
router.delete(
  "/:id",
  deleteItemType
);

module.exports = router;