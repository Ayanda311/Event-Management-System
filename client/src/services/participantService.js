
const API_URL = "http://localhost:5000/api/participants";

// GET: Fetch all participants
export const getParticipants = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch participants");
  }

  const result = await response.json();
  return result.data;
};

// GET: Fetch a single participant
export const getParticipantById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch participant");
  }

  const result = await response.json();
  return result.data;
};

// POST: Register a new participant
export const createParticipant = async (participantData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(participantData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to register participant");
  }

  return result.data;
};

// PUT: Update participant details
export const updateParticipant = async (id, participantData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(participantData)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update participant");
  }

  return result.data;
};

// DELETE: Delete a participant
export const deleteParticipant = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete participant");
  }

  return result;
};
