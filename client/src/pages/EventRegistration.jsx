
import { useState } from "react";
import "./EventRegistration.css";

const initialFormData = {
  eventName: "",
  attendeeName: "",
  email: "",
  phone: "",
  ticketQuantity: "1",
  eventDate: "",
};

function EventRegistration() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear the old error for the edited field
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSubmittedData(null);
  }

  // Validate the form
  function validateForm() {
    const newErrors = {};

    if (!formData.eventName.trim()) {
      newErrors.eventName = "Please enter the event name.";
    }

    if (formData.attendeeName.trim().length < 3) {
      newErrors.attendeeName =
        "Name must contain at least 3 characters.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a phone number containing 10–15 digits.";
    }

    const quantity = Number(formData.ticketQuantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 10
    ) {
      newErrors.ticketQuantity =
        "Choose between 1 and 10 tickets.";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Please select an event date.";
    } else {
      const selectedDate = new Date(
        `${formData.eventDate}T00:00:00`
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.eventDate =
          "The event date cannot be in the past.";
      }
    }

    return newErrors;
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmittedData(null);
      return;
    }

    const registration = {
      ...formData,
      ticketQuantity: Number(formData.ticketQuantity),
    };

    console.log("Registration submitted:", registration);

    setSubmittedData(registration);
    setFormData(initialFormData);
    setErrors({});
  }

  // Reset the form
  function handleReset() {
    setFormData(initialFormData);
    setErrors({});
    setSubmittedData(null);
  }

  return (
    <div className="registration-page">
      <div className="registration-card">
        <div className="registration-heading">
          <span className="form-tag">EVENT MANAGEMENT</span>
          <h1>Event Registration</h1>
          <p>
            Register for an event and reserve your tickets.
          </p>
        </div>

        {submittedData && (
          <div className="success-message" role="status">
            <strong>Registration successful!</strong>
            <p>
              Thank you, {submittedData.attendeeName}.
              Your registration has been recorded.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="eventName">Event Name *</label>
            <input
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="e.g. Annual Tech Conference"
              aria-invalid={Boolean(errors.eventName)}
              aria-describedby={
                errors.eventName ? "eventName-error" : undefined
              }
            />
            {errors.eventName && (
              <p className="field-error" id="eventName-error">
                {errors.eventName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="attendeeName">Full Name *</label>
            <input
              id="attendeeName"
              name="attendeeName"
              value={formData.attendeeName}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.attendeeName)}
              aria-describedby={
                errors.attendeeName
                  ? "attendeeName-error"
                  : undefined
              }
            />
            {errors.attendeeName && (
              <p className="field-error" id="attendeeName-error">
                {errors.attendeeName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
            />
            {errors.email && (
              <p className="field-error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10–15 digits"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "phone-error" : undefined
              }
            />
            {errors.phone && (
              <p className="field-error" id="phone-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ticketQuantity">
              Number of Tickets *
            </label>
            <input
              id="ticketQuantity"
              name="ticketQuantity"
              type="number"
              min="1"
              max="10"
              value={formData.ticketQuantity}
              onChange={handleChange}
              aria-invalid={Boolean(errors.ticketQuantity)}
              aria-describedby={
                errors.ticketQuantity
                  ? "ticketQuantity-error"
                  : undefined
              }
            />
            {errors.ticketQuantity && (
              <p
                className="field-error"
                id="ticketQuantity-error"
              >
                {errors.ticketQuantity}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date *</label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.eventDate)}
              aria-describedby={
                errors.eventDate ? "eventDate-error" : undefined
              }
            />
            {errors.eventDate && (
              <p className="field-error" id="eventDate-error">
                {errors.eventDate}
              </p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Register for Event
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>

          <p className="required-note">
            * All fields are required.
          </p>
        </form>
      </div>
    </div>
  );
}

export default EventRegistration;
