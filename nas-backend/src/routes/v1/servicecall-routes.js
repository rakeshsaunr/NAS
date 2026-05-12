const express = require("express");
const router = express.Router();

const controller = require("../../controllers/servicecall-controller");

// CREATE
router.post("/", controller.createServiceCall);

// GET ALL
router.get("/", controller.getAllServiceCalls);

// GET SINGLE
router.get("/:id", controller.getServiceCallById);

// UPDATE
router.put("/:id", controller.updateServiceCall);

// DELETE
router.delete("/:id", controller.deleteServiceCall);

module.exports = router;