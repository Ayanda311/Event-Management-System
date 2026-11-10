
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  attendeeName: {
    type: String,
    required: [true, "Attendee name is required"],
    trim: true,
    minlength: 3,
    maxlength: 100
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },

  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event is required"]
  },

  ticketQuantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    default: 1
  },

  registrationStatus: {
    type: String,
    enum: ["registered", "confirmed", "cancelled"],
    default: "registered"
  }
}, {
  timestamps: true
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
