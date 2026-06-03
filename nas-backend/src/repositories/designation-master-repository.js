const DesignationMaster = require(
  "../models/designation-master-model"
);

// CREATE
const createDesignation = async (
  payload
) => {
  return await DesignationMaster.create(
    payload
  );
};

// GET ALL
const getAllDesignations =
  async () => {
    return await DesignationMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getDesignationById =
  async (id) => {
    return await DesignationMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateDesignationById =
  async (id, payload) => {
    return await DesignationMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteDesignationById =
  async (id) => {
    return await DesignationMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignationById,
  deleteDesignationById,
};