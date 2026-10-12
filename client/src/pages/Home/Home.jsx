
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Home() {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Music Festival",
      description: "Experience live music and entertainment.",
      date: "20 November 2026"
    },
    {
      id: 2,
      title: "Technology Conference",
      description: "Explore technology and innovation.",
      date: "5 December 2026"
    },
    {
      id: 3,
      title: "College Cultural Day",
      description: "Celebrate creativity and campus life.",
      date: "12 December 2026"
    }
  ];

  return (
    <div className="page-content">
      <PageTitle
        title="Welcome to EventEase"
        subtitle="Discover, explore, and manage events with ease."
      />

      <div className="card-grid">
        {events.map((event) => (
          <Card
            key={event.id}
            title={event.title}
            description={event.description}
          >
            <p><strong>Date:</strong> {event.date}</p>
            <Button onClick={() => navigate("/login")}>
              Explore Event
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
