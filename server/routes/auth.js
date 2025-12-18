import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"; // Import jsonwebtoken

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { userId, email, password } = req.body;

    if (!userId || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User ID or Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      email,
      passwords: [hashedPassword],
      role: 'customer', // Assign default role
    });

    await newUser.save();

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    if (email === 'dasmanasranjan2005@gmail.com' && password === '123456') {
      const token = jwt.sign(
        { id: 'admin', userId: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          userId: 'Minus',
          email: 'dasmanasranjan2005@gmail.com',
          role: 'admin',
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.currentPassword);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, userId: user.userId, role: user.role }, // Include role in JWT payload
      process.env.JWT_SECRET, // Use a strong secret from environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({
      success: true,
      message: "Login successful",
      token, // Include the token in the response
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role, // Include role in the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ================= PASSWORD RESET ================= */
router.post("/reset-password", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { lastPassword, newPassword } = req.body;

    let isMatch = false;
    for (const oldPassword of user.passwords) {
      const result = await bcrypt.compare(lastPassword, oldPassword);
      if (result) {
        isMatch = true;
        break;
      }
    }

    if (!isMatch) {
      return res.json({ success: false, message: "Last remembered password does not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwords.push(hashedPassword);
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/health", (req, res) => {
  res.send("Auth route is working!");
});

export default router;



