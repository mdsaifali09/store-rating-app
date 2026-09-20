import express from "express";

import {
  getStores,
  createStore,
  getStoresWithRatings,
  getStoreById
} from "../controllers/storeController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All stores
router.get("/", authMiddleware, getStores);

// Stores with average + user's rating
router.get(
  "/ratings",
  authMiddleware,
  getStoresWithRatings
);

router.get("/:id", authMiddleware, getStoreById);
// Create store
router.post("/", authMiddleware, createStore);

export default router;