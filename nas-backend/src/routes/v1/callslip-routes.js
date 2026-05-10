const express = require("express");
const router = express.Router();

const controller = require('../../controllers/callslip-controller');

router.post("/", controller.createCallSlip);
router.get("/", controller.getAllCallSlips);
router.get("/:id", controller.getCallSlip);
router.put("/:id", controller.updateCallSlip);
router.delete("/:id", controller.deleteCallSlip);

module.exports = router;