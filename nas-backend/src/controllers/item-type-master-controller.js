const {
  createItemTypeService,
  getAllItemTypesService,
  getItemTypeByIdService,
  updateItemTypeByIdService,
  deleteItemTypeByIdService,
} = require(
  "../services/item-type-master-service"
);

// CREATE
const createItemType =
  async (req, res) => {
    try {
      const response =
        await createItemTypeService(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Item Type created successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET ALL
const getAllItemTypes =
  async (req, res) => {
    try {
      const response =
        await getAllItemTypesService();

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// GET SINGLE
const getItemTypeById =
  async (req, res) => {
    try {
      const response =
        await getItemTypeByIdService(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE
const updateItemType =
  async (req, res) => {
    try {
      const response =
        await updateItemTypeByIdService(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Item Type updated successfully",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// DELETE
const deleteItemType =
  async (req, res) => {
    try {
      await deleteItemTypeByIdService(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Item Type deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createItemType,
  getAllItemTypes,
  getItemTypeById,
  updateItemType,
  deleteItemType,
};