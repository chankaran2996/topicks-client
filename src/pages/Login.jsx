import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import { homeForRole } from '../auth/roles';
import useNoIndex from '../hooks/useNoIndex';
import AuthCard from '../components/auth/AuthCard';
import PasswordInput from '../components/auth/PasswordInput';

// Hidden page: reachable only by typing /login. Nothing in the public site links here.
export default function Login() {
  useNoIndex('Sign in · Topicks');
  const { user, checking, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: location.state?.email || '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (checking) return <div className="auth-loading">Loading…</div>;
  if (user) return <Navigate to={homeForRole(user.role)} replace />;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const u = await login(form.email, form.password);
      const from = location.state?.from;
      const home = homeForRole(u.role);
      navigate(from && from.startsWith(home) ? from : home, { replace: true });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to manage Topicks" onSubmit={onSubmit}>
      {location.state?.notice && <p className="auth-notice">{location.state.notice}</p>}

      <label className="auth-field">
        <span>Email</span>
        <div className="auth-input">
          <FiMail aria-hidden />
          <input type="email" name="email" autoComplete="username" value={form.email} onChange={onChange} required autoFocus={!form.email} />
        </div>
      </label>

      <PasswordInput label="Password" name="password" value={form.password} onChange={onChange} autoFocus={Boolean(form.email)} />

      <Link to="/forgot-password" state={{ email: form.email }} className="auth-link auth-link--end">
        Forgot password?
      </Link>

      {error && <p className="auth-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--red btn--block" disabled={submitting || !form.email || !form.password}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
    </AuthCard>
  );
}
