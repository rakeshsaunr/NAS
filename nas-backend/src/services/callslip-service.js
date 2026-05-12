const repository = require(
  "../repositories/callslip-repository"
);

// ================= CREATE CALL SLIP =================

const create = async (data) => {
  try {
    if (!data.customerName) {
      throw new Error(
        "Customer Name is Required"
      );
    }

    if (!data.department) {
      throw new Error(
        "Department is Required"
      );
    }

    if (!data.category) {
      throw new Error(
        "Category is Required"
      );
    }

    // ================= AUTO CALL NUMBER =================

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    data.callNumber = `CALL-${randomNumber}`;

    // ================= CREATE DATA =================

    const callSlip =
      await repository.create(data);

    return callSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET ALL CALL SLIPS =================

const getAll = async () => {
  try {
    const callSlips =
      await repository.getAll();

    return callSlips;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= GET SINGLE CALL SLIP =================

const getById = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const callSlip =
      await repository.getById(id);

    if (!callSlip) {
      throw new Error(
        "Call Slip Not Found"
      );
    }

    return callSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= UPDATE CALL SLIP =================

const update = async (id, data) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const updatedCallSlip =
      await repository.update(id, data);

    if (!updatedCallSlip) {
      throw new Error(
        "Call Slip Not Found"
      );
    }

    return updatedCallSlip;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================= DELETE CALL SLIP =================

const remove = async (id) => {
  try {
    if (!id) {
      throw new Error("ID is Required");
    }

    const deletedCallSlip =
      await repository.remove(id);

    if (!deletedCallSlip) {
      throw new Error(
        "Call Slip Not Found"
      );
    }

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