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
      password: hashedPassword,
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, userId: user.userId },
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
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/health", (req, res) => {
  res.send("Auth route is working!");
});

export default router;



