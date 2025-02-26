import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify JWT token
export function authenticateToken(req, res, next) {
  console.log('Authenticating token...');
  
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);
  
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted token:', token ? 'Present' : 'Missing');

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Present' : 'Missing');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}
