const express = require("express");
const router = express.Router();

const controller = require(
  "../../controllers/call-entry-form-controller"
);

// =====================================
// CLOUDINARY MULTER
// =====================================

const upload = require(
  "../../middlewares/upload"
);

// =====================================
// ROUTES
// =====================================

// CREATE
router.post(
  "/",
  upload.fields([
    { name: "attachment", maxCount: 1 },
  ]),
  controller.createCallEntry
);

// GET ALL
router.get(
  "/",
  controller.getAllCallEntries
);

// GET SINGLE
router.get(
  "/:id",
  controller.getCallEntryById
);

// UPDATE
router.put(
  "/:id",
  upload.fields([
    { name: "attachment", maxCount: 1 },
  ]),
  controller.updateCallEntry
);

// DELETE
router.delete(
  "/:id",
  controller.deleteCallEntry
);

// ASSIGN ENGINEER
router.put(
  "/assign/:id",
  controller.assignCall
);

module.exports = router;