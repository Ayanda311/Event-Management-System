
const events = [
  {
    id: "1",
    title: "Tech Innovation Summit",
    category: "Technology",
    date: "2026-11-15",
    venue: "Main Auditorium"
  },
  {
    id: "2",
    title: "Campus Music Festival",
    category: "Entertainment",
    date: "2026-12-05",
    venue: "College Grounds"
  }
];

const getEvents = (req, res) => {
  res.status(200).json({
    success: true,
    data: events
  });
};

const getEventById = (req, res) => {
  const event = events.find(
    (item) => item.id === req.params.id
  );

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  res.status(200).json({
    success: true,
    data: event
  });
};

const createEvent = (req, res) => {
  res.status(201).json({
    success: true,
    message: "POST route is working",
    receivedData: req.body
  });
};

const updateEvent = (req, res) => {
  res.status(200).json({
    success: true,
    message: "PUT route is working",
    eventId: req.params.id,
    receivedData: req.body
  });
};

const deleteEvent = (req, res) => {
  res.status(200).json({
    success: true,
    message: "DELETE route is working",
    eventId: req.params.id
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
