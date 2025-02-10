import express from "express";
import { getUsers, createUser, getAllProfiles, viewProfile, editProfile, changePassword } from "../controllers/userController";
import { loginUser } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";

const router = express.Router();

router.get("/users", protect, requireAdmin, getUsers);
router.post("/users", createUser);
router.post("/login", loginUser);
router.post("/users/signup", createUser);
router.get("/users/profiles", protect, requireAdmin, getAllProfiles); // Admin view all profiles
router.get('/users/profile', protect, viewProfile); // View own profile
router.put('/users/profile', protect, editProfile); // Edit own profile
router.put('/users/profile/change-password', protect, changePassword); // Change password

export default router;
