import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const DIRECTIONS = [
  { label: 'Editorial', desc: 'Bold storytelling, campaign energy and magazine-style composition.', img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80' },
  { label: 'Professional', desc: 'Clean authority, clear hierarchy and refined credibility.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80' },
  { label: 'Travel', desc: 'Location-led narratives with immersive visual rhythm.', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80' },
  { label: 'Lifestyle', desc: 'Everyday elegance, personal context and warm intimacy.', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80' },
  { label: 'Music & Culture', desc: 'Sound-led identity, artistic expression and cultural depth.', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' },
  { label: 'Fashion', desc: 'Editorial framing, texture play and curated aesthetic.', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80' },
  { label: 'Fitness', desc: 'Progress visualized, discipline shown, results proven.', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80' },
  { label: 'Food', desc: 'Sensory detail, process transparency and appetite-driven design.', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { label: 'Business', desc: 'Results-led layout, proof points and strategic clarity.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
];

const CONSISTENT = [
  { num: '01', title: 'Creator-first', line: 'Built around the person, not a template library.' },
  { num: '02', title: 'Mobile-first', line: 'Optimized for every screen from phone to desktop.' },
  { num: '03', title: 'Proof-rich', line: 'Show real work, real engagement, real results.' },
  { num: '04', title: 'Controlled by you', line: 'Own your brand, your content, your audience.' },
];

export default function Discover() {
  return (
    <>
    <main className="disc-main" style={{ color: '#2a1a36', maxWidth: 1100, margin: '0 auto', padding: '32px 24px 100px', fontFamily: "'Inter', sans-serif" }}>

      {/* ---------- HERO ---------- */}
      <section className="disc-hero" style={{ position: 'relative', padding: '32px 24px 60px', maxWidth: 1100, margin: '0 auto', textAlign: 'center', overflow: 'hidden' }}>
        <div className="disc-blob disc-blob-1" aria-hidden="true" />
        <div className="disc-blob disc-blob-2" aria-hidden="true" />

        <Link to="/" style={{ textDecoration: 'none', color: '#7a3eb8', fontWeight: 600, fontSize: 14, letterSpacing: 1, position: 'relative' }}>← Home</Link>
        <h1 className="disc-title" style={{ fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36', lineHeight: 1.05, fontFamily: "'Inter', sans-serif", position: 'relative' }}>PORTFOLIO SHOWCASE</h1>
        <p style={{ fontSize: 22, color: '#5d3a7a', fontWeight: 500, marginBottom: 48, position: 'relative' }}>There is no single creator look.</p>

        <div className="disc-search" style={{ maxWidth: 640, margin: '0 auto 24px', position: 'relative' }}>
          <input type="text" placeholder="Search creators, skills, interests..." style={{ width: '100%', padding: '14px 48px 14px 20px', borderRadius: 50, border: '1px solid #ddd5e8', fontSize: 16, outline: 'none', boxShadow: '0 4px 14px rgba(122,62,184,0.08)', background: '#fff', color: '#2a1a36' }} />
          <Search size={20} style={{ position: 'absolute', right: 18, top: 12, color: '#7a3eb8', pointerEvents: 'none' }} />
        </div>

        <div className="disc-tags" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          {['Editorial','Professional','Travel','Lifestyle','Music & Culture','Fashion','Fitness','Food','Business'].map(c => (
            <span key={c} className="disc-tag">{c}</span>
          ))}
        </div>

        <p style={{ marginTop: 28, color: '#7a3eb8', fontWeight: 600, fontSize: 15, position: 'relative' }}>Built around the person, not a template library.</p>
      </section>


      {/* ---------- WHAT STAYS CONSISTENT ---------- */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 100px' }}>
        <h2 className="disc-h2" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10, textAlign: 'center' }}>WHAT STAYS CONSISTENT</h2>
        <p style={{ textAlign: 'center', color: '#7a3eb8', fontWeight: 600, marginBottom: 48 }}>Different style. Same standard.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {CONSISTENT.map(i => (
            <div key={i.num} className="disc-consistent-card">
              <span style={{ fontSize: 32, fontWeight: 900, color: '#ddd0e8', display: 'block', marginBottom: 8 }}>{i.num}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{i.title}</h3>
              <p style={{ color: '#5d3a7a', lineHeight: 1.5 }}>{i.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- VISUAL DIRECTIONS ---------- */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 100px' }}>
        <h2 className="disc-h2-sm" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center', color: '#2a1a36' }}>Visual Directions</h2>
        <p style={{ textAlign: 'center', color: '#7a3eb8', fontWeight: 600, fontSize: 16, marginBottom: 40 }}>Built around the person, not a template library.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {DIRECTIONS.map(d => (
            <div key={d.label} className="discover-card">
              <div className="discover-card-img" style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                <img src={d.img} alt={d.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 14px', background: 'linear-gradient(to top, rgba(42,26,54,0.8), transparent)' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{d.label}</h3>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: 15, color: '#5d3a7a', lineHeight: 1.55 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- EXPLORE BY CATEGORY ---------- */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 100px' }}>
        <h2 className="disc-h2" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24 }}>Explore by category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
          {['Lifestyle','Travel','Fashion','Fitness','Food','Music','Pets','Art & Design','Business'].map(c => (
            <Link key={c} to="#" className="disc-category-card">
              <span>{c}</span>
              <ArrowRight size={18} className="disc-category-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="disc-cta">
        <h3 style={{ fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12, color: '#fff' }}>Ready to showcase?</h3>
        <p style={{ color: '#e6d9f5', marginBottom: 24, fontSize: 16 }}>Join creators building real, personal portfolio sites.</p>
        <Link to="#" className="disc-cta-btn">Get Started →</Link>
        <div style={{ marginTop: 40, fontSize: 13, color: '#d9c8ec' }}>© 2026 HP Edit Enterprise</div>
      </section>

      <style>{`
        /* ---------- hero decorative blobs ---------- */
        .disc-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          z-index: 0;
          pointer-events: none;
        }
        .disc-blob-1 {
          width: 320px; height: 320px;
          background: #c9a6ec;
          top: -120px; left: -60px;
        }
        .disc-blob-2 {
          width: 260px; height: 260px;
          background: #f3b6d8;
          top: -60px; right: -40px;
        }

        /* ---------- search focus ---------- */
        .disc-search input:focus {
          border-color: #b18bdd;
          box-shadow: 0 0 0 4px rgba(122,62,184,0.14), 0 4px 14px rgba(122,62,184,0.08);
        }

        /* ---------- filter tags ---------- */
        .disc-tag {
          padding: 8px 16px;
          border-radius: 50px;
          background: #fff;
          border: 1px solid #ddd5e8;
          font-size: 14px;
          font-weight: 500;
          color: #5d3a7a;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(74,29,122,0.04);
          transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        .disc-tag:hover {
          background: #7a3eb8;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122,62,184,0.25);
        }

        /* ---------- consistent cards ---------- */
        .disc-consistent-card {
          background: #fff;
          padding: 28px;
          border-radius: 24px;
          box-shadow: 0 8px 28px rgba(74,29,122,0.08);
          border: 1px solid #eee7f6;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .disc-consistent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(74,29,122,0.14);
        }

        /* ---------- visual direction cards ---------- */
        .discover-card {
          background: #fff;
          border-radius: 28px;
          border: 1px solid #eee7f6;
          box-shadow: 0 12px 32px rgba(74,29,122,0.10);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .discover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(74,29,122,0.18);
          border-color: #d9c4ef;
        }
        .discover-card:hover .discover-card-img img {
          transform: scale(1.06);
        }
        .discover-card-img img {
          transition: transform 0.5s ease;
        }

        /* ---------- category tiles ---------- */
        .disc-category-card {
          text-decoration: none;
          background: #fff;
          padding: 28px;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(74,29,122,0.08);
          color: #2a1a36;
          font-weight: 700;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .disc-category-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          color: #7a3eb8;
          flex-shrink: 0;
        }
        .disc-category-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(74,29,122,0.16);
          border-color: #e2d2f2;
          color: #7a3eb8;
        }
        .disc-category-card:hover .disc-category-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ---------- final CTA banner ---------- */
        .disc-cta {
          text-align: center;
          padding: 56px 32px;
          margin-top: 20px;
          border-radius: 32px;
          background: linear-gradient(135deg, #4a1d7a, #7a3eb8);
        }
        .disc-cta-btn {
          display: inline-block;
          padding: 14px 32px;
          background: #fff;
          color: #7a3eb8;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .disc-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.22);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 900px) {
          .disc-main { padding: 28px 20px 80px !important; }
        }

        @media (max-width: 768px) {
          .disc-hero { padding: 24px 16px 48px !important; }
          .disc-consistent-card, .discover-card-img + div, .disc-category-card { padding: 22px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .disc-title { font-size: clamp(32px, 9vw, 48px) !important; margin: 18px 0 10px !important; }
          .disc-tags { gap: 6px !important; }
          .disc-tag { padding: 6px 12px !important; font-size: 13px !important; }
          .disc-h2 { font-size: 24px !important; }
          .disc-h2-sm { font-size: 21px !important; }
          .disc-cta { padding: 40px 20px !important; border-radius: 24px !important; }
          .disc-blob-1, .disc-blob-2 { display: none; }
        }

        @media (max-width: 400px) {
          .disc-main { padding: 20px 14px 60px !important; }
          .disc-search input { font-size: 15px !important; padding: 12px 42px 12px 16px !important; }
        }
      `}</style>
    </main>
    </>
  );
}