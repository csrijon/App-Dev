import { Link } from 'react-router-dom';
export default function ForCreators() {
  return (
    <div style={{ padding:60, background:'linear-gradient(180deg,#f3ecfb,#fff)' }}>
      <h1 style={{ fontSize:'3rem', fontWeight:900, marginBottom:16 }}>For Creators</h1>
      <p style={{ maxWidth:600, color:'var(--text-body)', fontSize:'1.05rem' }}>Build your beautiful online home. Share your story with the world — no code required.</p>
      <div style={{ marginTop:30, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:18 }}>
        {['Portfolio Builder','Custom Themes','Analytics','Social Sharing','Collaboration Tools'].map(t=> (
          <div key={t} style={{ background:'#fff', padding:24, borderRadius:24, boxShadow:'0 8px 30px rgba(74,29,122,0.08)' }}><h3 style={{ fontWeight:800, marginBottom:8 }}>{t}</h3><p style={{ fontSize:'0.9rem', color:'var(--text-muted)' }}>Everything you need to grow as a creator.</p></div>
        ))}
      </div>
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