import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import contactRoutes from "./routes/contact.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", dataRoutes);
app.use("/api", contactRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port https://localhost:${PORT}`);
    }).on('error', (err) => {
      console.error("❌ Server failed to start:", err);
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
