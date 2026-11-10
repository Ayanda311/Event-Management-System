
const mongoose = require("mongoose");
const Participant = require("../models/Participant");
const Event = require("../models/Event");

// CREATE a participant
const createParticipant = async (req, res) => {
  try {
    const { event } = req.body;

    // Check whether the selected event exists
    if (!mongoose.isValidObjectId(event)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID"
      });
    }

    const existingEvent = await Event.findById(event);

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const participant = await Participant.create(req.body);

    res.status(201).json({
      success: true,
      message: "Participant registered successfully",
      data: participant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// READ all participants
const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find()
      .populate("event", "title date venue");

    res.status(200).json({
      success: true,
      data: participants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ one participant by ID
const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid participant ID"
      });
    }

    const participant = await Participant.findById(id)
      .populate("event", "title date venue");

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    res.status(200).json({
      success: true,
      data: participant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE a participant
const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid participant ID"
      });
    }

    if (req.body.event) {
      if (!mongoose.isValidObjectId(req.body.event)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event ID"
        });
      }

      const existingEvent = await Event.findById(req.body.event);

      if (!existingEvent) {
        return res.status(404).json({
          success: false,
          message: "Event not found"
        });
      }
    }

    const participant = await Participant.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate("event", "title date venue");

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Participant updated successfully",
      data: participant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE a participant
const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid participant ID"
      });
    }

    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Participant deleted successfully",
      data: participant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant
};
