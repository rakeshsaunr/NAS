const ServiceCall = require(
  "../models/servicecall-model"
);

// ===========================================
// CREATE SERVICE CALL
// ===========================================

const create = async (data) => {
  try {
    // ================= VALIDATION =================

    if (!data.customerName) {
      throw new Error(
        "Customer Name is Required"
      );
    }

    if (!data.companyName) {
      throw new Error(
        "Company Name is Required"
      );
    }

    // ================= AUTO CALL SHEET NUMBER =================

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    data.callSheetNumber = `SC-${randomNumber}`;

    // ================= CREATE =================

    const serviceCall =
      await ServiceCall.create(data);

    return serviceCall;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// GET ALL SERVICE CALLS
// ===========================================

const getAll = async () => {
  try {
    const serviceCalls =
      await ServiceCall.find({
        isActive: true,
      })
        .populate(
          "department",
          "name"
        )
        .populate(
          "category",
          "name"
        )
        .populate(
          "productType",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    return serviceCalls;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// GET SINGLE SERVICE CALL
// ===========================================

const getById = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const serviceCall =
      await ServiceCall.findById(id)
        .populate(
          "department",
          "name"
        )
        .populate(
          "category",
          "name"
        )
        .populate(
          "productType",
          "name"
        );

    if (!serviceCall) {
      throw new Error(
        "Service Call Not Found"
      );
    }

    return serviceCall;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// UPDATE SERVICE CALL
// ===========================================

const update = async (
  id,
  data
) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const updatedServiceCall =
      await ServiceCall.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "department",
          "name"
        )
        .populate(
          "category",
          "name"
        )
        .populate(
          "productType",
          "name"
        );

    if (!updatedServiceCall) {
      throw new Error(
        "Service Call Not Found"
      );
    }

    return updatedServiceCall;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ===========================================
// SOFT DELETE SERVICE CALL
// ===========================================

const remove = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const deletedServiceCall =
      await ServiceCall.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        {
          new: true,
        }
      );

    if (!deletedServiceCall) {
      throw new Error(
        "Service Call Not Found"
      );
    }

    return deletedServiceCall;
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