
const express = require("express");
const cors = require("cors");

const app = express();

const eventRoutes = require("./routes/eventRoutes");
const requestLogger = require("./middleware/requestLogger");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Event Management System Backend is running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API test route is working!"
  });
});

// Register Events routes
app.use("/api/events", eventRoutes);

console.log("Loaded app.js with Sprint 12 Events routes");

module.exports = app;
