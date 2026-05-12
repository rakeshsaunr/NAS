const express = require("express");

const router = express.Router();

const {
  createServiceCall,
  getAllServiceCalls,
  getServiceCallById,
  updateServiceCall,
  deleteServiceCall,
} = require(
  "../../controllers/servicecall-controller"
);

/*
|--------------------------------------------------------------------------
| SERVICE CALL ROUTES
|--------------------------------------------------------------------------
| Base URL : /api/v1/servicecall
|--------------------------------------------------------------------------
*/

// ===========================================
// CREATE SERVICE CALL
// POST : /api/v1/servicecall
// ===========================================

router.post(
  "/",
  createServiceCall
);

// ===========================================
// GET ALL SERVICE CALLS
// GET : /api/v1/servicecall
// ===========================================

router.get(
  "/",
  getAllServiceCalls
);

// ===========================================
// GET SINGLE SERVICE CALL
// GET : /api/v1/servicecall/:id
// ===========================================

router.get(
  "/:id",
  getServiceCallById
);

// ===========================================
// UPDATE SERVICE CALL
// PUT : /api/v1/servicecall/:id
// ===========================================

router.put(
  "/:id",
  updateServiceCall
);

// ===========================================
// DELETE SERVICE CALL
// DELETE : /api/v1/servicecall/:id
// ===========================================

router.delete(
  "/:id",
  deleteServiceCall
);

module.exports = router;