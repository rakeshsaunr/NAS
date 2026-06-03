// src/services/expense-category-service.js

const expenseCategoryRepository = require(
  "../repositories/expense-category-repository"
);

class ExpenseCategoryService {

  // =====================================
  // CREATE
  // =====================================

  async createExpenseCategory(data) {

    // VALIDATION
    if (!data.categoryName) {

      throw new Error(
        "Expense category name is required"
      );
    }

    return await expenseCategoryRepository.createExpenseCategory(
      data
    );
  }

  // =====================================
  // GET ALL
  // =====================================

  async getAllExpenseCategories() {

    return await expenseCategoryRepository.getAllExpenseCategories();
  }

  // =====================================
  // GET BY ID
  // =====================================

  async getExpenseCategoryById(id) {

    const category =
      await expenseCategoryRepository.getExpenseCategoryById(
        id
      );

    if (!category) {

      throw new Error(
        "Expense category not found"
      );
    }

    return category;
  }

  // =====================================
  // UPDATE
  // =====================================

  async updateExpenseCategoryById(
    id,
    data
  ) {

    const category =
      await expenseCategoryRepository.updateExpenseCategoryById(
        id,
        data
      );

    if (!category) {

      throw new Error(
        "Expense category not found"
      );
    }

    return category;
  }

  // =====================================
  // DELETE
  // =====================================

  async deleteExpenseCategoryById(
    id
  ) {

    const category =
      await expenseCategoryRepository.deleteExpenseCategoryById(
        id
      );

    if (!category) {

      throw new Error(
        "Expense category not found"
      );
    }

    return category;
  }
}

module.exports =
  new ExpenseCategoryService();