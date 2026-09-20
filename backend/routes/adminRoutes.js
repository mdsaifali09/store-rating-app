import express from "express";

import {
  getDashboardStats,
  getUsers,
  getUserById,
  createUser,
  getStores,
  createStore
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("admin"));

router.get("/dashboard", getDashboardStats);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.get("/stores", getStores);

router.post("/stores", createStore);

export default router;