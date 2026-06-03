const EndUserMaster = require("../models/end-user-master-model");

// =====================================
// CREATE END USER
// =====================================

const createEndUser = async (data) => {
  return await EndUserMaster.create(data);
};

// =====================================
// GET ALL END USERS
// =====================================

const getAllEndUsers = async () => {
  return await EndUserMaster.find()
    .populate("department", "name")
    .populate("designation", "designationName")
    .sort({ createdAt: -1 });
};

// =====================================
// GET SINGLE END USER
// =====================================

const getEndUserById = async (id) => {
  return await EndUserMaster.findById(id)
    .populate("department", "name")
    .populate("designation", "designationName");
};

// =====================================
// UPDATE END USER
// =====================================

const updateEndUser = async (id, data) => {
  return await EndUserMaster.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("department", "name")
    .populate("designation", "designationName");
};

// =====================================
// DELETE END USER
// =====================================

const deleteEndUser = async (id) => {
  return await EndUserMaster.findByIdAndDelete(id);
};

// =====================================
// SEARCH END USERS
// =====================================

const searchEndUsers = async (search) => {
  return await EndUserMaster.find({
    $or: [
      {
        endUserName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        endUserCode: {
          $regex: search,
          $options: "i",
        },
      },
      {
        mobileNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        emailAddress: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  })
    .populate("department", "name")
    .populate("designation", "designationName")
    .sort({ createdAt: -1 });
};

module.exports = {
  createEndUser,
  getAllEndUsers,
  getEndUserById,
  updateEndUser,
  deleteEndUser,
  searchEndUsers,
};