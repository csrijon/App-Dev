import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Footer() {
  const [settings, setSettings] = useState({ siteName: 'HPEDIT+', footerText: 'Creativity deserves a beautiful home.' });
  const [socials, setSocials] = useState([]);
  useEffect(() => {
    fetch(API_URL + '/api/settings').then(r => r.json()).then(d => { if (d) setSettings({ siteName: d.siteName || 'HPEDIT+', footerText: d.footerText || settings.footerText }); });
    fetch(API_URL + '/api/social-links').then(r => r.json()).then(s => { if (Array.isArray(s) && s.length > 0) setSocials(s.filter(x => x.isActive)); });
  }, []);

  return (
    <div>
      <footer style={{ background: '#2a1045', color: '#fff', padding: '60px 0 24px' }}>
        <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.04em', marginBottom: 12 }}>
              <span style={{ fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.04em' }}>{(settings.siteName || 'HPEDIT').replace('+', '').trim()}</span><span style={{ color: 'var(--purple-soft)' }}>+</span>
            </div>
            <p style={{ color: '#fff', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 280 }}>{settings.footerText || 'Creativity deserves a beautiful home.<br />Built for creators, by people who believe in you.'}</p>
            <div className="social-row" style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {socials.length > 0 ? socials.map(s => (
                <a key={s.id} href={s.url} aria-label={s.name} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background .2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name?.charAt(0).toUpperCase()}</span>
                </a>
              )) : [
                { name: 'Instagram', url: '#' },
                { name: 'LinkedIn', url: '#' },
                { name: 'Facebook', url: '#' },
              ].map(s => (
                <a key={s.name} href={s.url} aria-label={s.name} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background .2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name?.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#fff' }}>
              {['Discover Creators', 'For Creators', 'About', 'Help & Support'].map(i => <li key={i}><Link to={i === 'Discover Creators' ? '/discover' : i === 'For Creators' ? '/for-creators' : i === 'About' ? '/about' : '/help'} style={{ color: '#fff', textDecoration: 'none' }}>{i}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#fff' }}>
              {['Privacy Policy', 'Terms & Conditions', 'Cookie & Analytics Notice', 'Content Guidelines', 'DMCA', 'Takedown & Corrections'].map(i => <li key={i}><Link to={i === 'Privacy Policy' ? '/privacy' : i === 'Terms & Conditions' ? '/terms' : i === 'Cookie & Analytics Notice' ? '/cookies' : i === 'Content Guidelines' ? '/content-guidelines' : i === 'DMCA' ? '/dmca' : i === 'Takedown & Corrections' ? '/takedown' : '#'} style={{ color: '#fff', textDecoration: 'none' }}>{i}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#fff' }}>
              {['About HPEDIT', 'Our Mission', 'Partnerships', 'Contact Us'].map(i => <li key={i}><Link to={i === 'About HPEDIT' || i === 'Contact Us' ? '/about' : '#'} style={{ color: '#fff', textDecoration: 'none' }}>{i}</Link></li>)}
              <li><a href="https://www.hpedit.com/" style={{ color: '#fff', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Visit HPEDIT →</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Join Our Creator Community</h4>
            <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: 12 }}>Get updates, inspiration and creator stories straight to your inbox.</p>
            <form className="footer-email-form" onSubmit={e => { e.preventDefault(); }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '10px 14px', borderRadius: 100, fontSize: '0.85rem', background: '#fff', color: '#4a1d7a', border: '1.5px solid #4a1d7a' }} />
              <button type="submit" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><ArrowForwardIcon fontSize="small" /></button>
            </form>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: '0.8rem', color: '#fff' }}>
          <div className='container'>
            <div>© 2026 HP Edit Enterprise. All rights reserved.</div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>Create · Share · Inspire · Belong</div>
          </div>
        </div>
      </footer>
      <style>{`
.footer-email-form input::placeholder { color: #4a1d7a; opacity: 1; }
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style>
    </div>
  );
}
