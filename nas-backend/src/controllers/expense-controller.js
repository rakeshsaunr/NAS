// =====================================
// src/controllers/expense-controller.js
// =====================================

const {
  createExpenseService,
  getAllExpensesService,
  getExpenseByIdService,
  updateExpenseByIdService,
  deleteExpenseByIdService,
} = require(
  "../services/expense-service"
);

// CREATE

const createExpense =
  async (req, res) => {

    try {

      const data =
        await createExpenseService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Expense created successfully",
        data,
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET ALL

const getAllExpenses =
  async (req, res) => {

    try {

      const data =
        await getAllExpensesService();

      return res.status(200).json({
        success: true,
        total:
          data.length,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET SINGLE

const getExpenseById =
  async (req, res) => {

    try {

      const data =
        await getExpenseByIdService(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// UPDATE

const updateExpenseById =
  async (req, res) => {

    try {

      const data =
        await updateExpenseByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Expense updated successfully",
        data,
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// DELETE

const deleteExpenseById =
  async (req, res) => {

    try {

      await deleteExpenseByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Expense deleted successfully",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};