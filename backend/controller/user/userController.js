import User from "../../model/user/User.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      Name: name,
      Email: email,
      Password: hashedPassword, // Store the hashed password
    });

    return res
      .status(201)
      .send({ data: user, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Failed to create user" });
  }
};

// Get All Users
export const getAllUsers = async (req, res) =>{
  const {roomId} = req.params;

  try {
    const users = await User.findAll({where:{
      RoomId:roomId
    }});
    return res.status(200).send({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({ message: "Failed to fetch users" });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ message: "Failed to fetch user" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const userId = req.params.id;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update user details
    if (Password) {
      // Hash the new password if provided
      const hashedPassword = await bcrypt.hash(Password, 10);
      user.Password = hashedPassword;
    }

    user.Name = Name || user.Name;
    user.Email = Email || user.Email;
    await user.save();

    return res
      .status(200)
      .send({ data: user, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({ message: "Failed to update user" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { Id: userId } });
    if (!deleted) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ message: "Failed to delete user" });
  }
};
