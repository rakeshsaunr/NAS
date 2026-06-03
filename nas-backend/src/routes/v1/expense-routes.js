// =====================================
// src/routes/v1/expense-routes.js
// =====================================

const express =
  require("express");

const router =
  express.Router();

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
} = require(
  "../../controllers/expense-controller"
);

// CREATE
router.post(
  "/",
  createExpense
);

// GET ALL
router.get(
  "/",
  getAllExpenses
);

// GET SINGLE
router.get(
  "/:id",
  getExpenseById
);

// UPDATE
router.put(
  "/:id",
  updateExpenseById
);

// DELETE
router.delete(
  "/:id",
  deleteExpenseById
);

module.exports = router;