const {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../repositories/category-repository");

// ================= CREATE CATEGORY =================
const createCategory = async (data) => {
  try {
    const { categoryName, description } = data;

    if (!categoryName || typeof categoryName !== "string" || !categoryName.trim()) {
      throw new Error("Category name is required");
    }

    return await addCategory({
      categoryName: categoryName.trim(),
      description,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET ALL CATEGORIES =================
const fetchCategories = async (filter = {}) => {
  try {
    return await getCategories(filter);
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET CATEGORY BY ID =================
const fetchCategoryById = async (id) => {
  try {
    const category = await getCategoryById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= UPDATE CATEGORY =================
const editCategory = async (id, updates = {}) => {
  try {
    // Normalize categoryName for update if present, following model rules
    if (updates.categoryName && typeof updates.categoryName === "string") {
      updates.categoryName = updates.categoryName.trim();
    }

    const updatedCategory = await updateCategory(id, updates);

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= DELETE CATEGORY =================
const removeCategory = async (id) => {
  try {
    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) {
      throw new Error("Category not found");
    }

    return deletedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  editCategory,
  removeCategory,
};