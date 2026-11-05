const API_URL = "http://localhost:5000/api/events";

// GET: Fetch all events
export const getEvents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const result = await response.json();
  return result.data;
};

// GET: Fetch a single event
export const getEventById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  const result = await response.json();
  return result.data;
};

// POST: Create a new event
export const createEvent = async (eventData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create event");
  }

  return result.data;
};

// PUT: Update an existing event
export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update event");
  }

  return result.data;
};

// DELETE: Delete an event
export const deleteEvent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete event");
  }

  return result;
};