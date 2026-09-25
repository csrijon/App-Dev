import { Link } from 'react-router-dom';
import { Zap, Globe, ShieldCheck, Clock, Code2, Smartphone, Sparkles, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="ab-main" style={{ color: '#2a1a36', maxWidth: 1100, margin: '0 auto', padding: '32px 24px 100px', fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section className="ab-hero" style={{ position: 'relative', padding: '40px 24px 60px', textAlign: 'left', maxWidth: 1100, margin: '0 auto', overflow: 'hidden' }}>
        <div className="ab-blob ab-blob-1" aria-hidden="true" />
        <h1 className="ab-title" style={{ fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, fontFamily: "'Inter', sans-serif", position: 'relative' }}>About HP Edit</h1>
        <p style={{ fontSize: 22, color: '#5d3a7a', fontWeight: 500, maxWidth: 640, margin: '24px 0 0', lineHeight: 1.5, textAlign: 'left', position: 'relative' }}>
          Not isolated deliverables — a unified business operating system. We build integrated platforms that attract, convert, sell, serve, operate, and scale.
        </p>
        <Link to="/apply" className="ab-btn-dark" style={{ display: 'inline-block', marginTop: 28, position: 'relative' }}>Apply for a free portfolio →</Link>
      </section>


      {/* Story + Capabilities */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
        <div>
          <h2 className="ab-h2" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>An engineering studio in Kolkata</h2>
          <p style={{ color: '#5d3a7a', lineHeight: 1.7, fontSize: 16, marginBottom: 16 }}>
            Based at Awfis Siddha Esplanade, HP Edit Enterprise builds elite digital infrastructure for creators and businesses. Our work spans inbound engines, persuasive web platforms, sales funnels, 24/7 AI agents, workflow automation, and cloud or mobile scaling.
          </p>
          <p style={{ color: '#5d3a7a', lineHeight: 1.7, fontSize: 16 }}>
            Technical stacks feature Next.js 15, Flutter, Gemini 2.0, and official Meta WhatsApp Cloud APIs. We promise 100% IP handover and sub-50ms edge latency through autonomous pipeline architectures.
          </p>
        </div>
        <div className="ab-capabilities-card">
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: '#2a1a36' }}>Core capabilities</h3>
          <div style={{ display: 'grid', gap: 4 }}>
            {[
              { icon: Globe, label: 'Inbound engines' },
              { icon: Zap, label: 'Persuasive web platforms' },
              { icon: Sparkles, label: 'Sales funnels' },
              { icon: Clock, label: '24/7 AI agents' },
              { icon: Code2, label: 'Workflow automation' },
              { icon: Smartphone, label: 'Cloud / mobile scaling' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="ab-capability-row">
                <span className="ab-capability-icon"><Icon size={16} /></span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="ab-stack" style={{ color: '#fff', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>Modern stack</h2>
        <p style={{ color: '#ccc0e0', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.6 }}>Built on technology that scales from edge to cloud.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 800, margin: '0 auto' }}>
          {['Next.js 15', 'Flutter', 'Gemini 2.0', 'Meta WhatsApp Cloud API', '100% IP handover'].map(t => (
            <span key={t} className="ab-stack-pill">{t}</span>
          ))}
        </div>
      </section>

      {/* Portfolios */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px' }}>
        <h2 className="ab-h2" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' }}>Creator portfolios</h2>
        <p style={{ textAlign: 'center', color: '#7a3eb8', fontWeight: 600, marginBottom: 48 }}>Real platforms, real outcomes.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            { title: 'OmniAI', sub: 'Logistics agents', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
            { title: 'ApexFlow', sub: 'Financial portals', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
            { title: 'PulseConnect', sub: 'Health ecosystems', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
            { title: 'HyperScale', sub: 'WhatsApp commerce', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80' },
          ].map(p => (
            <div key={p.title} className="ab-portfolio-card">
              <div className="ab-portfolio-img" style={{ height: 170, overflow: 'hidden' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#2a1a36' }}>{p.title}</h3>
                <p style={{ color: '#5d3a7a', fontWeight: 500, fontSize: 14 }}>{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, textAlign: 'center' }}>
        <div className="ab-trust-card">
          <ShieldCheck size={36} color="#7a3eb8" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>100% IP handover</h3>
          <p style={{ color: '#5d3a7a', fontSize: 14 }}>You own everything we build.</p>
        </div>
        <div className="ab-trust-card">
          <Zap size={36} color="#7a3eb8" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Sub-50ms edge latency</h3>
          <p style={{ color: '#5d3a7a', fontSize: 14 }}>Autonomous pipeline architecture.</p>
        </div>
      </section>

      {/* Location */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 100px', textAlign: 'center' }}>
        <h2 className="ab-h2" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Location</h2>
        <p style={{ color: '#7a3eb8', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Kolkata, West Bengal, India</p>
        <hr style={{ border: 0, height: 1, background: '#ddd5e8', marginBottom: 24, maxWidth: 200, margin: '0 auto 24px' }} />
        <p style={{ color: '#5d3a7a', lineHeight: 1.7, fontSize: 16, maxWidth: 540, margin: '0 auto' }}>
          HP Edit Enterprise · Awfis Siddha Esplanade · 700013<br />
          <span style={{ color: '#7a3eb8', fontWeight: 600 }}>info@hpedit.com</span>
        </p>
      </section>

      {/* CTA */}
      <section className="ab-cta" style={{ textAlign: 'center', padding: '60px 24px', color: '#fff', maxWidth: 720, margin: '0 auto 100px' }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>Let&apos;s build together</h3>
        <p style={{ color: '#ccc0e0', marginBottom: 24, lineHeight: 1.6 }}>Contact: info@hpedit.com · Kolkata, India</p>
        <Link to="/" className="ab-btn-light">Back to site →</Link>
      </section>

      <style>{`
        /* ---------- hero blob ---------- */
        .ab-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.3;
          z-index: 0;
          pointer-events: none;
        }
        .ab-blob-1 {
          width: 340px; height: 340px;
          background: #c9a6ec;
          top: -140px; right: -80px;
        }

        /* ---------- buttons ---------- */
        .ab-btn-dark {
          padding: 14px 32px;
          background: #2a1a36;
          color: #fff;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 8px 20px rgba(42,26,54,0.18);
        }
        .ab-btn-dark:hover {
          background: #3d2650;
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(42,26,54,0.28);
        }
        .ab-btn-light {
          display: inline-block;
          padding: 14px 32px;
          background: #7a3eb8;
          color: #fff;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 8px 20px rgba(122,62,184,0.25);
        }
        .ab-btn-light:hover {
          background: #8f52cc;
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(122,62,184,0.35);
        }

        /* ---------- capabilities card ---------- */
        .ab-capabilities-card {
          background: #fff;
          padding: 28px;
          border-radius: 24px;
          border: 1px solid #eee7f6;
          box-shadow: 0 8px 28px rgba(74,29,122,0.08);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .ab-capabilities-card:hover {
          box-shadow: 0 16px 40px rgba(74,29,122,0.14);
        }
        .ab-capability-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
          color: #2a1a36;
          font-size: 15px;
          padding: 8px 6px;
          border-radius: 12px;
          transition: background 0.2s ease, padding-left 0.2s ease;
        }
        .ab-capability-row:hover {
          background: #f8f2fd;
          padding-left: 10px;
        }
        .ab-capability-icon {
          width: 30px; height: 30px;
          flex-shrink: 0;
          border-radius: 9px;
          background: #f2e8fa;
          color: #7a3eb8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* ---------- stack section ---------- */
        .ab-stack {
          background: linear-gradient(135deg, #2a1a36, #3d2650);
          border-radius: 32px;
        }
        .ab-stack-pill {
          padding: 10px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.14);
          font-weight: 600;
          font-size: 15px;
          color: #ddd0e8;
          background: rgba(255,255,255,0.05);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .ab-stack-pill:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.28);
          transform: translateY(-2px);
        }

        /* ---------- portfolio cards ---------- */
        .ab-portfolio-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #eee7f6;
          box-shadow: 0 8px 28px rgba(74,29,122,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ab-portfolio-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(74,29,122,0.18);
        }
        .ab-portfolio-img img { transition: transform 0.5s ease; }
        .ab-portfolio-card:hover .ab-portfolio-img img { transform: scale(1.07); }

        /* ---------- trust cards ---------- */
        .ab-trust-card {
          background: #fff;
          padding: 24px;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(74,29,122,0.08);
          border: 1px solid #eee7f6;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ab-trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(74,29,122,0.14);
        }

        /* ---------- final CTA ---------- */
        .ab-cta {
          // background: linear-gradient(135deg, #2a1a36, #4a1d7a);
          border-radius: 28px;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 900px) {
          .ab-main { padding: 28px 20px 80px !important; }
        }

        @media (max-width: 768px) {
          .ab-hero { padding: 28px 16px 48px !important; }
          .ab-stack { padding: 56px 20px !important; border-radius: 24px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .ab-title { font-size: clamp(32px, 9vw, 48px) !important; }
          .ab-h2 { font-size: 22px !important; }
          .ab-blob-1 { display: none; }
          .ab-cta { padding: 44px 20px !important; border-radius: 22px !important; }
        }

        @media (max-width: 400px) {
          .ab-main { padding: 20px 14px 60px !important; }
        }
      `}</style>
    </main>
  );
}