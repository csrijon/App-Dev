import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SECTIONS = [
  {
    title: 'What we collect',
    body: 'We gather applicant details (names, contacts, bios), audience and social info, uploaded files, portfolio settings, first-party analytics, and security logs. This is used to review, host, and update portfolios; preserve drafts; analyze traffic; send optional updates; provide support; and prevent abuse.',
  },
  {
    title: 'Usage',
    body: 'Data is used for portfolio hosting, review, draft continuity, analytics, optional communications, support, and abuse prevention. We do not sell personal information to advertisers.',
  },
  {
    title: 'Cookies & storage',
    body: 'Cookies and storage assist analytics, protected portfolio access, admin sessions, and draft continuity. See cookie details for specifics.',
  },
  {
    title: 'Partners & security',
    body: 'Infrastructure partners help operate services. No internet service can guarantee absolute security.',
  },
];

export default function Privacy() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="priv-main" style={{ color: '#2a1a36', padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>

      <Link to="/" className="priv-back">← Back to site</Link>
      <h1 className="priv-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36' }}>Privacy</h1>
      <p style={{ color: '#5d3a7a', fontSize: 16, marginBottom: 40 }}>HPEDIT Creator Portfolios — how we collect, use, and protect your data.</p>

      {SECTIONS.map((s) => (
        <section key={s.title} className="priv-section">
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>{s.title}</h2>
          <p style={{ color: '#4a3a5a' }}>{s.body}</p>
        </section>
      ))}

      <section className="priv-section priv-rights">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Your rights</h2>
        <p style={{ color: '#4a3a5a' }}>
          You may request access, correction, deletion / takedown, withdraw marketing consent, unsubscribe / resubscribe, or ask questions via{' '}
          <strong style={{ color: '#7a3eb8' }}>info@hpedit.com</strong>. Updates are posted with new dates. Not intended for children.
        </p>
      </section>

      <div className="priv-source">
        Source: <a href="https://influencers.hpedit.com/privacy" target="_blank" rel="noopener noreferrer">influencers.hpedit.com/privacy</a>
      </div>

      <style>{`
        .priv-back {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s ease, gap 0.2s ease;
          display: inline-block;
        }
        .priv-back:hover { opacity: 0.7; }

        .priv-section {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          margin-bottom: 28px;
        }

        .priv-rights {
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-top: 1px solid #e2d2f2;
          border-radius: 20px;
          padding: 24px 28px;
          margin-top: 8px;
        }
        .priv-rights h2 { margin-top: 0; }

        .priv-source {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          font-size: 13px;
          color: #8a7099;
        }
        .priv-source a {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s ease;
        }
        .priv-source a:hover { opacity: 0.7; }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .priv-main { padding: 44px 20px 80px !important; }
          .priv-rights { padding: 20px 22px !important; border-radius: 16px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .priv-title { font-size: clamp(30px, 9vw, 44px) !important; }
          .priv-section h2 { font-size: 19px !important; }
        }

        @media (max-width: 400px) {
          .priv-main { padding: 32px 16px 60px !important; }
          .priv-rights { padding: 18px !important; }
        }
      `}</style>
    </main>
  );
}