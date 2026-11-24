import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiExternalLink, FiUserPlus } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { api } from '../../auth/api';
import { useAuth } from '../../auth/AuthContext';
import { SITE, waLink } from '../../data/site';
import { formatDate } from './adminUtils';

const SITE_PAGES = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/tailoring', label: 'Tailoring' },
  { to: '/contact', label: 'Contact & enquiry' },
];

export default function Overview() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/admin/overview').then(setData).catch((e) => setError(e.message));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>{greeting}, {user.name}</h1>
        <p>Here’s what’s happening with your Topicks admin team.</p>
      </div>

      {error && <p className="auth-error" role="alert">{error}</p>}

      {data && !data.mailConfigured && (
        <div className="admin-alert">
          <FiAlertCircle aria-hidden />
          <p>
            <b>Email isn’t set up yet.</b> Set-password and reset links won’t be emailed; invite links are shown on screen instead.
            Add <code>EMAIL_USER</code> and <code>EMAIL_PASS</code> to <code>server/.env</code> to turn email on.
          </p>
        </div>
      )}

      <div className="admin-stats">
        <div className="admin-stat"><span>Admins</span><b>{data ? data.stats.admins : '–'}</b></div>
        <div className="admin-stat"><span>Active</span><b>{data ? data.stats.active : '–'}</b></div>
        <div className="admin-stat"><span>Pending invites</span><b>{data ? data.stats.pendingInvites : '–'}</b></div>
      </div>

      <div className="admin-grid">
        <section className="admin-card">
          <div className="admin-card__head">
            <h2>Recent sign-ins</h2>
            <Link to="/admin/team" className="auth-link">Manage team</Link>
          </div>
          {!data ? (
            <p className="admin-muted">Loading…</p>
          ) : data.recentLogins.length === 0 ? (
            <p className="admin-muted">No sign-ins yet.</p>
          ) : (
            <ul className="admin-list">
              {data.recentLogins.map((u) => (
                <li key={u.id}>
                  <span className="admin__avatar" aria-hidden>{u.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <b>{u.name}</b>
                    <small>{u.email}</small>
                  </div>
                  <small className="admin-list__meta">{formatDate(u.lastLoginAt)}</small>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-card">
          <div className="admin-card__head"><h2>Quick actions</h2></div>
          <div className="admin-actions">
            <Link to="/admin/team" className="admin-action"><FiUserPlus aria-hidden /> Invite an admin</Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="admin-action"><FaWhatsapp aria-hidden /> Store WhatsApp</a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="admin-action"><FaInstagram aria-hidden /> Instagram</a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" className="admin-action"><FaFacebookF aria-hidden /> Facebook</a>
          </div>
          <h3 className="admin-card__sub">Website pages</h3>
          <ul className="admin-links">
            {SITE_PAGES.map((p) => (
              <li key={p.to}>
                <a href={p.to} target="_blank" rel="noreferrer">{p.label} <FiExternalLink aria-hidden /></a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
