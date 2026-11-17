import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import Preloader from './components/common/Preloader';
import SmoothScroll from './components/common/SmoothScroll';
import ScrollToTop from './components/common/ScrollToTop';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SetPassword from './pages/SetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import RequireRole from './auth/RequireRole';

// Private pages (login + role dashboards) render without the shop chrome.
const PRIVATE_PREFIXES = ['/login', '/forgot-password', '/set-password', '/admin'];
const isPrivatePath = (path) => PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

function PrivateApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route
        path="/admin/*"
        element={
          <RequireRole roles={['admin']}>
            <AdminDashboard />
          </RequireRole>
        }
      />
    </Routes>
  );
}

function PublicApp() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return isPrivatePath(pathname) ? <PrivateApp /> : <PublicApp />;
}
