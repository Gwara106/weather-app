import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database/index.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event/eventRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import User from "./model/user/User.js";
import Event from "./model/event/Event.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS and body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✓ Database connection successful");

    // Sync models with database
    await sequelize.sync();
    console.log("✓ Database models synchronized");

    // Create test user if it doesn't exist
    const testUser = await User.findOne({ where: { email: 'luckypjpt@gmail.com' } });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        name: 'Lucky',
        email: 'luckypjpt@gmail.com',
        password: hashedPassword
      });
      console.log("✓ Test user created");
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`✓ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Server initialization failed:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();
