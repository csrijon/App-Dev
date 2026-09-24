import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(74,29,122,0.06)' }}>
      <nav className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:72, gap:24 }}>
        <Link to="/" style={{ fontWeight:900, fontSize:'1.6rem', letterSpacing:'-0.04em', color:'var(--purple-deep)', textDecoration:'none', fontFamily:"'Inter', sans-serif" }}>
          HPEDIT<span style={{ color:'var(--purple-soft)', marginLeft:2 }}>+</span>
        </Link>
        <div style={{ display:'flex', gap:28, alignItems:'center', fontWeight:500, fontSize:'0.92rem', color:'var(--text-dark)' }} className="nav-links">
          <Link to="/discover" style={{ textDecoration:'none', color:'inherit', transition:'color .2s' }}>Discover</Link>
          <Link to="/for-creators" style={{ textDecoration:'none', color:'inherit', transition:'color .2s' }}>For Creators</Link>
          <Link to="/about" style={{ textDecoration:'none', color:'inherit', transition:'color .2s' }}>About</Link>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14, flex:1, justifyContent:'flex-end' }}>
          <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
            <input type="text" placeholder="Search creators, skills, or interests..." style={{ border:'1px solid rgba(74,29,122,0.15)', borderRadius:'100px', padding:'8px 36px 8px 16px', fontSize:'0.85rem', width:240, outline:'none', background:'#fff', color:'var(--text-dark)' }} />
            <Search size={16} style={{ position:'absolute', right:10, color:'var(--purple-soft)' }} />
          </div>
          <Link to="/for-creators" className="btn-primary" style={{ fontSize:'0.85rem', padding:'8px 20px' }}>Get Started →</Link>
          <button onClick={()=>setOpen(!open)} style={{ background:'none', border:'none', cursor:'pointer', display:'none' }} className="hamburger" aria-label="Menu"><Menu size={26} /></button>
        </div>
      </nav>
      {open && (
        <div style={{ background:'#fff', borderTop:'1px solid rgba(74,29,122,0.08)', padding:20, display:'flex', flexDirection:'column', gap:14 }} className="mobile-menu">
          <button onClick={()=>setOpen(false)} style={{ alignSelf:'flex-end', background:'none', border:'none', cursor:'pointer' }}><X size={22} /></button>
          <Link to="/discover" onClick={()=>setOpen(false)} style={{ textDecoration:'none', color: 'var(--text-dark)', fontWeight:600 }}>Discover</Link>
          <Link to="/for-creators" onClick={()=>setOpen(false)} style={{ textDecoration:'none', color: 'var(--text-dark)', fontWeight:600 }}>For Creators</Link>
          <Link to="/about" onClick={()=>setOpen(false)} style={{ textDecoration:'none', color: 'var(--text-dark)', fontWeight:600 }}>About</Link>
        </div>
      )}
      <style>{`
        @media (max-width: 1020px) { .nav-links { display:none; } .hamburger { display:block !important; } input[placeholder] { width:140px !important; } }
        @media (max-width: 640px) { input[placeholder] { display:none; } }
      `}</style>
    </header>
  );
}
