import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL, authHeaders } from '../services/api.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/admin/dashboard');
      } else {
        setMsg(data.error || 'Login failed');
      }
    } catch (err) {
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3ecfb 0%, #ede6f6 60%, #fff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 25px 60px rgba(74,29,122,0.14)', padding: 48, maxWidth: 420, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontWeight: 900, fontSize: '1.7rem', color: '#4a1d7a', letterSpacing: '-0.03em', marginBottom: 6 }}>HPEDIT<span style={{ color: '#7c3aed' }}>+</span></h1>
          <p style={{ color: '#6b556e', fontSize: '0.92rem' }}>Administrator Login</p>
        </div>
        <form onSubmit={login}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4a1d7a', marginBottom: 6 }}>Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@hpedit.com" required style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e8dff0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', background: '#faf8ff' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#4a1d7a', marginBottom: 6 }}>Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e8dff0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', background: '#faf8ff' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: 12, background: '#4a1d7a', color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity .2s' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        {msg && <p style={{ color: msg === 'Login failed' || msg === 'Network error' ? '#c23' : '#16a34a', marginTop: 14, fontSize: '0.85rem', textAlign: 'center', fontWeight: 500 }}>{msg}</p>}
      </div>
    </div>
  );
}
