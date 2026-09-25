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

      {/* =====================================
          SOFT PURPLE BLOB
      ===================================== */}

      <div
        aria-hidden="true"
        className="story-purple-blob"
      />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div
        className="container story-grid"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns:
            "minmax(260px, 1fr) auto minmax(0, 1.7fr)",
          columnGap: 40,
          alignItems: "center",
        }}
      >

        {/* =====================================
            1. HEADING + COPY + CTA
        ===================================== */}

        <div className="story-content">

          <h2
            className="story-heading"
          >
            More Than a Link.
            <br />

            <span>
              It's Your Story.
            </span>
          </h2>


          <p className="story-description">
            Showcase your work, share your journey, and connect with
            opportunities — all in one beautiful place.
          </p>


          <a
            href="#"
            className="btn-primary story-cta"
          >
            Create Your Portfolio
            <span aria-hidden="true">→</span>
          </a>

        </div>


        {/* =====================================
            2. FEATURE LIST
        ===================================== */}

        <ul className="story-features">

          {FEATURES.map((f) => (
            <li
              key={f.label}
              className="story-feature"
            >
              <CheckIcon color={f.color} />

              <span>
                {f.label}
              </span>
            </li>
          ))}

        </ul>


        {/* =====================================
            3. LAPTOP + PHONE IMAGE
        ===================================== */}

        <div
          className="story-visual"
        >

          {/* Top-left note */}
          {/*
          <div
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
          </div>
          */}


          {/* Laptop image */}

          <img
            src={laptopimage}
            alt="Portfolio preview on laptop and phone"
            className="story-laptop-image"
          />


          {/* Right-side note */}
          {/*
          <div
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
          </div>
          */}

        </div>

      </div>


      {/* =====================================
          RESPONSIVE CSS
      ===================================== */}

      <style>{`

        /* =====================================
           SECTION
        ===================================== */

        .story-section {
          width: 100%;
          box-sizing: border-box;
        }


        /* =====================================
           PURPLE BLOB
        ===================================== */

        .story-purple-blob {
          position: absolute;

          right: -6%;
          top: 50%;

          width: 55%;
          height: 90%;

          transform: translateY(-50%);

          background:
            radial-gradient(
              closest-side,
              rgba(167, 139, 250, 0.28),
              rgba(167, 139, 250, 0) 100%
            );

          filter: blur(10px);

          pointer-events: none;
        }


        /* =====================================
           MAIN GRID
        ===================================== */

        .story-grid {
          min-width: 0;
        }


        /* =====================================
           CONTENT
        ===================================== */

        .story-content {
          min-width: 0;
        }


        /* =====================================
           HEADING
        ===================================== */

        .story-heading {
          margin: 0 0 16px;

          font-size:
            clamp(
              2rem,
              3.4vw,
              2.9rem
            );

          font-weight: 800;

          letter-spacing: -0.03em;

          color:
            var(
              --text-dark,
              #1a1033
            );

          line-height: 1.05;
        }


        .story-heading span {
          color:
            var(
              --purple-deep,
              #4c1d95
            );

          font-style: italic;

          font-weight: 700;
        }


        /* =====================================
           DESCRIPTION
        ===================================== */

        .story-description {
          font-size: 0.98rem;

          line-height: 1.55;

          color:
            var(
              --text-body,
              #4b4560
            );

          max-width: 380px;

          margin: 0 0 24px;
        }


        /* =====================================
           CTA
        ===================================== */

        .story-cta {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          background:
            var(
              --purple-deep,
              #4c1d95
            );

          color: #fff;

          padding: 13px 22px;

          border-radius: 10px;

          font-weight: 600;

          font-size: 0.92rem;

          text-decoration: none;

          box-shadow:
            0 8px 20px
            rgba(76, 29, 149, 0.25);

          white-space: nowrap;

          box-sizing: border-box;
        }


        /* =====================================
           FEATURES
        ===================================== */

        .story-features {
          list-style: none;

          margin: 0;
          padding: 0;

          display: flex;

          flex-direction: column;

          gap: 14px;

          font-size: 0.9rem;

          font-weight: 500;

          color:
            var(
              --text-dark,
              #1a1033
            );

          white-space: nowrap;

          min-width: 0;
        }


        .story-feature {
          display: flex;

          align-items: center;

          gap: 10px;

          min-width: 0;
        }


        /* =====================================
           VISUAL
        ===================================== */

        .story-visual {
          position: relative;

          min-width: 0;

          width: 100%;
        }


        /* =====================================
           LAPTOP IMAGE
        ===================================== */

        .story-laptop-image {
          display: block;

          width: 100%;

          max-width: 100%;

          height: auto;

          object-fit: contain;

          position: relative;

          z-index: 1;
        }


        /* =====================================
           TABLET / SMALL LAPTOP
        ===================================== */

        @media (max-width: 1100px) {

          .story-grid {
            grid-template-columns:
              minmax(220px, 1fr)
              auto
              minmax(0, 1.4fr) !important;

            column-gap: 24px !important;
          }


          .story-heading {
            font-size:
              clamp(
                1.9rem,
                3.5vw,
                2.5rem
              );
          }


          .story-features {
            font-size: 0.84rem;

            gap: 12px;
          }


          .story-visual {
            width: 100%;
          }

        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .story-section {
            padding: 44px 0 !important;
          }


          /*
             Two-column layout:

             Content
             Features

             Image goes full width below.
          */

          .story-grid {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(180px, 0.8fr) !important;

            row-gap: 35px;

            column-gap: 30px !important;
          }


          .story-visual {
            grid-column: 1 / -1;

            width: 100%;

            display: flex;

            justify-content: center;
          }


          .story-laptop-image {
            width: 85%;

            max-width: 700px;
          }


          .story-purple-blob {
            right: -20%;

            width: 80%;

            height: 70%;
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 640px) {

          .story-section {
            padding: 40px 0 !important;
          }


          /*
             IMPORTANT:
             Mobile becomes a single column.
          */

          .story-grid {
            width: 100% !important;

            max-width: none !important;

            padding:
              0
              16px !important;

            box-sizing: border-box;

            display: grid;

            grid-template-columns: 1fr !important;

            gap: 28px;

            align-items: start;
          }


          /* =================================
             CONTENT
          ================================= */

          .story-content {
            width: 100%;
          }


          .story-heading {
            font-size:
              clamp(
                2rem,
                8vw,
                2.6rem
              );

            line-height: 1.08;

            margin-bottom: 14px;
          }


          .story-description {
            max-width: none;

            width: 100%;

            font-size: 0.95rem;

            line-height: 1.55;

            margin-bottom: 20px;
          }


          .story-cta {
            width: 100%;

            max-width: 320px;

            min-height: 48px;

            padding:
              12px
              20px;

            font-size: 0.92rem;
          }


          /* =================================
             FEATURES
          ================================= */

          .story-features {
            width: 100%;

            display: grid;

            grid-template-columns:
              1fr 1fr;

            gap:
              14px
              16px;

            white-space: normal;

            font-size: 0.88rem;
          }


          .story-feature {
            min-width: 0;

            align-items: center;

            gap: 8px;
          }


          .story-feature span {
            line-height: 1.25;
          }


          /* =================================
             IMAGE
          ================================= */

          .story-visual {
            grid-column: auto;

            width: 100%;

            display: block;
          }


          .story-laptop-image {
            width: 100%;

            max-width: 100%;

            height: auto;

            object-fit: contain;
          }


          /* =================================
             PURPLE BLOB
          ================================= */

          .story-purple-blob {
            right: -35%;

            top: 60%;

            width: 100%;

            height: 50%;

            filter: blur(15px);
          }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 420px) {

          .story-section {
            padding: 34px 0 !important;
          }


          .story-grid {
            padding:
              0
              14px !important;

            gap: 24px;
          }


          .story-heading {
            font-size: 2rem;

            letter-spacing: -0.035em;
          }


          .story-description {
            font-size: 0.92rem;

            line-height: 1.5;
          }


          .story-cta {
            width: 100%;

            max-width: none;

            min-height: 48px;
          }


          /*
             One feature per row on
             very small screens.
          */

          .story-features {
            grid-template-columns: 1fr;

            gap: 12px;

            font-size: 0.9rem;
          }


          .story-feature {
            min-height: 30px;
          }


          .story-laptop-image {
            width: 100%;
          }

        }


        /* =====================================
           VERY SMALL MOBILE
        ===================================== */

        @media (max-width: 340px) {

          .story-grid {
            padding:
              0
              10px !important;
          }


          .story-heading {
            font-size: 1.8rem;
          }


          .story-description {
            font-size: 0.9rem;
          }


          .story-feature {
            font-size: 0.86rem;
          }

        }

      `}</style>

    </section>
  );
}