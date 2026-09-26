import { useState, useEffect } from 'react';
import { API_URL, authHeaders } from '../services/api.js';

export default function AdminSettings() {
  const [data, setData] = useState({ siteName: '', footerText: '' });
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(API_URL + '/api/settings').then(r => r.json()).then(d => { if (d) setData(d); });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(API_URL + '/api/settings', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(data) });
    setSaving(false);
  };

  return (
    <div>
      <h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.03em', color: '#4a1d7a', marginBottom: 4 }}>Site Settings</h1>
      <p style={{ color: '#6b556e', marginBottom: 24 }}>Global website settings.</p>
      <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5', maxWidth: 640 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#4a1d7a', marginBottom: 6 }}>Site Name</label>
          <input value={data?.siteName || ''} onChange={e => setData({ ...data, siteName: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8dff0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#4a1d7a', marginBottom: 6 }}>Footer Text</label>
          <textarea value={data?.footerText || ''} onChange={e => setData({ ...data, footerText: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8dff0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none', minHeight: 100 }} />
        </div>
        <button onClick={save} disabled={saving} style={{ padding: '12px 24px', borderRadius: 10, background: '#4a1d7a', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
