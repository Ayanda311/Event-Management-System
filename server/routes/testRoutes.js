
const express = require("express");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route is working successfully!",
    project: "Event Management System"
  });
});

module.exports = router;
