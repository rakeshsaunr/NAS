const express = require("express");

const router = express.Router();

const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} = require(
  "../../controllers/problem-controller"
);

// CREATE
router.post(
  "/",
  createProblem
);

// GET ALL
router.get(
  "/",
  getAllProblems
);

// GET SINGLE
router.get(
  "/:id",
  getProblemById
);

// UPDATE
router.put(
  "/:id",
  updateProblem
);

// DELETE
router.delete(
  "/:id",
  deleteProblem
);

module.exports = router;