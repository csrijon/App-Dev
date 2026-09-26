import { useEffect, useState } from 'react';
import { API_URL, authHeaders } from '../services/api.js';
import { Users, Image, MessageSquare, Mail, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ creators: 0, categories: 0, testimonials: 0, contacts: 0, heroes: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchStat = async (path) => {
      try {
        const res = await fetch(API_URL + '/api' + path, { headers: authHeaders(token) });
        if (res.ok) { const data = await res.json(); return Array.isArray(data) ? data.length : (data ? 1 : 0); }
      } catch {}
      return 0;
    };
    (async () => {
      const creators = await fetchStat('/creators');
      const categories = await fetchStat('/categories');
      const testimonials = await fetchStat('/testimonials');
      const contacts = await fetchStat('/contacts');
      const heroes = await fetchStat('/hero');
      setStats({ creators, categories, testimonials, contacts, heroes: heroes ? 1 : 0 });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: 'Creators', value: stats.creators, icon: Users, color: '#4a1d7a' },
    { label: 'Categories', value: stats.categories, icon: Image, color: '#7c3aed' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: '#c026d3' },
    { label: 'Contacts', value: stats.contacts, icon: Mail, color: '#16a34a' },
  ];

  return (
    <div>
      <h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.03em', color: '#4a1d7a', marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: '#6b556e', marginBottom: 28 }}>Overview of your website content.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#6b556e', letterSpacing: '0.02em' }}>{c.label}</span>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                <c.icon size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4a1d7a', letterSpacing: '-0.03em' }}>{loading ? '—' : c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
