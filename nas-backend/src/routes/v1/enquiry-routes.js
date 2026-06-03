// routes/v1/enquiry-routes.js

const express = require("express");

const multer = require("multer");

const {
  createEnquiryController,
  getAllEnquiriesController,
  getSingleEnquiryController,
  updateEnquiryStatusController,
  deleteEnquiryController,
} = require("../../controllers/enquiry-controller");

const router = express.Router();

/* =========================
   Multer Config
========================= */

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

/* =========================
   Create Enquiry
========================= */

router.post(
  "/create",
  upload.array("files"),
  createEnquiryController
);

/* =========================
   Get All Enquiries
========================= */

router.get(
  "/all",
  getAllEnquiriesController
);

/* =========================
   Get Single Enquiry
========================= */

router.get(
  "/:id",
  getSingleEnquiryController
);

/* =========================
   Update Status
========================= */

router.put(
  "/update-status/:id",
  updateEnquiryStatusController
);

/* =========================
   Delete Enquiry
========================= */

router.delete(
  "/delete/:id",
  deleteEnquiryController
);

module.exports = router;