import laptopimage from "../assets/laptopimage.png";

const FEATURES = [
  { label: "Customisable Designs", color: "#7c3aed" },
  { label: "Mobile Optimised", color: "#c026d3" },
  { label: "Media Galleries", color: "#22c55e" },
  { label: "Contact & Collaboration", color: "#16a34a" },
  { label: "Analytics & Insights", color: "#3b82f6" },
  { label: "And Much More...", color: "#2563eb" },
];

function CheckIcon({ color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.4l2.3 2.3 4.7-5"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const handwriting = {
  fontFamily: "'Caveat', 'Segoe Script', 'Bradley Hand', cursive",
  color: "var(--purple-deep, #4c1d95)",
  lineHeight: 1.1,
  position: "absolute",
  pointerEvents: "none",
};

export default function StorySection() {
  return (
    <section
      className="story-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #ffffff 0%, #faf7ff 100%)",
        padding: "48px 0",
      }}
    >
      {/* soft purple blob behind the mockups */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-6%",
          top: "50%",
          width: "55%",
          height: "90%",
          transform: "translateY(-50%)",
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.28), rgba(167,139,250,0) 100%)",
          filter: "blur(10px)",
        }}
      />

      <div
        className="container story-grid"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "minmax(260px, 1fr) auto minmax(0, 1.7fr)",
          columnGap: 40,
          alignItems: "center",
        }}
      >
        {/* 1. heading + copy + CTA */}
        <div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.4vw, 2.9rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-dark, #1a1033)",
              lineHeight: 1.05,
              margin: "0 0 16px",
            }}
          >
            More Than a Link.
            <br />
            <span
              style={{
                color: "var(--purple-deep, #4c1d95)",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              It's Your Story.
            </span>
          </h2>

          <p
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.55,
              color: "var(--text-body, #4b4560)",
              maxWidth: 380,
              margin: "0 0 24px",
            }}
          >
            Showcase your work, share your journey, and connect with
            opportunities — all in one beautiful place.
          </p>

          <a
            href="#"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--purple-deep, #4c1d95)",
              color: "#fff",
              padding: "13px 22px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.92rem",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(76,29,149,0.25)",
            }}
          >
            Create Your Portfolio <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* 2. feature list */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text-dark, #1a1033)",
            whiteSpace: "nowrap",
          }}
        >
          {FEATURES.map((f) => (
            <li
              key={f.label}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <CheckIcon color={f.color} />
              {f.label}
            </li>
          ))}
        </ul>

        {/* 3. laptop + phone mockup with handwritten notes */}
        <div className="story-visual" style={{ position: "relative", minWidth: 0 }}>
          {/* top-left note */}
          {/* <div
            className="story-note story-note-left"
            style={{
              ...handwriting,
              top: "-2%",
              left: "-4%",
              fontSize: "1.5rem",
              transform: "rotate(-8deg)",
              textAlign: "left",
              zIndex: 2,
            }}
          >
            Good
            <br />
            Things
            <br />
            Take
            <br />
            Time <span style={{ fontSize: "1.2rem" }}>♡</span>
          </div> */}

          {/* mockup image (laptop + phone) */}
          <img
            src={laptopimage}
            alt="Portfolio preview on laptop and phone"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* right-side note */}
          {/* <div
            className="story-note story-note-right"
            style={{
              ...handwriting,
              top: "6%",
              right: "-2%",
              fontSize: "1.5rem",
              transform: "rotate(-6deg)",
              textAlign: "left",
              zIndex: 2,
            }}
          >
            Your
            <br />
            Story
            <br />
            Looks
            <br />
            Good
            <br />
            Here <span style={{ fontSize: "1.2rem" }}>♡</span>
          </div> */}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .story-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 40px;
          }
          .story-grid .story-visual {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 640px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
          .story-grid ul { white-space: normal !important; }
          .story-note { display: none; }
        }
      `}</style>
    </section>
  );
}