
function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`ui-button ${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Example Usage
function ButtonExample() {
  return (
    <div>
      <h2>Reusable Button Examples</h2>

      <Button onClick={() => alert("Create Event clicked!")}>
        Create Event
      </Button>

      <Button
        variant="secondary"
        onClick={() => alert("View Events clicked!")}
      >
        View Events
      </Button>

      <Button disabled>
        Disabled Button
      </Button>
    </div>
  );
}

export { ButtonExample };
export default Button;
