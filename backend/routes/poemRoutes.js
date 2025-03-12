import express from "express";
const router = express.Router();

import {
  getPoems,
  getPoemById,
  createPoem,
  updatePoem,
  deletePoem,
  createPoemReview,
  getTopPoems,
} from "../controllers/poemController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// Routes for poems
router.route("/").get(getPoems).post(protect, admin, createPoem);
router.route("/:id/reviews").post(protect, checkObjectId, createPoemReview);

// Get top-rated poems
router.get("/top", getTopPoems);

// Routes for individual poem CRUD
router
  .route("/:id")
  .get(checkObjectId, getPoemById) // Get poem by ID
  .put(protect, admin, checkObjectId, updatePoem) // Update poem
  .delete(protect, admin, checkObjectId, deletePoem); // Delete poem

export default router;
