import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Takedown() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return (
    <main className="tkd-main" style={{ color: '#2a1a36', padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>

      <Link to="/" className="tkd-back">← Back to site</Link>
      <h1 className="tkd-title" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.05em', margin: '24px 0 12px', color: '#2a1a36' }}>Takedown & Corrections</h1>
      <p style={{ color: '#5d3a7a', fontSize: 16, marginBottom: 40 }}>How to request removal or correction.</p>

      <section className="tkd-section tkd-request">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>How to request</h2>
        <p style={{ color: '#4a3a5a' }}>
          Email <strong style={{ color: '#7a3eb8' }}>info@hpedit.com</strong> with the page link, your connection to the content, what needs fixing or hiding, your reason with evidence, and a reply address.
        </p>
      </section>

      <section className="tkd-section">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Response</h2>
        <p style={{ color: '#4a3a5a' }}>Credible urgent items may be temporarily hidden while reviewed. No fixed timeline given. Flag immediate risks as "URGENT."</p>
      </section>

      <section className="tkd-section">
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#2a1a36', letterSpacing: '-0.02em' }}>Corrections</h2>
        <p style={{ color: '#4a3a5a' }}>Corrections and updates are possible via the corrections page or by emailing support with the URL and request.</p>
      </section>

      <style>{`
        .tkd-back {
          color: #7a3eb8;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s ease;
          display: inline-block;
        }
        .tkd-back:hover { opacity: 0.7; }

        .tkd-section {
          border-top: 1px solid #eee7f6;
          padding-top: 24px;
          margin-bottom: 28px;
        }

        .tkd-request {
          background: linear-gradient(135deg, #f8f2fd, #f2e8fa);
          border: 1px solid #e2d2f2;
          border-top: 1px solid #e2d2f2;
          border-radius: 20px;
          padding: 24px 28px;
        }
        .tkd-request h2 { margin-top: 0; }

        /* ---------- responsive ---------- */
        @media (max-width: 768px) {
          .tkd-main { padding: 44px 20px 80px !important; }
          .tkd-request { padding: 20px 22px !important; border-radius: 16px !important; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .tkd-title { font-size: clamp(30px, 9vw, 44px) !important; }
          .tkd-section h2 { font-size: 19px !important; }
        }

        @media (max-width: 400px) {
          .tkd-main { padding: 32px 16px 60px !important; }
          .tkd-request { padding: 18px !important; }
        }
      `}</style>
    </main>
  );
}