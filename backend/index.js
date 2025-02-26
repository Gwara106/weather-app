import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/index.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./models/index.js";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// CORS and body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to database
    await db();

    // Create test user if it doesn't exist
    const testUser = await User.findOne({ where: { email: 'luckypjpt@gmail.com' } });
    if (!testUser) {
      await User.create({
        email: 'luckypjpt@gmail.com',
        password: bcrypt.hashSync('abcd1234', 10),
        name: 'Lucky'
      });
      console.log('Test user created');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
