import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer style={{ background:'#2a1045', color:'#fff', padding: '60px 0 24px' }}>
      <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:40, marginBottom:40 }}>
        <div>
          <div style={{ fontWeight:900, fontSize:'1.6rem', letterSpacing:'-0.04em', marginBottom:12 }}>
            HPEDIT<span style={{ color:'var(--purple-soft)' }}>+</span>
          </div>
          <p style={{ color:'#ccc', fontSize:'0.9rem', lineHeight:1.6, maxWidth:280 }}>Creativity deserves a beautiful home.<br/>Built for creators, by people who believe in you.</p>
          <div style={{ display:'flex', gap:12, marginTop:16 }}>
            {['YouTube','Instagram','TikTok','X','LinkedIn','Pinterest'].map(s=> (
              <a key={s} href="#" style={{ width:36, height:36, borderRadius:'50%', background:'rgba(255,255,255,0.08)', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'#fff', textDecoration:'none', fontSize:'0.75rem', fontWeight:600 }}>{s[0]}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ fontWeight:700, marginBottom:14, fontSize:'0.95rem' }}>Platform</h4>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8, fontSize:'0.9rem', color:'#ccc' }}>
            {['Discover Creators','For Creators','About','Help & Support'].map(i=> <li key={i}><Link to="/discover" style={{ color:'#ccc', textDecoration:'none' }}>{i}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight:700, marginBottom:14, fontSize:'0.95rem' }}>Legal</h4>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8, fontSize:'0.9rem', color:'#ccc' }}>
            {['Privacy Policy','Terms & Conditions','Cookie & Analytics Notice','Content Guidelines','DMCA','Takedown & Corrections'].map(i=> <li key={i}><a href="#" style={{ color:'#ccc', textDecoration:'none' }}>{i}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight:700, marginBottom:14, fontSize:'0.95rem' }}>Company</h4>
          <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8, fontSize:'0.9rem', color:'#ccc' }}>
            {['About HPEDIT','Our Mission','Partnerships','Visit HPEDIT','Contact Us'].map(i=> <li key={i}><Link to="/about" style={{ color:'#ccc', textDecoration:'none' }}>{i}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 style={{ fontWeight:700, marginBottom:14, fontSize:'0.95rem' }}>Join Our Creator Community</h4>
          <p style={{ fontSize:'0.85rem', color:'#ccc', marginBottom:12 }}>Get updates, inspiration and creator stories straight to your inbox.</p>
          <form onSubmit={e=>{e.preventDefault();}} style={{ display:'flex', gap:8, alignItems:'center' }}>
            <input type="email" placeholder="Your email address" style={{ flex:1, padding:'10px 14px', borderRadius:100, border:'none', fontSize:'0.85rem', background:'#fff', color:'var(--text-dark)' }} />
            <button type="submit" style={{ width:40, height:40, borderRadius:'50%', background:'var(--purple)', color:'#fff', border:'none', cursor:'pointer', fontWeight:700 }}>→</button>
          </form>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, fontSize:'0.8rem', color:'#aaa' }}>
        <div>© 2026 HP Edit Enterprise. All rights reserved.</div>
        <div style={{ fontFamily:"'Caveat', cursive", fontSize:'1.1rem' }}>Create · Share · Inspire · Belong</div>
      </div>
    </footer>
  );
}
