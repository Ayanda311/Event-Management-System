
const express = require("express");
const router = express.Router();

const {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant
} = require("../controllers/participantController");

// CREATE a participant
router.post("/", createParticipant);

// READ all participants
router.get("/", getParticipants);

// READ one participant
router.get("/:id", getParticipantById);

// UPDATE a participant
router.put("/:id", updateParticipant);

// DELETE a participant
router.delete("/:id", deleteParticipant);

module.exports = router;
