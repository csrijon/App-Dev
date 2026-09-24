import { Link } from 'react-router-dom';
export default function Discover() {
  return (
    <div style={{ padding:60 }}>
      <h1 style={{ fontSize:'3rem', marginBottom:12 }} className="Handwritten">Discover</h1>
      <p style={{ maxWidth:600, color:'var(--text-body)' }}>Explore inspiring creators across lifestyle, travel, fitness, art and more.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:18, marginTop:30 }}>
        {[ 'Lifestyle','Travel','Fashion','Fitness','Food','Music','Pets','Art & Design','Business' ].map(c=> (
          <Link key={c} to="/creators" style={{ textDecoration:'none', background:'#fff', padding:24, borderRadius:24, boxShadow:'0 8px 24px rgba(74,29,122,0.08)', color:'var(--text-dark)', fontWeight:700 }}>{c}</Link>
        ))}
      </div>
    </div>
  );
}
