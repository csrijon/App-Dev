const items = [
  { icon:'👥', t:'Free', d:'Selected creator portfolios' },
  { icon:'🌐', t:'3 modes', d:'Public · Password · Hidden' },
  { icon:'💖', t:'Creator-first', d:'Built around your story' },
  { icon:'⭐', t:'1:1', d:'One creator, one portfolio' },
];
export default function FeatureStrip() {
  return (
    <section style={{ background:'linear-gradient(180deg, #f3ecfb 0%, #ede6f6 100%)', padding: '40px 0' }}>
      <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:20 }}>
        {items.map(i=> (
          <div key={i.t} style={{ display:'flex', gap:14, alignItems:'center', background:'#fff', padding:22, borderRadius:24, boxShadow:'0 6px 20px rgba(74,29,122,0.06)' }}>
            <div style={{ fontSize:28, width:48, height:48, borderRadius:'50%', background:'var(--lavender)', display:'flex', alignItems:'center', justifyContent:'center' }}>{i.icon}</div>
            <div>
              <div style={{ fontWeight:800, fontSize:'1.05rem' }}>{i.t}</div>
              <div style={{ fontSize:'0.85rem', color:'var(--text-muted)' }}>{i.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
