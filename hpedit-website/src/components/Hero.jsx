import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export default function Hero() {
  const [data, setData] = useState({ title: '', subtitle: '' });
  useEffect(() => {
    fetch(API_URL + '/api/hero').then(r=>r.json()).then(setData);
  }, []);
  return (
    <section style={{ background: 'linear-gradient(180deg, #f3ecfb 0%, #fff 70%)', padding: '100px 0 60px' }}>
      <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:60, alignItems:'center' }}>
        <div>
          <h2 style={{ fontFamily:"'Caveat', cursive", fontSize:'2rem', color:'var(--purple)', lineHeight:1.1, marginBottom:20, fontWeight:700 }} className="Handwritten">Creators<br/>Build<br/>Brighter<br/>Worlds ♡</h2>
          <h1 style={{ fontSize:'clamp(2.6rem, 5vw, 4.2rem)', fontWeight:900, letterSpacing:'-0.05em', color:'#4a1d7a', lineHeight:1.05, marginBottom:16 }}>
            Turn Your Passion Into A<br/><span style={{ color:'var(--purple-deep)', position:'relative' }}>Beautiful<br/>Online Home</span>
          </h1>
          <p style={{ fontSize:'1.15rem', color:'var(--text-body)', maxWidth:480, marginBottom:28 }}>{data?.subtitle || 'Stunning portfolio websites for creators, by creators.'}</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
            <a href="#" className="btn-primary">Create Your Portfolio →</a>
            <a href="#" className="btn-secondary"><span style={{ width:28, height:28, borderRadius:'50%', background:'var(--purple-deep)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12 }}>▶</span> Watch How It Works</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {[
              {t:'Fast & Easy', d:'Get online in minutes', i:'⚡'},
              {t:'Beautiful Designs', d:'Made for creators', i:'🎨'},
              {t:'Works Everywhere', d:'Mobile, tablet, desktop', i:'📱'},
              {t:'100% You', d:'Share your story your way', i:'💜'},
            ].map(x=> (
              <div key={x.t}>
                <div style={{ fontSize:22, marginBottom:6 }}>{x.i}</div>
                <div style={{ fontWeight:700, fontSize:'0.85rem' }}>{x.t}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" alt="Creator" style={{ borderRadius:32, width:'100%', boxShadow:'0 30px 60px rgba(74,29,122,0.18)', objectFit:'cover', height:520 }} />
          <div style={{ position:'absolute', top:20, right:-20, background:'#fff', borderRadius:20, padding:14, boxShadow:'0 12px 30px rgba(74,29,122,0.12)', width:140, zIndex:2 }}>
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba4ee?w=200&q=80" alt="Landscape" style={{ borderRadius:12, width:'100%', height:70, objectFit:'cover', marginBottom:8 }} />
            <div style={{ fontWeight:700, fontSize:'0.85rem' }}>Create</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>Share ideas</div>
          </div>
          <div style={{ position:'absolute', bottom:60, left:-30, background:'#fff', borderRadius:20, padding:14, boxShadow:'0 12px 30px rgba(74,29,122,0.12)', width:140, zIndex:2 }}>
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80" alt="Music" style={{ borderRadius:12, width:'100%', height:70, objectFit:'cover', marginBottom:8 }} />
            <div style={{ fontWeight:700, fontSize:'0.85rem' }}>Inspire</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>Music & sound</div>
          </div>
          <div style={{ position:'absolute', top:140, left:-40, background:'#fff', borderRadius:20, padding:14, boxShadow:'0 12px 30px rgba(74,29,122,0.12)', width:140, zIndex:2 }}>
            <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&q=80" alt="Travel" style={{ borderRadius:12, width:'100%', height:70, objectFit:'cover', marginBottom:8 }} />
            <div style={{ fontWeight:700, fontSize:'0.85rem' }}>Belong</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>Community</div>
          </div>
          <div style={{ position:'absolute', top:10, left:50, fontFamily:"'Caveat', cursive", fontSize:'1.4rem', color:'var(--purple)', background:'#fff', padding:'6px 14px', borderRadius:14, boxShadow:'0 6px 16px rgba(74,29,122,0.1)', transform:'rotate(-3deg)', zIndex:3 }}>
            Same Passion<br/>Bigger Opportunities ♡
          </div>
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
