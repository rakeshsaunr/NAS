const express = require("express");

const router = express.Router();

const {
  createCallSlip,
  getAllCallSlips,
  getCallSlip,
  updateCallSlip,
  deleteCallSlip,
} = require("../../controllers/callslip-controller");

/*
|--------------------------------------------------------------------------
| Call Slip Routes
|--------------------------------------------------------------------------
| Base URL : /api/v1/callslip
|--------------------------------------------------------------------------
*/

// ============================================
// CREATE CALL SLIP
// POST : /api/v1/callslip
// ============================================

router.post("/", createCallSlip);

// ============================================
// GET ALL CALL SLIPS
// GET : /api/v1/callslip
// ============================================

router.get("/", getAllCallSlips);

// ============================================
// GET SINGLE CALL SLIP
// GET : /api/v1/callslip/:id
// ============================================

router.get("/:id", getCallSlip);

// ============================================
// UPDATE CALL SLIP
// PUT : /api/v1/callslip/:id
// ============================================

router.put("/:id", updateCallSlip);

// ============================================
// DELETE CALL SLIP
// DELETE : /api/v1/callslip/:id
// ============================================

router.delete("/:id", deleteCallSlip);

module.exports = router;