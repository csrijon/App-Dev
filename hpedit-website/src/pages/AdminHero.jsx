import { useState, useEffect } from 'react';
import { API_URL, authHeaders } from '../services/api.js';

export default function AdminHero() {
  const [data, setData] = useState({ title: '', subtitle: '', imageUrl: '', isActive: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(API_URL + '/api/hero').then(r => r.json()).then(d => { if (d) setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch(API_URL + '/api/hero/1', { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(data) });
    setSaving(false);
  };

  return (
    <div>
      <h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.03em', color: '#4a1d7a', marginBottom: 6 }}>Hero Section</h1>
      <p style={{ color: '#6b556e', marginBottom: 24 }}>Edit the hero content shown on the homepage.</p>
      <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5', maxWidth: 720 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#4a1d7a', marginBottom: 6 }}>Title</label>
          <input value={data?.title || ''} onChange={e => setData({ ...data, title: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8dff0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#4a1d7a', marginBottom: 6 }}>Subtitle</label>
          <input value={data?.subtitle || ''} onChange={e => setData({ ...data, subtitle: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8dff0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#4a1d7a', marginBottom: 6 }}>Image URL</label>
          <input value={data?.imageUrl || ''} onChange={e => setData({ ...data, imageUrl: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e8dff0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }} placeholder="https://images.unsplash.com/..." />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <input id="active" type="checkbox" checked={data?.isActive !== false} onChange={e => setData({ ...data, isActive: e.target.checked })} />
          <label htmlFor="active" style={{ fontSize: '0.9rem', color: '#4a1d7a' }}>Active</label>
        </div>
        <button onClick={save} disabled={saving || loading} style={{ padding: '12px 24px', borderRadius: 10, background: '#4a1d7a', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
