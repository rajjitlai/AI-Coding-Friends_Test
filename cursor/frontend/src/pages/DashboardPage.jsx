import { useAuth } from '../state/AuthContext';

export default function DashboardPage() {
  const { user, logout, API_URL } = useAuth();

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Authenticated</p>
            <h1>Dashboard</h1>
            <p className="muted">
              You are now signed in. The data below comes from the protected `/me` endpoint.
            </p>
          </div>
          <button className="secondary" onClick={logout}>
            Sign out
          </button>
        </div>
        <dl className="user-details">
          <div>
            <dt>Email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt>User ID</dt>
            <dd>{user?.id}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{new Date(user?.created_at).toLocaleString()}</dd>
          </div>
        </dl>
        <footer className="muted">
          API base: <code>{API_URL}</code>
        </footer>
      </section>
    </main>
  );
}

