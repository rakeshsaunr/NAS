// src/routes/v1/expense-category-routes.js

const express = require("express");

const router = express.Router();

const {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategoryById,
  deleteExpenseCategoryById,
} = require(
  "../../controllers/expense-category-controller"
);

// =====================================
// CREATE
// POST /api/v1/expense-category
// =====================================

router.post(
  "/",
  createExpenseCategory
);

// =====================================
// GET ALL
// GET /api/v1/expense-category
// =====================================

router.get(
  "/",
  getAllExpenseCategories
);

// =====================================
// GET SINGLE
// GET /api/v1/expense-category/:id
// =====================================

router.get(
  "/:id",
  getExpenseCategoryById
);

// =====================================
// UPDATE
// PUT /api/v1/expense-category/:id
// =====================================

router.put(
  "/:id",
  updateExpenseCategoryById
);

// =====================================
// DELETE
// DELETE /api/v1/expense-category/:id
// =====================================

router.delete(
  "/:id",
  deleteExpenseCategoryById
);

module.exports = router;