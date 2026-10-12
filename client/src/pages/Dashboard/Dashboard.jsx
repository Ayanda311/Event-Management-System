
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Welcome from "../../components/ui/Welcome";

function Dashboard() {
  const navigate = useNavigate();

  // Exercise 3: State
  const [eventCount, setEventCount] = useState(0);

  // Exercise 5: User input
  const [eventName, setEventName] = useState("");

  // Exercise 6: Conditional rendering
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="page-container page-content">
      {/* Exercise 2: Dynamic page information */}
      <PageTitle
        title="Dashboard"
        subtitle="Your event management overview."
      />

      {/* Exercise 1: Props */}
      <Welcome
        userName="Ayanda"
        projectName="Event Management System"
      />

      {/* Existing dashboard cards */}
      <div className="card-grid">
        <Card
          title="Manage Events"
          description="View and organize your event activities."
        >
          <Button onClick={() => navigate("/")}>
            Browse Events
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

      {/* Exercise 3 and 4: State and button events */}
      <Card
        title="Event Counter"
        description="Demonstrate state updates using useState."
      >
        <h2>{eventCount}</h2>

        <Button onClick={() => setEventCount((count) => count + 1)}>
          Increase Counter
        </Button>

        <Button
          variant="secondary"
          onClick={() => setEventCount(0)}
        >
          Reset Counter
        </Button>
      </Card>

      {/* Exercise 5: Input event handling */}
      <Card
        title="Event Name Preview"
        description="Type an event name to see dynamic content."
      >
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
          aria-label="Event name"
        />

        <p>
          {eventName.trim()
            ? `Your event: ${eventName}`
            : "No event name entered yet."}
        </p>
      </Card>

      {/* Exercise 6: Conditional rendering */}
      <Card
        title="Event Information"
        description="Show or hide information using state."
      >
        <Button
          onClick={() => setShowInfo((visible) => !visible)}
        >
          {showInfo ? "Hide Information" : "Show Information"}
        </Button>

        {showInfo && (
          <p>
            Manage your events, organize bookings, and keep
            track of your event activities.
          </p>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
