import { Link } from 'react-router-dom';
export default function About() {
  return (
    <div style={{ padding:60 }}>
      <h1 style={{ fontSize:'3rem', fontWeight:900, marginBottom:12 }}>About HPEDIT</h1>
      <p style={{ maxWidth:600, color:'var(--text-body)', fontSize:'1.05rem' }}>HPEDIT is a creator portfolio platform built for people who believe in beautiful, personal spaces online.</p>
      <Link to="/" className="btn-primary" style={{ marginTop:24, display:'inline-block' }}>Back to Home</Link>
    </div>
  );
}
