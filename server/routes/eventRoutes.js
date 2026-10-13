
const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

// GET /api/events
router.get("/", getEvents);

// GET /api/events/:id
router.get("/:id", getEventById);

// POST /api/events
router.post("/", createEvent);

// PUT /api/events/:id
router.put("/:id", updateEvent);

// DELETE /api/events/:id
router.delete("/:id", deleteEvent);

module.exports = router;
