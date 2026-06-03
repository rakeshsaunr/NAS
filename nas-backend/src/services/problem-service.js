const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblemById,
  deleteProblemById,
} = require(
  "../repositories/problem-repository"
);

// CREATE
const createProblemService =
  async (payload) => {
    return await createProblem(
      payload
    );
  };

// GET ALL
const getAllProblemsService =
  async () => {
    return await getAllProblems();
  };

// GET SINGLE
const getProblemByIdService =
  async (id) => {
    return await getProblemById(
      id
    );
  };

// UPDATE
const updateProblemByIdService =
  async (id, payload) => {
    return await updateProblemById(
      id,
      payload
    );
  };

// DELETE
const deleteProblemByIdService =
  async (id) => {
    return await deleteProblemById(
      id
    );
  };

module.exports = {
  createProblemService,
  getAllProblemsService,
  getProblemByIdService,
  updateProblemByIdService,
  deleteProblemByIdService,
};