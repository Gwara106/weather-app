import bcrypt from "bcrypt";
import User from "../../model/user/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    if (!req.body.email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }
    
    const user = await User.findOne({ 
      where: { email: req.body.email }
    });

    if (!user) {
      console.log("User not found:", req.body.email);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("Found user:", { id: user.id, email: user.email });
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    console.log("Password validation result:", isPasswordValid);
    
    if (!isPasswordValid) {
      console.log("Invalid password for user:", req.body.email);
      return res.status(401).json({ message: "Invalid password" });
    }

    const userForToken = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const token = generateToken(userForToken);
    return res.status(200).json({
      data: { 
        access_token: token,
        user: userForToken
      },
      message: "Successfully logged in"
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

const init = async (req, res) => {
  try {
    // req.user is set by the authenticateToken middleware
    if (!req.user || !req.user.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Return the user data from the token
    return res.status(200).json({
      data: req.user.user,
      message: "Successfully retrieved user data"
    });
  } catch (error) {
    console.error("Error in init:", error);
    res.status(500).json({ message: "Auth service error", error: error.message });
  }
};

export const authController = {
  login,
  init,
};