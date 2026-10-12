
function Welcome({ userName, projectName }) {
  return (
    <div className="welcome-message">
      <h2>Welcome, {userName}!</h2>
      <p>You are working on {projectName}.</p>
    </div>
  );
}

export default Welcome;
