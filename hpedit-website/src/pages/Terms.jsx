import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SECTIONS = [
  {
    title: 'Service',
    body: "Free hosted portfolios are discretionary — not guaranteed. Acceptance, design, or timing isn't assured.",
  },
  {
    title: 'User obligations',
    body: 'You must supply truthful data and possess rights to anything uploaded. Prohibited: bypassing security, malware, fraud, misrepresentation.',
  },
  {
    title: 'Content & rights',
    body: 'You keep rights you already hold. You grant HPEDIT a limited license to display and adapt material for the portfolio.',
  },
  {
    title: 'Availability & liability',
    body: 'As-available; no guaranteed outcomes. We disclaim liability for indirect or speculative losses.',
  },
  {
    title: 'Removal & changes',
    body: 'Portfolios may be hidden/removed for abuse, disputes, inaccuracies, or request. Terms may change; continued use accepts updates.',
  },
];

export default function Terms() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="terms-main" style={{ color: '#2a1a36', padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>

      <Link to="/" className="terms-back">← Back to site</Link>
      <h1 className="terms-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36' }}>Terms & Conditions</h1>
      <p style={{ color: '#5d3a7a', fontSize: 16, marginBottom: 40 }}>HPEDIT Creator Portfolios — rules, rights, and limits of use.</p>

      {SECTIONS.map((s) => (
        <section key={s.title} className="terms-section">
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>{s.title}</h2>
          <p style={{ color: '#4a3a5a' }}>{s.body}</p>
        </section>
      ))}

      <section className="terms-section terms-law">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Law</h2>
        <p style={{ color: '#4a3a5a' }}>Indian law applies; Kolkata courts have jurisdiction.</p>
      </section>

      <div className="terms-source">
        Source: <a href="https://influencers.hpedit.com/terms" target="_blank" rel="noopener noreferrer">influencers.hpedit.com/terms</a>
      </div>

      <style>{`
        .terms-back {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s ease;
          display: inline-block;
        }
        .terms-back:hover { opacity: 0.7; }

        .terms-section {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          margin-bottom: 28px;
        }

        .terms-law {
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-top: 1px solid #e2d2f2;
          border-radius: 20px;
          padding: 24px 28px;
          margin-top: 8px;
        }
        .terms-law h2 { margin-top: 0; }

        .terms-source {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          font-size: 13px;
          color: #8a7099;
        }
        .terms-source a {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s ease;
        }
        .terms-source a:hover { opacity: 0.7; }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .terms-main { padding: 44px 20px 80px !important; }
          .terms-law { padding: 20px 22px !important; border-radius: 16px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .terms-title { font-size: clamp(30px, 9vw, 44px) !important; }
          .terms-section h2 { font-size: 19px !important; }
        }

        @media (max-width: 400px) {
          .terms-main { padding: 32px 16px 60px !important; }
          .terms-law { padding: 18px !important; }
        }
      `}</style>
    </main>
  );
}