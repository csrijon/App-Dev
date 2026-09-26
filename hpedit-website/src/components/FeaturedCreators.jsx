import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function FeaturedCreators() {
  const [creators, setCreators] = useState([]);
  useEffect(() => {
    fetch(API_URL + '/api/creators').then(r => r.json()).then(setCreators);
    const socket = io(API_URL);
    socket.on('creator:deleted', () => fetch(API_URL + '/api/creators').then(r => r.json()).then(setCreators));
    return () => socket.disconnect();
  }, []);
  return (
    <section id="FeaturedCreators" style={{ background: '#fff', padding: '60px 0' }}>
      <div className="container featured-creators-section">
        <div className="featured-creators-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ color: '#4a1d7a' }}>Featured Creators</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>Illustrative creator directions. Real portfolio possibilities.</p>
          </div>
          <a href="/discover" style={{ textDecoration: 'none', color: 'var(--purple-deep)', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Explore All Creators <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {creators.map(c => (
            <a href="#" key={c.id || c.name} style={{ textDecoration: 'none', position: 'relative', borderRadius: 24, overflow: 'hidden', height: 420, display: 'block', boxShadow: '0 8px 30px rgba(74,29,122,0.12)' }}>
              <img src={c.imageUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(74,29,122,0.85) 0%, rgba(74,29,122,0.2) 60%, rgba(74,29,122,0.05) 100%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 22, left: 20, zIndex: 2, color: '#fff' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 4, color: '#fff' }}>{c.name}</h3>
                <p style={{ fontSize: '0.82rem', opacity: 0.9, color: '#fff' }}>{c.sub || 'Portfolio example'}</p>
              </div>
              <div style={{ position: 'absolute', bottom: 22, right: 20, zIndex: 2 }}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff', color: 'var(--purple-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <ArrowForwardIcon sx={{ fontSize: 22 }} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style>
    </section>
  );
}
