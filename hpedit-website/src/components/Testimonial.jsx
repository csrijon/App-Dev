import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export default function Testimonial() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetch(API_URL + '/api/testimonials').then(r=>r.json()).then(setItems); }, []);
  return (
    <section className="testimonial-section">
      <div className="container testimonial-container">
        <div className="testimonial-card">
          <h2>"{items[0] ? items[0].quote : 'Great platform for creators.'}"</h2>
          <div className="testimonial-person">
            <div className="testimonial-name">{items[0] ? items[0].author : 'A creator'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
