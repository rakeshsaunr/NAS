const {
  createSupportPeriodService,
  getAllSupportPeriodsService,
  getSupportPeriodByIdService,
  updateSupportPeriodByIdService,
  deleteSupportPeriodByIdService,
} = require(
  "../services/support-period-master-service"
);

// CREATE
const createSupportPeriod =
  async (req, res) => {
    try {
      const response =
        await createSupportPeriodService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Support Period created successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL
const getAllSupportPeriods =
  async (req, res) => {
    try {
      const response =
        await getAllSupportPeriodsService();

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET SINGLE
const getSupportPeriodById =
  async (req, res) => {
    try {
      const response =
        await getSupportPeriodByIdService(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE
const updateSupportPeriod =
  async (req, res) => {
    try {
      const response =
        await updateSupportPeriodByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Support Period updated successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE
const deleteSupportPeriod =
  async (req, res) => {
    try {
      await deleteSupportPeriodByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Support Period deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createSupportPeriod,
  getAllSupportPeriods,
  getSupportPeriodById,
  updateSupportPeriod,
  deleteSupportPeriod,
};