import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SECTIONS = [
  {
    title: 'Allowed',
    body: 'Only permitted assets. Real work, truthful figures/awards/partnerships. Brand logos for real work. Past collaborations must not falsely suggest current endorsement.',
  },
  {
    title: 'Prohibited',
    body: 'No malware, phishing, credential theft, intentionally harmful code, threats, harassment, fraud, unlawful acts. No deceptive claims about identity, credentials, or partnerships. No unlicensed copyrighted music, images, or third-party creative work.',
  },
  {
    title: 'Privacy & consent',
    body: 'Protect others’ privacy; get consent for images; hide unnecessary sensitive details.',
  },
  {
    title: 'Edits & moderation',
    body: 'HPEDIT may crop, resize, colour-correct, retouch, or adapt assets. May ask for clarification, decline material, or temporarily hide content over credible accuracy, rights, privacy, or safety concerns.',
  },
];

export default function ContentGuidelines() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="cg-main" style={{ color: '#2a1a36', padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>

      <Link to="/" className="cg-back">← Back to site</Link>
      <h1 className="cg-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36' }}>Content Guidelines</h1>
      <p style={{ color: '#5d3a7a', fontSize: 16, marginBottom: 40 }}>What you can share and how it is reviewed.</p>

      {SECTIONS.map((s) => (
        <section key={s.title} className="cg-section">
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>{s.title}</h2>
          <p style={{ color: '#4a3a5a' }}>{s.body}</p>
        </section>
      ))}

      <section className="cg-section cg-corrections">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Corrections</h2>
        <p style={{ color: '#4a3a5a' }}>
          Email <strong style={{ color: '#7a3eb8' }}>info@hpedit.com</strong> with page link, connection to content, what needs fixing, reason with evidence, and reply address.
        </p>
      </section>

      <div className="cg-source">
        Source: <a href="https://influencers.hpedit.com/content-guidelines" target="_blank" rel="noopener noreferrer">influencers.hpedit.com/content-guidelines</a>
      </div>

      <style>{`
        .cg-back {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s ease;
          display: inline-block;
        }
        .cg-back:hover { opacity: 0.7; }

        .cg-section {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          margin-bottom: 28px;
        }

        .cg-corrections {
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-top: 1px solid #e2d2f2;
          border-radius: 20px;
          padding: 24px 28px;
          margin-top: 8px;
        }
        .cg-corrections h2 { margin-top: 0; }

        .cg-source {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          font-size: 13px;
          color: #8a7099;
        }
        .cg-source a {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s ease;
        }
        .cg-source a:hover { opacity: 0.7; }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .cg-main { padding: 44px 20px 80px !important; }
          .cg-corrections { padding: 20px 22px !important; border-radius: 16px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .cg-title { font-size: clamp(30px, 9vw, 44px) !important; }
          .cg-section h2 { font-size: 19px !important; }
        }

        @media (max-width: 400px) {
          .cg-main { padding: 32px 16px 60px !important; }
          .cg-corrections { padding: 18px !important; }
        }
      `}</style>
    </main>
  );
}