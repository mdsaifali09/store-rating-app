import express from "express";

import {
  addOrUpdateRating,
  getMyRatings
} from "../controllers/ratingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addOrUpdateRating);
router.get("/my", authMiddleware, getMyRatings);

export default router;