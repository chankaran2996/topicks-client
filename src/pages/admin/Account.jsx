import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';

export default function Account() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '' });
  const [status, setStatus] = useState({ error: '', notice: '' });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ error: '', notice: '' });
    try {
      const d = await api('/admin/me', { method: 'PATCH', body: form });
      updateUser(d.user);
      setStatus({ error: '', notice: 'Saved.' });
    } catch (err) {
      setStatus({ error: err.message, notice: '' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>My account</h1>
        <p>Update your details. Your email is your sign-in and can’t be changed here.</p>
      </div>

      <section className="admin-card admin-card--narrow">
        <form className="admin-form admin-form--stack" onSubmit={onSubmit}>
          <label className="auth-field">
            Email
            <span className="auth-input"><input value={user.email} readOnly disabled /></span>
          </label>
          <label className="auth-field">
            Name
            <span className="auth-input"><input name="name" value={form.name} onChange={onChange} required /></span>
          </label>
          <label className="auth-field">
            Phone
            <span className="auth-input"><input type="tel" name="phone" value={form.phone} onChange={onChange} pattern="[0-9+\s\-]{10,15}" /></span>
          </label>
          {status.error && <p className="auth-error" role="alert">{status.error}</p>}
          {status.notice && <p className="auth-notice">{status.notice}</p>}
          <button type="submit" className="btn btn--red admin-fit" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
        </form>
      </section>

      <section className="admin-card admin-card--narrow">
        <div className="admin-card__head"><h2>Password</h2></div>
        <p className="admin-muted">To change your password, request a reset link for {user.email}.</p>
        <Link to="/forgot-password" state={{ email: user.email }} className="btn btn--ghost btn--sm admin-fit">Change password</Link>
      </section>
    </div>
  );
}
