
import "./Participants.css";
import { useState, useEffect } from "react";

import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import { getEvents } from "../../services/eventService";

import {
  getParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant
} from "../../services/participantService";

function Participants() {
  const initialForm = {
    attendeeName: "",
    email: "",
    phone: "",
    event: "",
    ticketQuantity: 1,
    registrationStatus: "registered"
  };

  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET participants and events
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [participantData, eventData] = await Promise.all([
        getParticipants(),
        getEvents()
      ]);

      setParticipants(participantData);
      setEvents(eventData);
    } catch (err) {
      setError(err.message || "Unable to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // POST and PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const participantData = {
        ...formData,
        ticketQuantity: Number(formData.ticketQuantity)
      };

      if (editingId) {
        await updateParticipant(editingId, participantData);
        setSuccess("Participant updated successfully!");
      } else {
        await createParticipant(participantData);
        setSuccess("Participant registered successfully!");
      }

      setFormData(initialForm);
      setEditingId(null);

      await loadData();
    } catch (err) {
      setError(err.message || "Unable to save participant.");
    }
  };

  // Edit participant
  const handleEdit = (participant) => {
    setEditingId(participant._id);

    setFormData({
      attendeeName: participant.attendeeName || "",
      email: participant.email || "",
      phone: participant.phone || "",
      event:
        typeof participant.event === "object"
          ? participant.event?._id || ""
          : participant.event || "",
      ticketQuantity: participant.ticketQuantity || 1,
      registrationStatus:
        participant.registrationStatus || "registered"
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError("");
    setSuccess("");
  };

  // DELETE participant
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this participant?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      setDeletingId(id);

      await deleteParticipant(id);

      setParticipants((prev) =>
        prev.filter((participant) => participant._id !== id)
      );

      if (editingId === id) {
        cancelEdit();
      }

      setSuccess("Participant deleted successfully!");
    } catch (err) {
      setError(err.message || "Failed to delete participant.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page-container page-content participants-page">

      <PageTitle
        title="Participants"
        subtitle="Register and manage event participants."
      />

      {/* Registration Form */}
      <div className="participant-section">

        <Card
          title={editingId ? "Edit Participant" : "Register Participant"}
          description="Enter participant information and select an event."
        >

          <form
            className="participant-form"
            onSubmit={handleSubmit}
          >

            <div className="participant-form-grid">

              <div className="participant-field">
                <label htmlFor="attendeeName">
                  Attendee Name
                </label>
                <input
                  id="attendeeName"
                  type="text"
                  name="attendeeName"
                  placeholder="Enter full name"
                  value={formData.attendeeName}
                  onChange={handleChange}
                  minLength="3"
                  maxLength="100"
                  required
                />
              </div>

              <div className="participant-field">
                <label htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="participant-field">
                <label htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="participant-field">
                <label htmlFor="ticketQuantity">
                  Ticket Quantity
                </label>
                <input
                  id="ticketQuantity"
                  type="number"
                  name="ticketQuantity"
                  value={formData.ticketQuantity}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="participant-field participant-full-width">
                <label htmlFor="event">
                  Select Event
                </label>
                <select
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose an event</option>

                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="participant-field participant-full-width">
                <label htmlFor="registrationStatus">
                  Registration Status
                </label>
                <select
                  id="registrationStatus"
                  name="registrationStatus"
                  value={formData.registrationStatus}
                  onChange={handleChange}
                >
                  <option value="registered">Registered</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

            </div>

            <div className="participant-form-actions">

              <Button type="submit">
                {editingId ? "Save Changes" : "Register Participant"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              )}

            </div>

          </form>
        </Card>

      </div>

      {/* Manage Participants */}
      <div className="participant-section">

        <Card
          title="Manage Participants"
          description="View, edit and delete participant registrations."
        >

          <div className="participant-toolbar">
            <Button
              variant="secondary"
              onClick={loadData}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Participants"}
            </Button>
          </div>

          {error && (
            <div className="participant-message error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="participant-message success-message">
              {success}
            </div>
          )}

          {loading && (
            <p className="participant-empty">
              Loading participants...
            </p>
          )}

          {!loading && participants.length === 0 && (
            <p className="participant-empty">
              No participants registered yet.
            </p>
          )}

          {!loading && participants.length > 0 && (
            <div className="participants-list">

              {participants.map((participant) => (
                <div
                  className="participant-item"
                  key={participant._id}
                >

                  <div className="participant-item-header">
                    <div>
                      <h3>{participant.attendeeName}</h3>
                      <p className="participant-email">
                        {participant.email}
                      </p>
                    </div>

                    <span className={`participant-status ${participant.registrationStatus}`}>
                      {participant.registrationStatus}
                    </span>
                  </div>

                  <div className="participant-details">
                    <p>
                      <strong>Phone:</strong> {participant.phone}
                    </p>

                    <p>
                      <strong>Event:</strong>{" "}
                      {participant.event?.title || "Event unavailable"}
                    </p>

                    <p>
                      <strong>Tickets:</strong> {participant.ticketQuantity}
                    </p>
                  </div>

                  <div className="participant-actions">

                    <Button
                      onClick={() => handleEdit(participant)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="secondary"
                      disabled={deletingId === participant._id}
                      onClick={() => handleDelete(participant._id)}
                    >
                      {deletingId === participant._id
                        ? "Deleting..."
                        : "Delete"}
                    </Button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </Card>

      </div>

    </div>
  );
}

export default Participants;
