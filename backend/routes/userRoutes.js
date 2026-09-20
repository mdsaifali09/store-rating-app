import express from "express";
import {
  getMyProfile,
  changePassword
} from "../controllers/userController.js";


import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.get("/profile", authMiddleware, getMyProfile);

export default router;