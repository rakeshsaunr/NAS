const express = require("express");

const router = express.Router();

const controller = require(
  "../../controllers/end-user-master-controller"
);

// =====================================
// CREATE
// =====================================

router.post(
  "/",
  controller.createEndUser
);

// =====================================
// GET ALL
// =====================================

router.get(
  "/",
  controller.getAllEndUsers
);

// =====================================
// GET SINGLE
// =====================================

router.get(
  "/:id",
  controller.getEndUserById
);

// =====================================
// UPDATE
// =====================================

router.put(
  "/:id",
  controller.updateEndUser
);

// =====================================
// DELETE
// =====================================

router.delete(
  "/:id",
  controller.deleteEndUser
);

module.exports = router;