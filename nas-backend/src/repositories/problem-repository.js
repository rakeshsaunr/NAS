const Problem = require(
  "../models/problem-model"
);

// CREATE
const createProblem = async (
  payload
) => {
  return await Problem.create(
    payload
  );
};

// GET ALL
const getAllProblems =
  async () => {
    return await Problem.find({})
      .sort({ createdAt: -1 })
      .lean();
  };

// GET SINGLE
const getProblemById =
  async (id) => {
    return await Problem.findById(
      id
    ).lean();
  };

// UPDATE
const updateProblemById =
  async (id, payload) => {
    return await Problem.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).lean();
  };

// DELETE
const deleteProblemById =
  async (id) => {
    return await Problem.findByIdAndDelete(
      id
    );
  };

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemById,
  deleteProblemById,
};