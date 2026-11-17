import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { api } from '../auth/api';
import useNoIndex from '../hooks/useNoIndex';
import AuthCard from '../components/auth/AuthCard';

export default function ForgotPassword() {
  useNoIndex('Forgot password · Topicks');
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [sent, setSent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { message } = await api('/auth/forgot-password', { method: 'POST', body: { email } });
      setSent(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const backToLogin = (
    <Link to="/login" state={{ email }} className="auth-link auth-link--center">
      <FiArrowLeft aria-hidden /> Back to sign in
    </Link>
  );

  if (sent) {
    return (
      <AuthCard title="Check your email" subtitle={sent}>
        <p className="auth-hint">The link expires in 30 minutes. Don't see it? Check your spam folder.</p>
        <button type="button" className="btn btn--ghost btn--block" onClick={() => setSent('')}>
          Use a different email
        </button>
        {backToLogin}
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Forgot password?" subtitle="Enter your email and we'll send you a link to set a new one." onSubmit={onSubmit}>
      <label className="auth-field">
        <span>Email</span>
        <div className="auth-input">
          <FiMail aria-hidden />
          <input type="email" name="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </div>
      </label>

      {error && <p className="auth-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--red btn--block" disabled={submitting || !email}>
        {submitting ? 'Sending…' : 'Send reset link'}
      </button>
      {backToLogin}
    </AuthCard>
  );
}
