import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Music Organizer API is running...");
});

// API routes
app.use("/api/songs", songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
