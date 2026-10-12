
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <PageTitle
        title="404 - Page Not Found"
        subtitle="Sorry, the page you requested does not exist."
      />

      <Button onClick={() => navigate("/")}>
        Return Home
      </Button>
    </div>
  );
}

export default NotFound;
