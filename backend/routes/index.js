import express from "express";

import userRoutes from "./user/userRoutes.js";
import authRoutes from "./auth/authRoutes.js";

const router = express.Router();

// Mount routes
router.use("/users", userRoutes);
router.use("/auth",authRoutes)
export default router;
