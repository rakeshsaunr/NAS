const CallEntry = require("../models/call-entry-form-model");
const TechnicianMaster = require("../models/technician-master-model"); // You may need to create/adjust import path

// CallEntry Populate configuration (please keep in sync with the reference fields and their display fields in the model!)
const CALL_ENTRY_POPULATES = [
  { path: "customer", select: "customerName city phone1 email" },
  { path: "customerType", select: "customerTypeName customerTypeCode" },
  { path: "endUser", select: "endUserName endUserCode" },
  { path: "department", select: "departmentName departmentCode" },
  { path: "callType", select: "callType callTypeCode" },
  { path: "natureOfCall", select: "callNatureName callNatureCode" },
  { path: "instrument", select: "instrumentName instrumentCode" },
  { path: "problemDetails", select: "problemName problemCode" },
  { path: "callUrgency", select: "urgencyType" },

  // Assignment Module populates
  {
    path: "technicianAssigned",
    select: "technicianName technicianCode",
  },
  {
    path: "assignedBy",
    select: "employeeName employeeCode",
  },
  {
    path: "assignmentHistory.technicianAssigned",
    select: "technicianName technicianCode",
  },
  {
    path: "assignmentHistory.assignedBy",
    select: "employeeName employeeCode",
  },
];

// Helper: Apply all required populates to a mongoose query
const applyPopulates = (query) => {
  CALL_ENTRY_POPULATES.forEach((pop) => {
    query = query.populate(pop);
  });
  return query;
};

// CREATE (atomic, triggers pre-save logic in model, always populate)
const createCallEntryService = async (data) => {
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
const getAllCallEntriesService = async () => {
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
const getCallEntryByIdService = async (id) => {
  try {
    let query = CallEntry.findById(id);
    query = applyPopulates(query);
    return await query.exec();
  } catch (err) {
    throw err;
  }
};

// UPDATE by ID (return updated & fully populated)
const updateCallEntryByIdService = async (id, data) => {
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
const deleteCallEntryByIdService = async (id) => {
  try {
    return await CallEntry.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

// Assignment Module: Assign or Reassign Technician, Save Assignment History, etc.
const assignCallService = async (
  callId,
  assignmentData,
  loggedInEmployee
) => {
  try {
    // Validation
    if (!assignmentData.technicianAssigned) {
      throw new Error("Technician is required");
    }
    if (!assignmentData.callStatus) {
      throw new Error("Call Status is required");
    }
    if (!loggedInEmployee) {
      throw new Error("Employee not found");
    }

    // Fetch Call
    const call = await CallEntry.findById(callId);
    if (!call) {
      throw new Error("Call not found");
    }

    // Fetch Technician
    const technician = await TechnicianMaster.findById(
      assignmentData.technicianAssigned
    );
    if (!technician) {
      throw new Error("Technician not found");
    }

    // Always push assignment history for every action (assignment, reassignment, status change, or remark change)
    call.assignmentHistory.push({
      technicianAssigned: technician._id,
      technicianName: technician.technicianName,
      assignedBy: loggedInEmployee._id,
      assignedByName: loggedInEmployee.employeeName,
      assignRemark: assignmentData.assignRemark?.trim() || "",
      callStatus: assignmentData.callStatus,
      assignedAt: new Date(),
    });

    // Always update current assignment fields
    call.technicianAssigned = technician._id;
    call.technicianName = technician.technicianName;
    call.assignedBy = loggedInEmployee._id;
    call.assignedByName = loggedInEmployee.employeeName;
    call.assignedDateTime = new Date();
    call.assignRemark = assignmentData.assignRemark?.trim() || "";
    call.callStatus = assignmentData.callStatus;

    // Save and return populated
    await call.save();
    return await CallEntry.findById(call._id).populate(CALL_ENTRY_POPULATES);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCallEntryService,
  getAllCallEntriesService,
  getCallEntryByIdService,
  updateCallEntryByIdService,
  deleteCallEntryByIdService,
  assignCallService,
};