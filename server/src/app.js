
const express = require("express");
const cors = require("cors");

const app = express();

// Import routes
const eventRoutes = require("./routes/eventRoutes");
const participantRoutes = require("./routes/participantRoutes");
const authRoutes = require("./routes/authRoutes");

// Import middleware
const requestLogger = require("./middleware/requestLogger");

// Global middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Root route
app.get("/", (req, res) => {
  res.send("Event Management System Backend is running!");
});

// API test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API test route is working!"
  });
});

// Register Events routes
app.use("/api/events", eventRoutes);

// Register Participants routes
app.use("/api/participants", participantRoutes);

// Register Authentication routes - Sprint 18
app.use("/api/auth", authRoutes);

console.log("Loaded app.js with Sprint 18 Authentication routes");

module.exports = app;
