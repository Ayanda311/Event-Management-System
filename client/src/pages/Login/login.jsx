
function Login() {
  return (
    <section className="page-content">
      <h1>Login</h1>
      <p>Welcome back to EventEase.</p>

      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <button type="submit">Log In</button>
      </form>
    </section>
  );
}

export default Login;
