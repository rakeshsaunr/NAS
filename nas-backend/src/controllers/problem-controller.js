const {
  createProblemService,
  getAllProblemsService,
  getProblemByIdService,
  updateProblemByIdService,
  deleteProblemByIdService,
} = require(
  "../services/problem-service"
);

// CREATE
const createProblem =
  async (req, res) => {
    try {
      const response =
        await createProblemService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Problem created successfully",
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
const getAllProblems =
  async (req, res) => {
    try {
      const response =
        await getAllProblemsService();

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
const getProblemById =
  async (req, res) => {
    try {
      const response =
        await getProblemByIdService(
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
const updateProblem =
  async (req, res) => {
    try {
      const response =
        await updateProblemByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Problem updated successfully",
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
const deleteProblem =
  async (req, res) => {
    try {
      await deleteProblemByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Problem deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};