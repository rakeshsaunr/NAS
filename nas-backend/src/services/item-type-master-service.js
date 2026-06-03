const {
  createItemType,
  getAllItemTypes,
  getItemTypeById,
  updateItemTypeById,
  deleteItemTypeById,
} = require(
  "../repositories/item-type-master-repository"
);

// CREATE
const createItemTypeService =
  async (payload) => {
    return await createItemType(
      payload
    );
  };

// GET ALL
const getAllItemTypesService =
  async () => {
    return await getAllItemTypes();
  };

// GET SINGLE
const getItemTypeByIdService =
  async (id) => {
    return await getItemTypeById(
      id
    );
  };

// UPDATE
const updateItemTypeByIdService =
  async (id, payload) => {
    return await updateItemTypeById(
      id,
      payload
    );
  };

// DELETE
const deleteItemTypeByIdService =
  async (id) => {
    return await deleteItemTypeById(
      id
    );
  };

module.exports = {
  createItemTypeService,
  getAllItemTypesService,
  getItemTypeByIdService,
  updateItemTypeByIdService,
  deleteItemTypeByIdService,
};