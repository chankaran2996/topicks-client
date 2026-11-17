import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import { api } from '../auth/api';
import { useAuth } from '../auth/AuthContext';
import useNoIndex from '../hooks/useNoIndex';
import AuthCard from '../components/auth/AuthCard';
import PasswordInput from '../components/auth/PasswordInput';

const RULES = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'A letter and a number', test: (p) => /[a-z]/i.test(p) && /\d/.test(p) },
];

const readToken = () => new URLSearchParams(window.location.search).get('token') || '';

// Opened from the email link: /set-password?token=...
// Used both for "forgot password" resets and for first-time account setup.
export default function SetPassword() {
  useNoIndex('Set password · Topicks');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [token] = useState(readToken);
  const [status, setStatus] = useState(token ? 'checking' : 'invalid'); // checking | ready | invalid
  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    // Remove the token from the address bar so it isn't left in browser history
    // or leaked through the Referer header.
    window.history.replaceState(window.history.state, '', window.location.pathname);
    api(`/auth/password-token/${encodeURIComponent(token)}`)
      .then((data) => {
        setAccount(data);
        setStatus('ready');
      })
      .catch(() => setStatus('invalid'));
  }, [token]);

  if (status === 'checking') return <div className="auth-loading">Checking your link…</div>;

  if (status === 'invalid') {
    return (
      <AuthCard title="Link expired" subtitle="This link is invalid, already used, or has expired.">
        <Link to="/forgot-password" className="btn btn--red btn--block">
          Get a new link
        </Link>
        <Link to="/login" className="auth-link auth-link--center">
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const rulesOk = RULES.every((r) => r.test(form.password));
  const matches = form.password.length > 0 && form.password === form.confirm;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!rulesOk) return setError('Please choose a stronger password.');
    if (!matches) return setError('Passwords do not match.');
    setError('');
    setSubmitting(true);
    try {
      const { message } = await api('/auth/set-password', { method: 'POST', body: { token, password: form.password } });
      logout(); // any saved session is now invalid
      navigate('/login', { replace: true, state: { email: account.email, notice: message } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title={account.isNewAccount ? 'Create your password' : 'Set a new password'}
      subtitle={`For ${account.email}`}
      onSubmit={onSubmit}
    >
      {/* Lets password managers save the new password against the right account. */}
      <input type="email" name="username" autoComplete="username" value={account.email} readOnly hidden />

      <PasswordInput label="New password" name="password" value={form.password} onChange={onChange} autoComplete="new-password" autoFocus />

      <ul className="auth-rules" aria-live="polite">
        {RULES.map((r) => {
          const ok = r.test(form.password);
          return (
            <li key={r.label} className={ok ? 'is-ok' : ''}>
              {ok ? <FiCheck aria-hidden /> : <FiX aria-hidden />} {r.label}
            </li>
          );
        })}
      </ul>

      <PasswordInput label="Confirm password" name="confirm" value={form.confirm} onChange={onChange} autoComplete="new-password" />
      {form.confirm && !matches && <p className="auth-hint auth-hint--warn">Passwords do not match.</p>}

      {error && <p className="auth-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--red btn--block" disabled={submitting || !rulesOk || !matches}>
        {submitting ? 'Saving…' : 'Save password'}
      </button>
    </AuthCard>
  );
}
