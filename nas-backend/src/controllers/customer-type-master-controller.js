const {
  createCustomerTypeMasterService,
  getAllCustomerTypeMastersService,
  getCustomerTypeMasterByIdService,
  updateCustomerTypeMasterByIdService,
  deleteCustomerTypeMasterByIdService,
} = require("../services/customer-type-master-service");

// CREATE
const createCustomerTypeMaster = async (req, res) => {
  try {
    const response = await createCustomerTypeMasterService(req.body);

    return res.status(201).json({
      success: true,
      message: "Customer Type created successfully",
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
const getAllCustomerTypeMasters = async (req, res) => {
  try {
    const response = await getAllCustomerTypeMastersService();

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
const getCustomerTypeMasterById = async (req, res) => {
  try {
    const response = await getCustomerTypeMasterByIdService(req.params.id);

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
const updateCustomerTypeMaster = async (req, res) => {
  try {
    const response = await updateCustomerTypeMasterByIdService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Customer Type updated successfully",
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
const deleteCustomerTypeMaster = async (req, res) => {
  try {
    await deleteCustomerTypeMasterByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Customer Type deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCustomerTypeMaster,
  getAllCustomerTypeMasters,
  getCustomerTypeMasterById,
  updateCustomerTypeMaster,
  deleteCustomerTypeMaster,
};