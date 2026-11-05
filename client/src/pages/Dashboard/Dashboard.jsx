
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Welcome from "../../components/ui/Welcome";

import {
  getEvents,
  updateEvent,
  deleteEvent,
} from "../../services/eventService";

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    venue: "",
    description: "",
    status: "upcoming",
  });

  // GET: Fetch all events
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message || "Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Load selected event for editing
  const handleEdit = (event) => {
    setEditingEvent(event._id);
    setSuccess("");
    setError("");

    setFormData({
      title: event.title || "",
      category: event.category || "",
      date: event.date
        ? new Date(event.date).toISOString().slice(0, 10)
        : "",
      venue: event.venue || "",
      description: event.description || "",
      status: event.status || "upcoming",
    });
  };

  // Handle edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PUT: Update event
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      await updateEvent(editingEvent, formData);

      setSuccess("Event updated successfully!");
      setEditingEvent(null);

      await loadEvents();
    } catch (err) {
      setError(err.message || "Failed to update event.");
    }
  };

  // DELETE: Delete event
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      setDeletingEvent(id);

      await deleteEvent(id);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== id)
      );

      if (editingEvent === id) {
        setEditingEvent(null);
      }

      setSuccess("Event deleted successfully!");
    } catch (err) {
      setError(err.message || "Failed to delete event.");
    } finally {
      setDeletingEvent(null);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingEvent(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="page-container page-content">

      <PageTitle
        title="Dashboard"
        subtitle="Manage and monitor your events."
      />

      <Welcome
        userName="Ayanda"
        projectName="Event Management System"
      />

      {/* Dashboard overview */}
      <div className="card-grid">

        <Card
          title="Total Events"
          description="Total events stored in MongoDB."
        >
          <h2>{loading ? "..." : events.length}</h2>
        </Card>

        <Card
          title="Add New Event"
          description="Create a new event."
        >
          <Button onClick={() => navigate("/event-registration")}>
            Add Event
          </Button>
        </Card>

        <Card
          title="My Profile"
          description="View your profile information."
        >
          <Button onClick={() => navigate("/profile")}>
            View Profile
          </Button>
        </Card>

      </div>

      {/* Edit Event Form */}
      {editingEvent && (
        <Card
          title="Edit Event"
          description="Update the selected event details."
        >
          <form onSubmit={handleUpdate}>

            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              minLength="3"
              maxLength="100"
              required
            />

            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength="1000"
              rows="4"
            />

            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="form-actions">
              <Button type="submit">
                Save Changes
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>

          </form>
        </Card>
      )}

      {/* Events List */}
      <Card
        title="Manage Events"
        description="View, update, and delete events from MongoDB."
      >

        <Button
          variant="secondary"
          onClick={loadEvents}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Events"}
        </Button>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {success && (
          <p style={{ color: "green" }}>{success}</p>
        )}

        {loading && <p>Loading events...</p>}

        {!loading && events.length === 0 && !error && (
          <p>No events found. Add your first event!</p>
        )}

        {!loading && events.length > 0 && (
          <div className="card-grid">

            {events.map((event) => (
              <Card
                key={event._id}
                title={event.title}
                description={
                  event.description || "No description available."
                }
              >

                <p>
                  <strong>Category:</strong> {event.category}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>

                <p>
                  <strong>Status:</strong> {event.status}
                </p>

                <div className="form-actions">

                  <Button
                    onClick={() => handleEdit(event)}
                  >
                    Edit Event
                  </Button>

                  <Button
                    variant="secondary"
                    disabled={deletingEvent === event._id}
                    onClick={() => handleDelete(event._id)}
                  >
                    {deletingEvent === event._id
                      ? "Deleting..."
                      : "Delete Event"}
                  </Button>

                </div>

              </Card>
            ))}

          </div>
        )}

      </Card>

    </div>
  );
}

export default Dashboard;
