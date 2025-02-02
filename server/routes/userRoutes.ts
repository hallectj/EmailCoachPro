import express from "express";
import { getUsers, createUser } from "../controllers/userController";
import { loginUser } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/users", protect, requireAdmin, getUsers);
router.post("/users", createUser);
router.post("/login", loginUser);

export default router;
