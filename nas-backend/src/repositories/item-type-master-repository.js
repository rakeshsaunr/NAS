const ItemType = require(
  "../models/item-type-master-model"
);

// CREATE
const createItemType = async (
  payload
) => {
  return await ItemType.create(
    payload
  );
};

// GET ALL
const getAllItemTypes =
  async () => {
    return await ItemType.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getItemTypeById =
  async (id) => {
    return await ItemType.findById(
      id
    ).lean();
  };

// UPDATE
const updateItemTypeById =
  async (id, payload) => {
    return await ItemType.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteItemTypeById =
  async (id) => {
    return await ItemType.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createItemType,
  getAllItemTypes,
  getItemTypeById,
  updateItemTypeById,
  deleteItemTypeById,
};