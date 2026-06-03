const TechnicianMaster = require(
  "../models/technician-master-model"
);

// CREATE
const createTechnicianMaster = async (
  payload
) => {
  return await TechnicianMaster.create(
    payload
  );
};

// GET ALL
const getAllTechnicianMasters =
  async () => {
    return await TechnicianMaster.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getTechnicianMasterById =
  async (id) => {
    return await TechnicianMaster.findById(
      id
    ).lean();
  };

// UPDATE
const updateTechnicianMasterById =
  async (id, payload) => {
    return await TechnicianMaster.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteTechnicianMasterById =
  async (id) => {
    return await TechnicianMaster.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createTechnicianMaster,
  getAllTechnicianMasters,
  getTechnicianMasterById,
  updateTechnicianMasterById,
  deleteTechnicianMasterById,
};