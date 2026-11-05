
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import "./EventRegistration.css";

const initialFormData = {
  title: "",
  category: "",
  date: "",
  venue: "",
  description: "",
  status: "upcoming",
};

function EventRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSuccessMessage("");
    setErrorMessage("");
  }

  // Validate form
  function validateForm() {
    const newErrors = {};

    if (formData.title.trim().length < 3) {
      newErrors.title = "Title must contain at least 3 characters.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Please select an event category.";
    }

    if (!formData.date) {
      newErrors.date = "Please select an event date.";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Please enter the event venue.";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters.";
    }

    return newErrors;
  }

  // Handle form submission using POST API
  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      // Prepare event data
      const eventData = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        date: formData.date,
        venue: formData.venue.trim(),
        description: formData.description.trim(),
        status: formData.status,
      };

      // Send POST request to Express API
      const createdEvent = await createEvent(eventData);

      setSuccessMessage(
        `"${createdEvent.title}" has been successfully created!`
      );

      // Clear form after successful creation
      setFormData(initialFormData);
      setErrors({});

    } catch (error) {
      setErrorMessage(
        error.message || "Unable to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Reset form
  function handleReset() {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  }

  return (
    <div className="registration-page">
      <div className="registration-card">

        <div className="registration-heading">
          <span className="form-tag">EVENT MANAGEMENT</span>

          <h1>Add New Event</h1>

          <p>
            Create and manage events using EventEase.
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="success-message" role="status">
            <strong>Event created successfully!</strong>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="field-error" role="alert">
            <strong>Something went wrong.</strong>
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Event Title */}
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Annual Tech Conference"
              aria-invalid={Boolean(errors.title)}
            />

            {errors.title && (
              <p className="field-error">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Event Category *</label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Cultural">Cultural</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>

            {errors.category && (
              <p className="field-error">{errors.category}</p>
            )}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Event Date *</label>

            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
            />

            {errors.date && (
              <p className="field-error">{errors.date}</p>
            )}
          </div>

          {/* Venue */}
          <div className="form-group">
            <label htmlFor="venue">Event Venue *</label>

            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter event venue"
              aria-invalid={Boolean(errors.venue)}
            />

            {errors.venue && (
              <p className="field-error">{errors.venue}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Event Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              maxLength={1000}
              rows={4}
            />

            <small>
              {formData.description.length}/1000 characters
            </small>

            {errors.description && (
              <p className="field-error">{errors.description}</p>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">Event Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Creating Event..." : "Create Event"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Form
            </button>

          </div>

          <p className="required-note">
            * All required fields must be completed.
          </p>

          <button
            type="button"
            className="reset-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

        </form>
      </div>
    </div>
  );
}

export default EventRegistration;
