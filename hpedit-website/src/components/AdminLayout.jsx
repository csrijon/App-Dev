import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Users, MessageSquare, Settings, Link2, Mail, LogOut, Menu, X, Quote } from 'lucide-react';
import { useState } from 'react';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/hero', label: 'Hero', icon: Image },
  { to: '/admin/creators', label: 'Creators', icon: Users },
  { to: '/admin/categories', label: 'Categories', icon: Image },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/social-links', label: 'Social Links', icon: Link2 },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6fb', color: '#2a1a3a' }}>
      {/* Mobile top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#fff', borderBottom: '1px solid #eee', display: 'none', position: 'sticky', top: 0, zIndex: 100 }} className="admin-mobile-header">
        <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#4a1d7a' }}>HPEDIT<span style={{ color: '#7c3aed' }}>+</span></span>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" style={{ background: 'none', border: 'none', color: '#4a1d7a', cursor: 'pointer' }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, background: '#fff', borderRight: '1px solid #eee', padding: 28, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0, zIndex: 90 }} className="admin-sidebar">
          <div style={{ marginBottom: 28 }}>
            <Link to="/" style={{ textDecoration: 'none', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', color: '#4a1d7a', display: 'inline-block' }}>
              HPEDIT<span style={{ color: '#7c3aed' }}>+</span>
            </Link>
            <p style={{ fontSize: '0.8rem', color: '#8a769a', marginTop: 4 }}>Admin CMS</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {nav.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', color: active ? '#fff' : '#5a4568', background: active ? 'linear-gradient(90deg, #4a1d7a, #7c3aed)' : 'transparent', transition: 'background .2s, color .2s', boxShadow: active ? '0 4px 14px rgba(74,29,122,0.25)' : 'none' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <button onClick={logout} style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1.5px solid #e8dff0', background: '#fff', color: '#c23', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .2s' }} onMouseEnter={e => e.currentTarget.style.background = '#fff0f2'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 1020px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-header { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
