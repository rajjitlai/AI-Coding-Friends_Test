import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: sessionError } = useAuth();
  const [formError, setFormError] = useState('');
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setFormValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await login(formValues);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue to your dashboard.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={updateField}
              required
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formValues.password}
              onChange={updateField}
              required
              minLength={8}
            />
          </label>
          {(formError || sessionError) && (
            <p className="form-error">{formError || sessionError}</p>
          )}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="auth-footer">
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}

