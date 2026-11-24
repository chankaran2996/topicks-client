import { useCallback, useEffect, useState } from 'react';
import { FiMail, FiUserPlus } from 'react-icons/fi';
import { api } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { formatDate, statusOf } from './adminUtils';
import InviteLink from './InviteLink';

const EMPTY = { name: '', email: '', phone: '' };

export default function Team() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [invite, setInvite] = useState(null); // { invite, email }

  const load = useCallback(() => {
    api('/admin/users').then((d) => setUsers(d.users)).catch((e) => setError(e.message));
  }, []);
  useEffect(() => { load(); }, [load]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onInvite = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const d = await api('/admin/users', { method: 'POST', body: form });
      setInvite({ invite: d.invite, email: d.user.email });
      setForm(EMPTY);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const resend = async (u) => {
    setBusyId(u.id);
    setError('');
    try {
      const d = await api(`/admin/users/${u.id}/invite`, { method: 'POST' });
      setInvite({ invite: d.invite, email: u.email });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const toggleActive = async (u) => {
    if (u.isActive && !window.confirm(`Deactivate ${u.name}? They will no longer be able to sign in.`)) return;
    setBusyId(u.id);
    setError('');
    try {
      await api(`/admin/users/${u.id}`, { method: 'PATCH', body: { isActive: !u.isActive } });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Team</h1>
        <p>Everyone who can sign in to this dashboard. New admins get a link to set their own password.</p>
      </div>

      {invite && <InviteLink invite={invite.invite} email={invite.email} onClose={() => setInvite(null)} />}
      {error && <p className="auth-error" role="alert">{error}</p>}

      <section className="admin-card">
        <div className="admin-card__head"><h2>Invite an admin</h2></div>
        <form className="admin-form" onSubmit={onInvite}>
          <label className="auth-field">
            Name
            <span className="auth-input"><input name="name" value={form.name} onChange={onChange} required /></span>
          </label>
          <label className="auth-field">
            Email
            <span className="auth-input"><input type="email" name="email" value={form.email} onChange={onChange} required /></span>
          </label>
          <label className="auth-field">
            Phone (optional)
            <span className="auth-input"><input type="tel" name="phone" value={form.phone} onChange={onChange} pattern="[0-9+\s\-]{10,15}" /></span>
          </label>
          <button type="submit" className="btn btn--red" disabled={saving}>
            <FiUserPlus /> {saving ? 'Inviting…' : 'Send invite'}
          </button>
        </form>
      </section>

      <section className="admin-card">
        <div className="admin-card__head"><h2>Admins</h2></div>
        {!users ? (
          <p className="admin-muted">Loading…</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Contact</th><th>Status</th><th>Last sign-in</th><th aria-label="Actions" /></tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const st = statusOf(u);
                  const isMe = u.id === me.id;
                  return (
                    <tr key={u.id}>
                      <td data-label="Name"><b>{u.name}</b>{isMe && <small className="admin-you">you</small>}</td>
                      <td data-label="Contact">
                        <div>{u.email}</div>
                        {u.phone && <small className="admin-muted">{u.phone}</small>}
                      </td>
                      <td data-label="Status"><span className={`admin-pill admin-pill--${st.cls}`}>{st.label}</span></td>
                      <td data-label="Last sign-in">{formatDate(u.lastLoginAt)}</td>
                      <td className="admin-table__actions">
                        {u.isActive && !u.hasPassword && (
                          <button type="button" className="auth-link" disabled={busyId === u.id} onClick={() => resend(u)}>
                            <FiMail aria-hidden /> New link
                          </button>
                        )}
                        {!isMe && (
                          <button type="button" className="auth-link" disabled={busyId === u.id} onClick={() => toggleActive(u)}>
                            {u.isActive ? 'Deactivate' : 'Reactivate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
