import { useState, useEffect } from 'react';
import { API_URL, authHeaders } from '../services/api.js';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminCreators() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', sub: '', imageUrl: '', sortOrder: 0, isActive: true });
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  const load = async () => {
    const res = await fetch(API_URL + '/api/creators');
    const data = await res.json();
    setList(data);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/creators/${form.id}` : '/api/creators';
    await fetch(API_URL + url, { method, headers: authHeaders(token), body: JSON.stringify(form) });
    setForm({ name: '', sub: '', imageUrl: '', sortOrder: 0, isActive: true });
    setShowForm(false);
    load();
  };
  const removeOne = async (id) => {
    await fetch(API_URL + `/api/creators/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div><h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.03em', color: '#4a1d7a', marginBottom: 4 }}>Creators</h1><p style={{ color: '#6b556e' }}>Manage featured creators.</p></div>
        <button onClick={() => { setForm({ name: '', sub: '', imageUrl: '', sortOrder: 0, isActive: true }); setShowForm(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: '#4a1d7a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}><Plus size={16} /> Add Creator</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5', marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, color: '#4a1d7a' }}>{form.id ? 'Edit Creator' : 'New Creator'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1.5px solid #e8dff0', fontSize: '0.9rem' }} />
            <input placeholder="Subtitle" value={form.sub || ''} onChange={e => setForm({ ...form, sub: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1.5px solid #e8dff0', fontSize: '0.9rem' }} />
            <input placeholder="Image URL" value={form.imageUrl || ''} onChange={e => setForm({ ...form, imageUrl: e.target.value })} style={{ padding: 10, borderRadius: 8, border: '1.5px solid #e8dff0', fontSize: '0.9rem' }} />
            <input placeholder="Sort Order" type="number" value={form.sortOrder || 0} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} style={{ padding: 10, borderRadius: 8, border: '1.5px solid #e8dff0', fontSize: '0.9rem' }} />
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input id="cr-active" type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
            <label htmlFor="cr-active" style={{ fontSize: '0.85rem', color: '#4a1d7a' }}>Active</label>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button onClick={save} style={{ padding: '10px 22px', borderRadius: 8, background: '#4a1d7a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button onClick={() => setShowForm(false)} style={{ padding: '10px 16px', borderRadius: 8, background: '#eee', color: '#4a1d7a', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead style={{ background: '#f8f6fb', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Subtitle</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Image</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #f0ebf5' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: '#4a1d7a' }}>{c.name}</td>
                <td style={{ padding: '14px 16px', color: '#6b556e' }}>{c.sub || '—'}</td>
                <td style={{ padding: '14px 16px', color: '#6b556e' }}>
                  <a href={c.imageUrl} target="_blank" rel="noreferrer" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.8rem' }}>{c.imageUrl ? 'View' : '—'}</a>
                </td>
                <td style={{ padding: '14px 16px' }}><span style={{ background: c.isActive ? '#dcfce7' : '#eee', color: c.isActive ? '#166534' : '#777', padding: '4px 8px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{c.isActive ? 'Active' : 'Inactive'}</span></td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => { setForm({ ...c, id: c.id }); setShowForm(true); }} style={{ background: '#f8f6fb', border: 'none', padding: '6px 10px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, color: '#4a1d7a', cursor: 'pointer', marginRight: 6 }}>Edit</button>
                  <button onClick={() => removeOne(c.id)} style={{ background: '#fff0f2', border: 'none', padding: '6px 10px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, color: '#c23', cursor: 'pointer' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
