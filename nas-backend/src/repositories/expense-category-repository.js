// src/repositories/expense-category-repository.js

const ExpenseCategory = require("../models/expense-category-model");

// CREATE an expense category
async function createExpenseCategory(data) {
  return ExpenseCategory.create(data);
}

// GET all expense categories, sorted by creation date (latest first)
async function getAllExpenseCategories() {
  return ExpenseCategory.find().sort({ createdAt: -1 });
}

// GET a single expense category by its ID
async function getExpenseCategoryById(id) {
  return ExpenseCategory.findById(id);
}

// UPDATE an expense category by its ID
async function updateExpenseCategoryById(id, data) {
  return ExpenseCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

// DELETE an expense category by its ID
async function deleteExpenseCategoryById(id) {
  return ExpenseCategory.findByIdAndDelete(id);
}

module.exports = {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategoryById,
  deleteExpenseCategoryById,
};