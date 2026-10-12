
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-container page-content">
      <PageTitle
        title="Dashboard"
        subtitle="Your event management overview."
      />

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
    </div>
  );
}

export default Dashboard;
