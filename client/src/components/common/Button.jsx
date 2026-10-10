
function Button({ children, onClick }) {
  return (
    <button className="primary-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
