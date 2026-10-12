
function PageTitle({ title, subtitle, className = "" }) {
  return (
    <header className={`page-title ${className}`}>
      <h1>{title}</h1>

      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}

export default PageTitle;

// Example Usage
export function PageTitleExample() {
  return (
    <div>
      <h2>Page Title Examples</h2>

      <PageTitle
        title="Welcome to Event Management"
        subtitle="Discover and manage events easily."
      />

      <PageTitle
        title="Dashboard"
        subtitle="View your event activities and statistics."
      />

      <PageTitle
        title="My Profile"
        subtitle="Manage your personal information."
      />
    </div>
  );
}


