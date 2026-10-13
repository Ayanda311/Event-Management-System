
const express = require("express");
const cors = require("cors");

const app = express();

// Import routes and middleware
const eventRoutes = require("./routes/eventRoutes");
const requestLogger = require("./middleware/requestLogger");

// Global middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Home route
app.get("/", (req, res) => {
  res.send("Event Management System Backend is running!");
});

// Sprint 11 test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API test route is working!"
  });
});

// Sprint 12 Events API
app.use("/api/events", eventRoutes);

console.log("Loaded app.js with Sprint 12 routes");

module.exports = app;
