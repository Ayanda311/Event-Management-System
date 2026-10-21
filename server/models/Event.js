
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Event category is required"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
