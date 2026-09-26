import { useState, useEffect } from 'react';
import { API_URL, authHeaders } from '../services/api.js';
import { Trash2 } from 'lucide-react';

export default function AdminContacts() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem('token');

  const load = async () => {
    const res = await fetch(API_URL + '/api/contacts', { headers: authHeaders(token) });
    setList(await res.json());
  };
  useEffect(() => { load(); }, []);

  const removeOne = async (id) => {
    await fetch(API_URL + `/api/contacts/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    load();
  };

  return (
    <div>
      <h1 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.03em', color: '#4a1d7a', marginBottom: 4 }}>Contacts</h1>
      <p style={{ color: '#6b556e', marginBottom: 24 }}>Contact submission messages.</p>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(74,29,122,0.06)', border: '1px solid #f0ebf5', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead style={{ background: '#f8f6fb', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Message</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Created</th>
              <th style={{ padding: '14px 16px', color: '#8a769a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id} style={{ borderTop: '1px solid #f0ebf5' }}>
                <td style={{ padding: '12px 16px', color: '#4a1d7a', fontWeight: 600 }}>{c.name || '—'}</td>
                <td style={{ padding: '12px 16px', color: '#6b556e' }}>{c.email || '—'}</td>
                <td style={{ padding: '12px 16px', color: '#6b556e' }}>{c.message?.substring(0, 100) || '—'}{c.message?.length > 100 ? '…' : ''}</td>
                <td style={{ padding: '12px 16px', color: '#8a769a', fontSize: '0.8rem' }}>{new Date(c.createdAt).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
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
