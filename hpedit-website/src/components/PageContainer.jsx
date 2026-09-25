export default function PageContainer({ children, bg = '#f8f5fb', dark = false }) {
  return (
    <main style={{
      background: bg,
      color: dark ? '#eeeae6' : '#2a1a36',
      fontFamily: "'Inter', sans-serif",
      maxWidth: 1100,
      margin: '0 auto',
      padding: '80px 24px 100px',
    }}>
      {children}
    </main>
  );

<style>{`
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style>
}