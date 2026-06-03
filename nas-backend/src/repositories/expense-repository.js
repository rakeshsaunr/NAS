// =====================================
// src/repositories/expense-repository.js
// =====================================

const Expense =
  require("../models/expense-model");

// CREATE EXPENSE

const createExpense =
  async (payload) => {

    return await Expense.create(
      payload
    );
  };

// GET ALL EXPENSES

const getAllExpenses =
  async () => {

    return await Expense.find()

      .populate(
        "expenseCategory"
      )

      .sort({
        createdAt: -1,
      });
  };

// GET SINGLE EXPENSE

const getExpenseById =
  async (id) => {

    return await Expense.findById(
      id
    ).populate(
      "expenseCategory"
    );
  };

// UPDATE EXPENSE

const updateExpenseById =
  async (
    id,
    payload
  ) => {

    return await Expense.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "expenseCategory"
    );
  };

// DELETE EXPENSE

const deleteExpenseById =
  async (id) => {

    return await Expense.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};