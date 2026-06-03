const CallEntry = require("../models/call-entry-form-model");

// CallEntry Populate configuration (keep in sync with schema and display fields)
// Assignment Module populates added
const CALL_ENTRY_POPULATES = [
  // Existing populates
  { path: "customer", select: "customerName city phone1 email" },
  { path: "customerType", select: "customerTypeName customerTypeCode" },
  { path: "endUser", select: "endUserName endUserCode" },
  { path: "department", select: "departmentName departmentCode" },
  { path: "callType", select: "callType callTypeCode" },
  { path: "natureOfCall", select: "callNatureName callNatureCode" },
  { path: "instrument", select: "instrumentName instrumentCode" },
  { path: "problemDetails", select: "problemName problemCode" },
  { path: "callUrgency", select: "urgencyType" },

  // Assignment Module populates (added as per instructions)
  {
    path: "technicianAssigned",
    select: "technicianName technicianCode"
  },
  {
    path: "assignedBy",
    select: "employeeName employeeCode"
  },
  {
    path: "assignmentHistory.technicianAssigned",
    select: "technicianName technicianCode"
  },
  {
    path: "assignmentHistory.assignedBy",
    select: "employeeName employeeCode"
  }
];

// Helper: apply populates to a mongoose query object
const applyPopulates = (query) => {
  CALL_ENTRY_POPULATES.forEach((pop) => {
    query = query.populate(pop);
  });
  return query;
};

// CREATE (atomic, triggers pre-save logic in model, always populate)
const createCallEntry = async (data) => {
  try {
    const entry = new CallEntry(data);
    await entry.save();
    // Fetch the saved doc with all populates
    return await CallEntry.findById(entry._id).populate(CALL_ENTRY_POPULATES);
  } catch (err) {
    throw err;
  }
};

// GET ALL (descending by createdAt, fully populated)
const getAllCallEntries = async () => {
  try {
    let query = CallEntry.find();
    query = applyPopulates(query);
    query = query.sort({ createdAt: -1 });
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// GET SINGLE by ID (fully populated)
const getCallEntryById = async (id) => {
  try {
    let query = CallEntry.findById(id);
    query = applyPopulates(query);
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// UPDATE by ID (return updated & fully populated)
const updateCallEntry = async (id, data) => {
  try {
    let query = CallEntry.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    query = applyPopulates(query);
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// DELETE by ID
const deleteCallEntry = async (id) => {
  try {
    return await CallEntry.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCallEntry,
  getAllCallEntries,
  getCallEntryById,
  updateCallEntry,
  deleteCallEntry,
};