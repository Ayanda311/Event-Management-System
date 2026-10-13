
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Event Management System Backend is running!");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API test route is working!"
  });
});

console.log("Loaded app.js with /api/test route");

module.exports = app;
