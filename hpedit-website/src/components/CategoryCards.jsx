const cats = [
  { name:'Lifestyle', img:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80' },
  { name:'Travel', img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80' },
  { name:'Fashion', img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80' },
  { name:'Fitness', img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80' },
  { name:'Food', img:'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80' },
  { name:'Music', img:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
  { name:'Pets', img:'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80' },
  { name:'Art & Design', img:'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80' },
  { name:'Business', img:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80' },
];

export default function CategoryCards() {
  return (
    <section
      style={{ background:'#fff', padding:'60px 0 40px' }}
      onMouseEnter={e => {
        const inner = e.currentTarget.querySelector('.scroll-track');
        if (inner) inner.style.animationPlayState = 'paused';
      }}
      onMouseLeave={e => {
        const inner = e.currentTarget.querySelector('.scroll-track');
        if (inner) inner.style.animationPlayState = 'running';
      }}
    >
      <div className="container" style={{ overflowX:'hidden', scrollbarWidth:'none' }}>
        <div
          className="scroll-track"
          style={{
            display:'flex',
            gap:16,
            minWidth:'max-content',
            animation:'scrollLeft 30s linear infinite',
            willChange:'transform',
          }}
        >
          {[...cats, ...cats].map((c, i) => (
            <a href="#" key={c.name + '-' + i} style={{ textDecoration:'none', position:'relative', width:220, height:300, borderRadius:24, overflow:'hidden', flex:'0 0 auto', boxShadow:'0 8px 24px rgba(74,29,122,0.12)', display:'block' }}>
              <img src={c.img} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(74,29,122,0.85) 0%, rgba(74,29,122,0.35) 50%, rgba(74,29,122,0.15) 100%)', zIndex:1 }} />
              <div style={{ position:'absolute', bottom:20, left:16, zIndex:2, color:'#fff' }}>
                <div style={{ fontWeight:700, fontSize:'1.1rem' }}>{c.name}</div>
              </div>
              <div style={{ position:'absolute', bottom:16, right:16, zIndex:2 }}>
                <span style={{ width:36, height:36, borderRadius:'50%', background:'#fff', color:'var(--purple-deep)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      
    
<style>{`
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style></section>
  );
}
