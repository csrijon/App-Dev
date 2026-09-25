import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div>
  
      <footer style={{ background: '#2a1045', color: '#fff', padding: '60px 0 24px' }}>
        <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.04em', marginBottom: 12 }}>
              HPEDIT<span style={{ color: 'var(--purple-soft)' }}>+</span>
            </div>
            <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 280 }}>Creativity deserves a beautiful home.<br />Built for creators, by people who believe in you.</p>
            <div className="social-row" style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {[
                { name: 'YouTube', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg> },
                { name: 'Instagram', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg> },
                { name: 'TikTok', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> },
                { name: 'X', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" /></svg> },
                { name: 'LinkedIn', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                { name: 'Pinterest', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="8" x2="12" y2="21" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></svg> }
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background .2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>{s.svg}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#ccc' }}>
              {['Discover Creators', 'For Creators', 'About', 'Help & Support'].map(i => <li key={i}><Link to="/discover" style={{ color: '#ccc', textDecoration: 'none' }}>{i}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#ccc' }}>
              {['Privacy Policy', 'Terms & Conditions', 'Cookie & Analytics Notice', 'Content Guidelines', 'DMCA', 'Takedown & Corrections'].map(i => <li key={i}><Link to={i === 'Privacy Policy' ? '/privacy' : i === 'Terms & Conditions' ? '/terms' : i === 'Cookie & Analytics Notice' ? '/cookies' : i === 'Content Guidelines' ? '/content-guidelines' : i === 'DMCA' ? '/dmca' : i === 'Takedown & Corrections' ? '/takedown' : '#'} style={{ color: '#ccc', textDecoration: 'none' }}>{i}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.9rem', color: '#ccc' }}>
              {['About HPEDIT', 'Our Mission', 'Partnerships', 'Contact Us'].map(i => <li key={i}><Link to={i === 'About HPEDIT' || i === 'Contact Us' ? '/about' : '#'} style={{ color: '#ccc', textDecoration: 'none' }}>{i}</Link></li>)}
              <li><a href="https://www.hpedit.com/" style={{ color: '#ccc', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">Visit HPEDIT →</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 14, fontSize: '0.95rem' }}>Join Our Creator Community</h4>
            <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: 12 }}>Get updates, inspiration and creator stories straight to your inbox.</p>
            <form className="footer-email-form" onSubmit={e => { e.preventDefault(); }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '10px 14px', borderRadius: 100, border: 'none', fontSize: '0.85rem', background: '#fff', color: 'var(--text-dark)' }} />
              <button type="submit" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}>→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: '0.8rem', color: '#aaa' }}>
          <div className='container' >
            <div>© 2026 HP Edit Enterprise. All rights reserved.</div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>Create · Share · Inspire · Belong</div>
          </div>
        </div>
      </footer>
    </div>
  );

<style>{`
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style>
}