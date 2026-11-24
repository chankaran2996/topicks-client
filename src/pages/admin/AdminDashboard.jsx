import { useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { FiExternalLink, FiGrid, FiLogOut, FiMenu, FiUser, FiUsers, FiX } from 'react-icons/fi';
import { useAuth } from '../../auth/AuthContext';
import useNoIndex from '../../hooks/useNoIndex';
import logoIcon from '../../assets/logo-icon.png';
import Overview from './Overview';
import Team from './Team';
import Account from './Account';

const LINKS = [
  { to: '/admin', label: 'Overview', Icon: FiGrid, end: true },
  { to: '/admin/team', label: 'Team', Icon: FiUsers },
  { to: '/admin/account', label: 'My account', Icon: FiUser },
];

export default function AdminDashboard() {
  useNoIndex('Admin · Topicks');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className={`admin ${menuOpen ? 'admin--menu' : ''}`}>
      <header className="admin__bar">
        <button type="button" className="admin__burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/admin" className="admin__brand">
          <img src={logoIcon} alt="" />
          <strong>Topicks Admin</strong>
        </Link>
        <div className="admin__who">
          <span className="admin__avatar" aria-hidden>{user.name.charAt(0).toUpperCase()}</span>
          <span className="admin__name">{user.name}</span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onLogout}>
            <FiLogOut /> <span className="admin__hide-sm">Log out</span>
          </button>
        </div>
      </header>

      <div className="admin__layout">
        <nav className="admin__side" aria-label="Admin">
          {LINKS.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `admin__link ${isActive ? 'is-active' : ''}`} onClick={() => setMenuOpen(false)}>
              <Icon aria-hidden /> {label}
            </NavLink>
          ))}
          <a href="/" target="_blank" rel="noreferrer" className="admin__link admin__link--muted">
            <FiExternalLink aria-hidden /> View website
          </a>
        </nav>

        <main className="admin__main">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="team" element={<Team />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
