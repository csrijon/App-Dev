import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const TAGS = ['Privacy','Terms','Cookie & analytics','Disclaimer','Content guidelines','Accessibility','Takedown & corrections','FAQ & support'];
const FAQS = [
  { q: 'Is the creator portfolio really free?', a: 'Yes. The portfolio giveaway itself is offered at no charge to selected creators. Applying costs nothing; extra paid work is discussed separately.' },
  { q: 'Does every application receive a portfolio?', a: 'No. Applications are reviewed by HPEDIT. Selection, design, or timing isn’t guaranteed.' },
  { q: 'What should I upload?', a: 'Provide a strong headshot, optional audience screenshots, campaign/award material, and only items you own or may share.' },
  { q: 'Will anything be published automatically?', a: 'Nothing is automatically made public simply because you submit the form. Submissions are for review only.' },
  { q: 'Can my portfolio be private?', a: 'Public, Password Protected and Hidden modes exist; access can change later.' },
  { q: 'Can I ask for changes or removal?', a: 'Corrections, updates, visibility changes, or takedowns are possible via the corrections page or emailing support with the URL and request.' },
  { q: 'Can I use my own custom domain?', a: 'The standard giveaway is hosted on influencers.hpedit.com. Custom domains or larger sites require separate discussion.' },
  { q: 'How does analytics work?', a: 'First-party visit, session, engagement, click, device, browser, country/region, and tagged-link data may be recorded; Raw IP addresses are not stored by the portfolio analytics system.' },
  { q: 'How do I get help?', a: 'Email info@hpedit.com with your application reference, portfolio URL, and identifying details for privacy requests.' },
];

export default function Help() {
  return (
    <main className="help-main" style={{ color: '#2a1a36', padding: '32px 24px 80px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

      <section className="help-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="help-blob" aria-hidden="true" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 600, letterSpacing: 1, color: '#7a3eb8', marginBottom: 18, textTransform: 'uppercase', position: 'relative' }}>
          <Link to="/" style={{ color: '#7a3eb8', textDecoration: 'none' }}>← HPEDIT Creator Portfolios</Link>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#7a3eb8' }} />
          <span>FAQ & SUPPORT</span>
        </div>
        <h1 className="help-title" style={{ fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, fontFamily: "'Inter', sans-serif", color: '#2a1a36', marginBottom: 14, position: 'relative' }}>
          Questions creators<br />usually ask before<br />applying.
        </h1>
        <p className="help-intro" style={{ fontSize: 18, color: '#5d3a7a', maxWidth: 520, lineHeight: 1.6, marginBottom: 28, position: 'relative' }}>
          A practical guide to how HPEDIT Creator Portfolios works, what is free, what gets published, and what happens after you submit an application.
        </p>
        <div className="help-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 60, position: 'relative' }}>
          {TAGS.map(t => (
            <span key={t} className="help-tag">{t}</span>
          ))}
        </div>
      </section>

      <div className="help-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>
        <aside className="help-aside" style={{ fontSize: 13, color: '#7a5a99', lineHeight: 1.6 }}>
          <div style={{ marginBottom: 24 }}>
            <strong style={{ color: '#5d3a7a', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Last updated</strong>
            <p style={{ margin: 4, color: '#2a1a36' }}>13 September 2026</p>
          </div>
          <div>
            <strong style={{ color: '#5d3a7a', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Operator</strong>
            <p style={{ margin: 4, color: '#2a1a36' }}>HP Edit Enterprise</p>
            <p style={{ margin: 4, color: '#2a1a36' }}>Kolkata, West Bengal, India</p>
          </div>
        </aside>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {FAQS.map((f, i) => (
            <article key={i} className="help-card">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#2a1a36', marginBottom: 10, letterSpacing: '-0.02em' }}>{f.q}</h2>
              <p style={{ color: '#5d3a7a', lineHeight: 1.65, fontSize: 15 }}>{f.a}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="help-contact">
        <Mail size={18} className="help-contact-icon" />
        <span style={{ fontSize: 15 }}>Questions, privacy requests, corrections or takedown requests: <strong>info@hpedit.com</strong></span>
        <ArrowRight size={16} className="help-contact-arrow" />
      </div>

      <style>{`
        /* ---------- hero blob ---------- */
        .help-blob {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: #c9a6ec;
          filter: blur(70px);
          opacity: 0.3;
          top: -120px; right: -60px;
          z-index: 0;
          pointer-events: none;
        }

        /* ---------- tag pills ---------- */
        .help-tag {
          padding: 6px 14px;
          border-radius: 50px;
          background: #fff;
          border: 1px solid #e2d2f2;
          font-size: 13px;
          font-weight: 500;
          color: #5d3a7a;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .help-tag:hover {
          background: #7a3eb8;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(122,62,184,0.22);
        }

        /* ---------- FAQ cards ---------- */
        .help-card {
          background: #fff;
          border: 1px solid #eee7f6;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 6px 20px rgba(74,29,122,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .help-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(74,29,122,0.14);
          border-color: #d9c4ef;
        }

        /* ---------- contact banner ---------- */
        .help-contact {
          margin-top: 60px;
          padding: 28px;
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-radius: 24px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          color: #5d3a7a;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .help-contact:hover {
          box-shadow: 0 12px 30px rgba(74,29,122,0.12);
          transform: translateY(-2px);
        }
        .help-contact strong { color: #2a1a36; }
        .help-contact-icon { color: #7a3eb8; flex-shrink: 0; }
        .help-contact-arrow {
          color: #7a3eb8;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .help-contact:hover .help-contact-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1020px) {
          .help-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .help-aside { display: flex !important; gap: 40px !important; }
        }

        @media (max-width: 768px) {
          .help-main { padding: 24px 20px 60px !important; }
          .help-intro { max-width: 100% !important; font-size: 16px !important; margin-bottom: 22px !important; }
          .help-card { padding: 22px !important; border-radius: 16px !important; }
          .help-contact { padding: 22px !important; border-radius: 18px !important; text-align: left !important; justify-content: flex-start !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .help-title { font-size: clamp(34px, 10vw, 48px) !important; margin-bottom: 10px !important; }
          .help-tags { gap: 6px !important; margin-bottom: 40px !important; }
          .help-tags .help-tag { padding: 5px 12px !important; font-size: 12px !important; }
          .help-aside { flex-direction: column !important; gap: 20px !important; }
          .help-blob { display: none; }
        }

        @media (max-width: 400px) {
          .help-main { padding: 20px 16px 48px !important; }
          .help-card h2 { font-size: 18px !important; }
          .help-card p { font-size: 14px !important; }
          .help-contact { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
    </main>
  );
}