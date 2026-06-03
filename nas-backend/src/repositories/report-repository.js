// ==============================================
// repositories/report-repository.js
// ==============================================

const Report = require("../models/report-model");

// CREATE REPORT
const createReportRepository = async (data) => {
  try {
    const report = await Report.create(data);
    return report;
  } catch (error) {
    throw error;
  }
};

// GET ALL REPORTS
const getAllReportsRepository = async () => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    return reports;
  } catch (error) {
    throw error;
  }
};

// GET SINGLE REPORT
const getReportByIdRepository = async (id) => {
  try {
    const report = await Report.findById(id);
    return report;
  } catch (error) {
    throw error;
  }
};

// UPDATE REPORT
const updateReportRepository = async (id, data) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(id, data, { new: true });
    return updatedReport;
  } catch (error) {
    throw error;
  }
};

// DELETE REPORT
const deleteReportRepository = async (id) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    return deletedReport;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReportRepository,
  getAllReportsRepository,
  getReportByIdRepository,
  updateReportRepository,
  deleteReportRepository,
};