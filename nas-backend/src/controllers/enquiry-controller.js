// controllers/enquiry-controller.js

import {
  createEnquiryService,
  getAllEnquiriesService,
  getSingleEnquiryService,
  updateEnquiryStatusService,
  deleteEnquiryService,
} from "../services/enquiry-service.js";

/* =========================
   Create Enquiry
========================= */
export const createEnquiryController =
  async (req, res) => {
    try {

      console.log(
        "BODY =>",
        req.body
      );

      console.log(
        "FILES =>",
        req.files
      );

      /* Safe Parse Location */
      if (
        req.body.location &&
        typeof req.body.location ===
          "string"
      ) {
        try {

          req.body.location =
            JSON.parse(
              req.body.location
            );

        } catch (parseError) {

          console.log(
            "Location Parse Error =>",
            parseError
          );

          req.body.location = {};
        }
      }

      const enquiryData = {
        ...req.body,

        ipAddress:
          req.headers[
            "x-forwarded-for"
          ] ||
          req.socket.remoteAddress,

        userAgent:
          req.headers[
            "user-agent"
          ],
      };

      /* Handle Files */
      if (
        req.files &&
        req.files.length > 0
      ) {
        enquiryData.files =
          req.files.map((file) => ({
            url:
              file.path ||
              file.originalname,

            public_id:
              file.filename ||
              "",

            fileType:
              file.mimetype,
          }));
      }

      /* Google Map Link */
      if (
        enquiryData.location &&
        enquiryData.location
          .latitude &&
        enquiryData.location
          .longitude
      ) {
        enquiryData.location.googleMapLink =
          `https://www.google.com/maps?q=${enquiryData.location.latitude},${enquiryData.location.longitude}`;
      }

      const enquiry =
        await createEnquiryService(
          enquiryData
        );

      return res.status(201).json({
        success: true,

        message:
          "Enquiry submitted successfully",

        data: enquiry,
      });

    } catch (error) {

      console.log(
        "CREATE ENQUIRY ERROR =>",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "An error occurred while creating enquiry",
      });
    }
  };

/* =========================
   Get All Enquiries
========================= */
export const getAllEnquiriesController =
  async (req, res) => {
    try {

      const enquiries =
        await getAllEnquiriesService();

      return res.status(200).json({
        success: true,

        count: Array.isArray(
          enquiries
        )
          ? enquiries.length
          : 0,

        data: enquiries,
      });

    } catch (error) {

      console.log(
        "GET ALL ERROR =>",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "An error occurred while fetching enquiries",
      });
    }
  };

/* =========================
   Get Single Enquiry
========================= */
export const getSingleEnquiryController =
  async (req, res) => {
    try {

      const enquiry =
        await getSingleEnquiryService(
          req.params.id
        );

      if (!enquiry) {
        return res.status(404).json({
          success: false,

          message:
            "Enquiry not found",
        });
      }

      return res.status(200).json({
        success: true,

        data: enquiry,
      });

    } catch (error) {

      console.log(
        "GET SINGLE ERROR =>",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "An error occurred while fetching the enquiry",
      });
    }
  };

/* =========================
   Update Status
========================= */
export const updateEnquiryStatusController =
  async (req, res) => {
    try {

      const enquiry =
        await updateEnquiryStatusService(
          req.params.id,
          req.body.status
        );

      if (!enquiry) {
        return res.status(404).json({
          success: false,

          message:
            "Enquiry not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Status updated successfully",

        data: enquiry,
      });

    } catch (error) {

      console.log(
        "UPDATE STATUS ERROR =>",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "An error occurred while updating enquiry status",
      });
    }
  };

/* =========================
   Delete Enquiry
========================= */
export const deleteEnquiryController =
  async (req, res) => {
    try {

      const enquiry =
        await deleteEnquiryService(
          req.params.id
        );

      if (!enquiry) {
        return res.status(404).json({
          success: false,

          message:
            "Enquiry not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Enquiry deleted successfully",
      });

    } catch (error) {

      console.log(
        "DELETE ERROR =>",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "An error occurred while deleting the enquiry",
      });
    }
  };