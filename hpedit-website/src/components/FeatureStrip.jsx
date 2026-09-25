import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const items = [
  { icon: GroupsIcon, t: 'Free', d: 'Selected creator portfolios' },
  { icon: LanguageIcon, t: '3 modes', d: 'Public · Password · Hidden' },
  { icon: FavoriteBorderIcon, t: 'Creator-first', d: 'Built around your story' },
  { icon: StarBorderIcon, t: '1:1', d: 'One creator, one portfolio' },
];

export default function FeatureStrip() {
  return (
    <div>
      

      <section
        style={{
          background:
            'linear-gradient(180deg, #f3ecfb 0%, #ede6f6 100%)',
          padding: '40px 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {items.map((i) => {
            const Icon = i.icon;

            return (
              <div
                key={i.t}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                  padding: 22,
                  borderRadius: 24,
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 50,
                      color: '#3A2270',
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '1.8rem',
                    }}
                  >
                    {i.t}
                  </div>

                  <div
                    style={{
                      fontSize: '1 rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {i.d}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      
<style>{`
@media (max-width: 640px) {
  .container { width: 95% !important; padding: 0 12px !important; }
  img { max-width: 100% !important; height: auto !important; }
  a, button { font-size: 0.95rem !important; }
}
`}</style></section>
    </div>
  );
}