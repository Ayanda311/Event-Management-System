
function Card({
  title,
  description,
  children,
  className = ""
}) {
  return (
    <div className={`ui-card ${className}`}>
      {title && <h3>{title}</h3>}

      {description && <p>{description}</p>}

      {children && (
        <div className="card-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default Card;

// Example Usage
export function CardExample() {
  return (
    <div>
      <h2>Card Examples</h2>

      <div className="card-grid">
        <Card
          title="Upcoming Events"
          description="Explore events scheduled for the coming weeks."
        >
          <p>Discover workshops, concerts, and conferences.</p>
        </Card>

        <Card
          title="My Bookings"
          description="View and manage your event bookings."
        >
          <p>You can check your registration details here.</p>
        </Card>

        <Card
          title="Event Payments"
          description="Keep track of your event payment information."
        >
          <p>Review your payment status and transaction details.</p>
        </Card>
      </div>
    </div>
  );
}
