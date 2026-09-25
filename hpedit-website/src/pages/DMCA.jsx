import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function DMCA() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="dmca-main" style={{ color: '#2a1a36', padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>

      <Link to="/" className="dmca-back">← Back to site</Link>
      <h1 className="dmca-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36' }}>DMCA</h1>
      <p style={{ color: '#5d3a7a', fontSize: 16, marginBottom: 40 }}>Copyright infringement notices and counter-notices.</p>

      <section className="dmca-section dmca-notice">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Notice requirements</h2>
        <p style={{ color: '#4a3a5a' }}>
          Send to <strong style={{ color: '#7a3eb8' }}>info@hpedit.com</strong> identifying the copyrighted work, the infringing material, your contact, and a statement under penalty of perjury.
        </p>
      </section>

      <section className="dmca-section">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Counter-notice</h2>
        <p style={{ color: '#4a3a5a' }}>If content is removed in error, submit a counter-notice with your identification, consent to jurisdiction, and a statement under penalty of perjury.</p>
      </section>

      <section className="dmca-section">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Repeat infringer</h2>
        <p style={{ color: '#4a3a5a' }}>Accounts of repeat infringers may be terminated.</p>
      </section>

      <style>{`
        .dmca-back {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s ease;
          display: inline-block;
        }
        .dmca-back:hover { opacity: 0.7; }

        .dmca-section {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          margin-bottom: 28px;
        }

        .dmca-notice {
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-top: 1px solid #e2d2f2;
          border-radius: 20px;
          padding: 24px 28px;
        }
        .dmca-notice h2 { margin-top: 0; }

        .dmca-source {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          font-size: 13px;
          color: #8a7099;
        }
        .dmca-source a {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s ease;
        }
        .dmca-source a:hover { opacity: 0.7; }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .dmca-main { padding: 44px 20px 80px !important; }
          .dmca-notice { padding: 20px 22px !important; border-radius: 16px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .dmca-title { font-size: clamp(30px, 9vw, 44px) !important; }
          .dmca-section h2 { font-size: 19px !important; }
        }

        @media (max-width: 400px) {
          .dmca-main { padding: 32px 16px 60px !important; }
          .dmca-notice { padding: 18px !important; }
        }
      `}</style>
    </main>
  );
}