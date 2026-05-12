const express = require("express");

const router = express.Router();

const {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  editCategory,
  removeCategory,
} = require("../../services/category-service");


// ================= CREATE CATEGORY =================
router.post("/", async (req, res) => {
  try {
    const category = await createCategory(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


// ================= GET ALL CATEGORIES =================
router.get("/", async (req, res) => {
  try {
    const categories = await fetchCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ================= GET SINGLE CATEGORY =================
router.get("/:id", async (req, res) => {
  try {
    const category = await fetchCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ================= UPDATE CATEGORY =================
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await editCategory(
      req.params.id,
      req.body
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


// ================= DELETE CATEGORY =================
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await removeCategory(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;