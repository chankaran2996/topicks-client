import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../auth/AuthContext';
import { api } from '../../auth/api';
import useNoIndex from '../../hooks/useNoIndex';
import logoIcon from '../../assets/logo-icon.png';

// Placeholder admin home. Build out admin features from here.
export default function AdminDashboard() {
  useNoIndex('Admin · Topicks');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    api('/admin/overview')
      .then((d) => setMessage(d.message))
      .catch((e) => setMessage(e.message));
  }, []);

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="admin">
      <header className="admin__bar">
        <div className="admin__brand">
          <img src={logoIcon} alt="" />
          <strong>Topicks Admin</strong>
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onLogout}>
          <FiLogOut /> Log out
        </button>
      </header>
      <section className="admin__body">
        <h1>Hello, {user.name}</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}
