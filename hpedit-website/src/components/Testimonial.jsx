import { useState } from 'react';
import sunsetimage from "../assets/sunset.png"
export default function Testimonial() {
  const [i, setI] = useState(0);
  const quotes = [
    { text:'A portfolio should feel like your own space — personal, polished and unmistakably yours.', name:'Riya Kapoor', role:'Yoga & Wellness Creator', img:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }
  ];
  return (
    <section style={{ background:'#f6f2fa', padding:'25px 0' }}>
      <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
        <div style={{ background:'#fff', borderRadius:28, padding:36, boxShadow:'0 12px 40px rgba(74,29,122,0.08)' }}>
          <h2 style={{ fontSize:'1.6rem', fontWeight:800, letterSpacing:'-0.03em', marginBottom:16, lineHeight:1.2 }}>
            “{quotes[i].text}”
          </h2>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <img src={quotes[i].img} alt={quotes[i].name} style={{ width:56, height:56, borderRadius:'50%', objectFit:'cover', boxShadow:'0 4px 12px rgba(74,29,122,0.15)' }} />
            <div><div style={{ fontWeight:700 }}>{quotes[i].name}</div><div style={{ fontSize:'0.82rem', color:'var(--text-muted)' }}>{quotes[i].role}</div></div>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            {[0,1,2].map(n=> <button key={n} onClick={()=>setI(n)} style={{ width:10, height:10, borderRadius:'50%', border:'none', background: n===i?'var(--purple-deep)':'var(--lavender)', cursor:'pointer' }} />)}
          </div>
        </div>
        <div style={{ position:'relative' }}>
          <img src={sunsetimage} alt="Travel" style={{ borderRadius:28, width:'100%', height:"238px", objectFit:'fill', }} />
          {/* <div style={{ position:'absolute', bottom:30, left:30, fontFamily:"'Caveat', cursive", fontSize:'1.8rem', color:'#fff', background:'rgba(74,29,122,0.75)', padding:'10px 18px', borderRadius:16, backdropFilter:'blur(4px)', lineHeight:1.2 }}>
            New Places<br/>New Stories<br/>Same You ♡
          </div> */}
        </div>
      </div>
      <style>{`@media (max-width: 1020px) { .container { display:block !important; } }`}</style>
    </section>
  );
}
