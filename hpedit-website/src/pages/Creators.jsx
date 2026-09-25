import { Link } from 'react-router-dom';
export default function CreatorsPage() {
  return (
    <div style={{ padding:60 }}>
      <h1 style={{ fontSize:'3rem', marginBottom:12 }}>Creators</h1>
      <p style={{ color:'var(--text-body)', maxWidth:550 }}>Featured portfolio examples from real creators across wellness, fitness, travel, lifestyle and music.</p>
      <div style={{ display:'flex', gap:12, marginTop:24 }}>
        <Link to="/" className="btn-primary">Back Home</Link>
        <Link to="/for-creators" className="btn-secondary">Become a Creator</Link>
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