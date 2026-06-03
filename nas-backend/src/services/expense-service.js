// =====================================
// src/services/expense-service.js
// =====================================

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
} = require(
  "../repositories/expense-repository"
);

// CREATE

const createExpenseService =
  async (payload) => {

    const {
      expenseCategory,
      amount,
      paymentMode,
      description,
      remark,
      status,
    } = payload;

    if (
      !expenseCategory
    ) {

      throw new Error(
        "Expense category is required"
      );
    }

    if (!amount) {

      throw new Error(
        "Amount is required"
      );
    }

    const cleanPayload = {

      expenseCategory,

      amount,

      paymentMode:
        paymentMode || "Cash",

      description:
        description || "",

      remark:
        remark || "",

      status:
        status || "Approved",
    };

    return await createExpense(
      cleanPayload
    );
  };

// GET ALL

const getAllExpensesService =
  async () => {

    return await getAllExpenses();
  };

// GET SINGLE

const getExpenseByIdService =
  async (id) => {

    return await getExpenseById(
      id
    );
  };

// UPDATE

const updateExpenseByIdService =
  async (
    id,
    payload
  ) => {

    return await updateExpenseById(
      id,
      payload
    );
  };

// DELETE

const deleteExpenseByIdService =
  async (id) => {

    return await deleteExpenseById(
      id
    );
  };

module.exports = {
  createExpenseService,
  getAllExpensesService,
  getExpenseByIdService,
  updateExpenseByIdService,
  deleteExpenseByIdService,
};