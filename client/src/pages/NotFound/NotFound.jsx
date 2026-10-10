
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page-content">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Return to Home</Link>
    </section>
  );
}

export default NotFound;
