
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <PageTitle
        title="My Profile"
        subtitle="View your account information."
      />

      <Card
        title="User Information"
        description="This is a sample profile for the Sprint 7 practical."
      >
        <p><strong>Name:</strong> EventEase User</p>
        <p><strong>Role:</strong> Event Participant</p>

        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
}

export default Profile;
