import express from "express";
import { authController } from "../../controller/auth/authController.js";

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log(`Auth Route accessed: ${req.method} ${req.path}`);
  console.log('Auth route body:', req.body);
  next();
});

// Log available routes
console.log('Registering auth routes:');
console.log('- GET /init');
console.log('- POST /login');

router.get("/init", authController.init);
router.post("/login", authController.login);

export default router;
