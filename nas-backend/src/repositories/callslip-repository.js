const CallSlip = require("../models/callslip-model");

// ================= CREATE CALL SLIP =================

const create = async (data) => {
  try {
    const callSlip = await CallSlip.create(data);

    return callSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET ALL CALL SLIPS =================

const getAll = async () => {
  try {
    const callSlips = await CallSlip.find({
      isActive: true,
    })
      .populate("department", "name")
      .populate("category", "name")
      .populate("productType", "name")
      .sort({ createdAt: -1 });

    return callSlips;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET SINGLE CALL SLIP =================

const getById = async (id) => {
  try {
    const callSlip = await CallSlip.findById(id)
      .populate("department", "name")
      .populate("category", "name")
      .populate("productType", "name");

    return callSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= UPDATE CALL SLIP =================

const update = async (id, data) => {
  try {
    const updatedCallSlip =
      await CallSlip.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("department", "name")
        .populate("category", "name")
        .populate("productType", "name");

    return updatedCallSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= SOFT DELETE CALL SLIP =================

const remove = async (id) => {
  try {
    const deletedCallSlip =
      await CallSlip.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    return deletedCallSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};