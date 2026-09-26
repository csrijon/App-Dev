import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function Apply() {
  const [step, setStep] = useState(1);
  const total = 6;

  const next = () => setStep(s => Math.min(s + 1, total));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your application demo is saved.');
  };

  return (
    <main className="apply-main" style={{ background: '#f8f5fb', color: '#2a1a36' }}>

      {/* Hero */}
      <section className="apply-hero" style={{ padding: '100px 24px 60px', textAlign: 'center', maxWidth: 800, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div className="apply-blob" aria-hidden="true" />
        <Link to="/" style={{ textDecoration: 'none', color: '#7a3eb8', fontWeight: 600, fontSize: 14, letterSpacing: 1, position: 'relative' }}>← HPEDIT Creator Portfolios</Link>
        <h1 className="apply-title" style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, margin: '24px 0 12px', fontFamily: "'Inter', sans-serif", position: 'relative' }}>YOUR STORY → YOUR PORTFOLIO</h1>
        <blockquote style={{ fontSize: 20, fontWeight: 600, fontStyle: 'italic', color: '#5d3a7a', maxWidth: 520, margin: '0 auto', lineHeight: 1.4, position: 'relative' }}>
          “Give us the raw material. We’ll shape the presentation.”
        </blockquote>
        <p style={{ color: '#7a3eb8', fontWeight: 500, fontSize: 15, marginTop: 8, position: 'relative' }}>Photos, proof, and real work — nothing auto-publishes.</p>
      </section>


      {/* Form */}
      <section className="apply-form-section" style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 100px' }}>
        <div className="apply-card">
          <div className="apply-card-header">
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>FREE CREATOR PORTFOLIO APPLICATION</h2>
              <p style={{ color: '#5d3a7a', fontSize: 14 }}>Tell us your story. We’ll turn it into something worth sharing.</p>
            </div>
            <span className="apply-step-badge">Step {step} of {total} · {Math.round((step / total) * 100)}%</span>
          </div>

          <div className="apply-progress-track">
            <div className="apply-progress-fill" style={{ width: `${(step / total) * 100}%` }} />
          </div>

          <form className="apply-form" onSubmit={step === total ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="apply-fields">
                <div className="apply-row">
                  <input className="apply-input" placeholder="Full name" required />
                  <input className="apply-input" placeholder="Creator / stage name" required />
                </div>
                <div className="apply-row">
                  <input className="apply-input" type="email" placeholder="Email" required />
                  <input className="apply-input" type="tel" placeholder="Phone" />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="apply-fields">
                <div className="apply-row">
                  <input className="apply-input" placeholder="WhatsApp" />
                  <input className="apply-input" placeholder="City" />
                </div>
                <div className="apply-row">
                  <input className="apply-input" placeholder="State" />
                  <input className="apply-input" placeholder="Country" />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="apply-fields">
                <div className="apply-row">
                  <select className="apply-input apply-select">
                    <option>Primary creator category</option>
                    <option>Fashion</option>
                    <option>Fitness</option>
                    <option>Food</option>
                    <option>Art & Design</option>
                    <option>Business</option>
                    <option>Music & Culture</option>
                    <option>Travel</option>
                    <option>Lifestyle</option>
                    <option>Other</option>
                  </select>
                  <input className="apply-input" placeholder="Secondary niches" />
                </div>
                <input className="apply-input" placeholder="One-line headline" />
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="apply-fields">
                <textarea className="apply-input" rows={5} placeholder="Your story / bio" style={{ resize: 'vertical' }} />
                <input className="apply-input" placeholder="Languages" />
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div className="apply-fields">
                <input className="apply-input" placeholder="Portfolio URL (optional)" />
                <textarea className="apply-input" rows={3} placeholder="What proof / work can you share?" style={{ resize: 'vertical' }} />
              </div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <div className="apply-fields">
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>Ready to submit?</h3>
                <p style={{ color: '#5d3a7a', fontSize: 15, lineHeight: 1.6 }}>Review your details above. Once you click Continue, your application demo is saved.</p>
                <div className="apply-check-row">
                  <span className="apply-check"><Check size={16} color="#7a3eb8" /> Local drafts saved</span>
                  <span className="apply-check"><Check size={16} color="#7a3eb8" /> Resume after name/email</span>
                </div>
              </div>
            )}

            <div className="apply-actions">
              {step > 1 && (
                <button type="button" onClick={prev} className="apply-btn-back">Back</button>
              )}
              <button type="submit" className="apply-btn-next">
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="apply-footer">
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8,color:"rgb(204, 192, 224)" }}>HPEDIT Creator Portfolios</h3>
        <p style={{ color: '#4a1d7a0e0', maxWidth: 420, margin: '0 auto 16px', fontSize: 15, lineHeight: 1.5 }}>Free bespoke portfolio experiences for creators. Built in Kolkata, West Bengal, India.</p>
        <p style={{ fontSize: 13, color: '#4a1d7a0c0', marginBottom: 20 }}>© 2026 HP Edit Enterprise. All rights reserved.</p>
        <Link to="/" className="apply-footer-btn">Back to site →</Link>
      </footer>

      <style>{`
        /* ---------- hero blob ---------- */
        .apply-blob {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: #c9a6ec;
          filter: blur(70px);
          opacity: 0.3;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          z-index: 0;
          pointer-events: none;
        }

        /* ---------- card ---------- */
        .apply-card {
          background: #fff;
          padding: 36px;
          border-radius: 24px;
          border: 1px solid #eee7f6;
          box-shadow: 0 8px 28px rgba(74,29,122,0.08);
        }
        .apply-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .apply-step-badge {
          background: #2a1a36;
          color: #fff;
          padding: 6px 14px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 13px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ---------- progress bar ---------- */
        .apply-progress-track {
          height: 6px;
          background: #f0e8f9;
          border-radius: 50px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .apply-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7a3eb8, #a866dd);
          border-radius: 50px;
          transition: width 0.35s ease;
        }

        /* ---------- form fields ---------- */
        .apply-form { display: grid; gap: 18px; }
        .apply-fields { display: grid; gap: 18px; }
        .apply-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }
        .apply-input {
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #ddd5e8;
          font-size: 15px;
          outline: none;
          background: #fff;
          color: #2a1a36;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .apply-input:focus {
          border-color: #a866dd;
          box-shadow: 0 0 0 4px rgba(122,62,184,0.12);
        }
        .apply-select { color: #5d3a7a; cursor: pointer; }

        .apply-check-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 14px;
          color: #5d3a7a;
          margin-top: 8px;
        }
        .apply-check {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8f2fd;
          padding: 6px 12px;
          border-radius: 50px;
          border: 1px solid #eee0f7;
        }

        /* ---------- buttons ---------- */
        .apply-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-start;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .apply-btn-back {
          padding: 14px 28px;
          background: #ede8f2;
          color: #2a1a36;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .apply-btn-back:hover { background: #ddd2e8; transform: translateY(-2px); }
        .apply-btn-next {
          padding: 14px 28px;
          background: #7a3eb8;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 20px rgba(122,62,184,0.25);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .apply-btn-next:hover {
          background: #8f52cc;
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(122,62,184,0.35);
        }

        /* ---------- footer ---------- */
        .apply-footer {
          background: linear-gradient(135deg, #2a1a36, #3d2650);
          color: #fff;
          padding: 60px 24px;
          text-align: center;
        }
        .apply-footer-btn {
          display: inline-block;
          padding: 14px 32px;
          background: #7a3eb8;
          color: #fff;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .apply-footer-btn:hover {
          background: #8f52cc;
          transform: translateY(-2px);
        }

        /* ---------- responsive ---------- */
        @media (max-width: 900px) {
          .apply-hero { padding: 80px 20px 48px !important; }
        }

        @media (max-width: 768px) {
          .apply-card { padding: 26px !important; border-radius: 20px !important; }
          .apply-card-header { flex-direction: column; align-items: flex-start !important; gap: 10px; }
        }

        @media (max-width: 640px) {
          .container { width: 95% !important; padding: 0 12px !important; }
          img { max-width: 100% !important; height: auto !important; }
          a, button { font-size: 0.95rem !important; }

          .apply-hero { padding: 60px 16px 40px !important; }
          .apply-title { font-size: clamp(1.7rem, 9vw, 2.6rem) !important; margin: 18px 0 10px !important; }
          .apply-form-section { padding: 0 16px 60px !important; }
          .apply-card { padding: 20px !important; }
          .apply-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .apply-actions { flex-direction: column-reverse; align-items: stretch !important; }
          .apply-btn-back, .apply-btn-next { width: 100%; justify-content: center; }
          .apply-blob { display: none; }
          .apply-footer { padding: 44px 20px !important; }
        }

        @media (max-width: 400px) {
          .apply-card { padding: 16px !important; }
          .apply-step-badge { font-size: 12px !important; padding: 5px 10px !important; }
        }
      `}</style>
    </main>
  );
}