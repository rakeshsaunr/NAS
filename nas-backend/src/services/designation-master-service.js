const {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignationById,
  deleteDesignationById,
} = require(
  "../repositories/designation-master-repository"
);

// CREATE
const createDesignationService =
  async (payload) => {
    return await createDesignation(
      payload
    );
  };

// GET ALL
const getAllDesignationsService =
  async () => {
    return await getAllDesignations();
  };

// GET SINGLE
const getDesignationByIdService =
  async (id) => {
    return await getDesignationById(
      id
    );
  };

// UPDATE
const updateDesignationByIdService =
  async (id, payload) => {
    return await updateDesignationById(
      id,
      payload
    );
  };

// DELETE
const deleteDesignationByIdService =
  async (id) => {
    return await deleteDesignationById(
      id
    );
  };

module.exports = {
  createDesignationService,
  getAllDesignationsService,
  getDesignationByIdService,
  updateDesignationByIdService,
  deleteDesignationByIdService,
};