import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

console.log('Attempting to connect to database with following config:');
console.log('Database:', DB_NAME);
console.log('User:', DB_USER);
console.log('Host:', DB_HOST);

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const db = async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Force sync all models - this will drop all tables and recreate them
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    // Create a test user
    const { User } = await import('../model/index.js');
    const testUser = await User.findOne({ where: { email: 'test@example.com' }});
    if (!testUser) {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10)
      });
      console.log('Test user created successfully');
    }

    // Create your user account
    const yourUser = await User.findOne({ where: { email: 'luckypjpt@gmail.com' }});
    if (!yourUser) {
      await User.create({
        name: 'Lucky',
        email: 'luckypjpt@gmail.com',
        password: await bcrypt.hash('abcd1234', 10)
      });
      console.log('Your user account created successfully');
    }
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.parent) {
      console.error("Original error:", error.parent.message);
    }
    process.exit(1);
  }
};
