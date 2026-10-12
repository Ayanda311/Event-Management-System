
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    alert("Demo login form submitted.");
  }

  return (
    <div className="page-content">
      <PageTitle
        title="Login"
        subtitle="Access your EventEase account."
      />

      <Card title="Sign In">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit">Login</Button>
          {" "}
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
