// =====================================
// src/controllers/expense-category-controller.js
// =====================================

const expenseCategoryService = require(
  "../services/expense-category-service"
);

// ================= CREATE =================

const createExpenseCategory = async (
  req,
  res
) => {
  try {

    const {
      categoryName,
      description,
      isActive,
    } = req.body;

    // VALIDATION
    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message:
          "Expense category name is required",
      });
    }

    const data =
      await expenseCategoryService.createExpenseCategory(
        {
          categoryName,
          description,
          isActive,
        }
      );

    res.status(201).json({
      success: true,
      message:
        "Expense category created successfully",
      data,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to create expense category",
    });
  }
};

// ================= GET ALL =================

const getAllExpenseCategories =
  async (req, res) => {
    try {

      const data =
        await expenseCategoryService.getAllExpenseCategories();

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch expense categories",
      });
    }
  };

// ================= GET BY ID =================

const getExpenseCategoryById =
  async (req, res) => {
    try {

      const data =
        await expenseCategoryService.getExpenseCategoryById(
          req.params.id
        );

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Expense category not found",
        });
      }

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {

      res.status(404).json({
        success: false,
        message:
          error.message ||
          "Expense category not found",
      });
    }
  };

// ================= UPDATE =================

const updateExpenseCategoryById =
  async (req, res) => {
    try {

      const data =
        await expenseCategoryService.updateExpenseCategoryById(
          req.params.id,
          req.body
        );

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Expense category not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Expense category updated successfully",
        data,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to update expense category",
      });
    }
  };

// ================= DELETE =================

const deleteExpenseCategoryById =
  async (req, res) => {
    try {

      const data =
        await expenseCategoryService.deleteExpenseCategoryById(
          req.params.id
        );

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Expense category not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Expense category deleted successfully",
      });

    } catch (error) {

      res.status(404).json({
        success: false,
        message:
          error.message ||
          "Failed to delete expense category",
      });
    }
  };

module.exports = {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategoryById,
  deleteExpenseCategoryById,
};