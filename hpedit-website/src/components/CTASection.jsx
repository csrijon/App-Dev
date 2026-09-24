export default function CTASection() {
  return (
    <section style={{ position:'relative', padding:'120px 0', overflow:'hidden' }}>
      <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=80" alt="Nature" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, opacity:0.85 }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(74,29,122,0.82), rgba(74,29,122,0.55))', zIndex:1 }} />
      <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center', color:'#fff' }}>
        <h2 style={{ fontSize:'clamp(2.2rem, 5vw, 3.8rem)', fontWeight:900, marginBottom:24, letterSpacing:'-0.05em', lineHeight:1.05 }}>Ready to Build Your<br/>Online Home?</h2>
        <a href="#" className="btn-primary" style={{ background:'#fff', color:'var(--purple-deep)', boxShadow:'0 8px 24px rgba(0,0,0,0.15)' }}>Create Your Portfolio →</a>
        <div style={{ display:'flex', gap:24, justifyContent:'center', marginTop:40, flexWrap:'wrap', fontFamily:"'Caveat', cursive", fontSize:'1.4rem' }}>
          <span>Dream</span><span>Create</span><span>Share</span><span>Repeat ♡</span>
        </div>
        <div style={{ marginTop:24, fontFamily:"'Caveat', cursive", fontSize:'1.2rem', opacity:0.9 }}>More Creators · A Brighter Tomorrow</div>
      </div>
    </section>
  );
}
