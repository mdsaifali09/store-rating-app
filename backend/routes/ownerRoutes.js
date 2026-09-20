import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getOwnerDashboard,
  getOwnerRatings
} from "../controllers/ownerController.js";

const router = express.Router();

router.use(
  authMiddleware,
  roleMiddleware("owner")
);

router.get(
  "/dashboard",
  getOwnerDashboard
);

router.get(
  "/ratings",
  getOwnerRatings
);

export default router;