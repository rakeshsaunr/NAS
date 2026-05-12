const Category = require("../models/category-model");

const addCategory = async ({ categoryName, description }) => {
  // Validation: categoryName is required
  if (!categoryName || typeof categoryName !== 'string' || !categoryName.trim()) {
    throw new Error("Category name is required");
  }

  // Check if category exists
  const existing = await Category.findOne({ categoryName: categoryName.trim() });
  if (existing) {
    throw new Error("Category already exists");
  }

  // Create new category
  const category = await Category.create({
    categoryName: categoryName.trim(),
    description,
  });
  return category;
};

const getCategories = async (filter = {}) => {
  // Returns all active categories by default
  return await Category.find(filter);
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const updateCategory = async (id, updates = {}) => {
  // Optionally check if updating to existing name
  if (updates.categoryName) {
    const existing = await Category.findOne({
      categoryName: updates.categoryName.trim(),
      _id: { $ne: id }
    });
    if (existing) {
      throw new Error("Another category with this name already exists");
    }
    updates.categoryName = updates.categoryName.trim();
  }
  return await Category.findByIdAndUpdate(id, updates, { new: true });
};

const deleteCategory = async (id) => {
  // Soft delete: set isActive to false
  return await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};