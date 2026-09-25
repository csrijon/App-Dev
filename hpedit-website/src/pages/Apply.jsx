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
    <main style={{ background: '#f8f5fb', color: '#2a1a36' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 60px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#7a3eb8', fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>← HPEDIT Creator Portfolios</Link>
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, margin: '24px 0 12px', fontFamily: "'Inter', sans-serif" }}>YOUR STORY → YOUR PORTFOLIO</h1>
        <blockquote style={{ fontSize: 20, fontWeight: 600, fontStyle: 'italic', color: '#5d3a7a', maxWidth: 520, margin: '0 auto', lineHeight: 1.4 }}>
          “Give us the raw material. We’ll shape the presentation.”
        </blockquote>
        <p style={{ color: '#7a3eb8', fontWeight: 500, fontSize: 15, marginTop: 8 }}>Photos, proof, and real work — nothing auto-publishes.</p>
      </section>



      {/* Form */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ background: '#fff', padding: 36, borderRadius: 24, border: '1px solid #eee7f6', boxShadow: '0 8px 28px rgba(74,29,122,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>FREE CREATOR PORTFOLIO APPLICATION</h2>
              <p style={{ color: '#5d3a7a', fontSize: 14 }}>Tell us your story. We’ll turn it into something worth sharing.</p>
            </div>
            <span style={{ background: '#2a1a36', color: '#fff', padding: '6px 14px', borderRadius: 50, fontWeight: 700, fontSize: 13 }}>Step {step} of {total} · {Math.round((step / total) * 100)}%</span>
          </div>

          <form style={{ display: 'grid', gap: 18 }} onSubmit={step === total ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
            {/* Step 1 */}
            {step === 1 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  <input placeholder="Full name" required style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                  <input placeholder="Creator / stage name" required style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  <input type="email" placeholder="Email" required style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                  <input type="tel" placeholder="Phone" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  <input placeholder="WhatsApp" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                  <input placeholder="City" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  <input placeholder="State" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                  <input placeholder="Country" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                  <select style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none', background: '#fff', color: '#5d3a7a' }}>
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
                  <input placeholder="Secondary niches" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                </div>
                <input placeholder="One-line headline" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <textarea rows={5} placeholder="Your story / bio" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none', resize: 'vertical' }} />
                <input placeholder="Languages" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
              </div>
            )}

            {/* Step 5 */}
            {step === 5 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <input placeholder="Portfolio URL (optional)" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none' }} />
                <textarea rows={3} placeholder="What proof / work can you share?" style={{ padding: 14, borderRadius: 12, border: '1px solid #ddd5e8', fontSize: 15, outline: 'none', resize: 'vertical' }} />
              </div>
            )}

            {/* Step 6 */}
            {step === 6 && (
              <div style={{ display: 'grid', gap: 18 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>Ready to submit?</h3>
                <p style={{ color: '#5d3a7a', fontSize: 15, lineHeight: 1.6 }}>Review your details above. Once you click Continue, your application demo is saved.</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 14, color: '#5d3a7a', marginTop: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={16} color="#7a3eb8" /> Local drafts saved</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={16} color="#7a3eb8" /> Resume after name/email</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'flex-start', marginTop: 8 }}>
              {step > 1 && (
                <button type="button" onClick={prev} style={{ padding: '14px 28px', background: '#ddd', color: '#2a1a36', border: 'none', borderRadius: 50, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Back</button>
              )}
              <button type="submit" style={{ padding: '14px 28px', background: '#7a3eb8', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {step === total ? 'Continue' : 'Continue'} <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      
<style>{`
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style></section>

      {/* Footer */}
      <footer style={{ background: '#2a1a36', color: '#fff', padding: 60, textAlign: 'center' }}>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>HPEDIT Creator Portfolios</h3>
        <p style={{ color: '#ccc0e0', maxWidth: 420, margin: '0 auto 16px', fontSize: 15, lineHeight: 1.5 }}>Free bespoke portfolio experiences for creators. Built in Kolkata, West Bengal, India.</p>
        <p style={{ fontSize: 13, color: '#aaa0c0', marginBottom: 20 }}>© 2026 HP Edit Enterprise. All rights reserved.</p>
        <Link to="/" style={{ display: 'inline-block', padding: '14px 32px', background: '#7a3eb8', color: '#fff', borderRadius: 50, textDecoration: 'none', fontWeight: 600 }}>Back to site →</Link>
      </footer>
    </main>
  );
}
