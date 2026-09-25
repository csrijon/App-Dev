import { useState } from 'react';
import sunsetimage from "../assets/sunset.png";

export default function Testimonial() {
  const [i, setI] = useState(0);

  const quotes = [
    {
      text: 'A portfolio should feel like your own space — personal, polished and unmistakably yours.',
      name: 'Riya Kapoor',
      role: 'Yoga & Wellness Creator',
      img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'
    }
  ];

  return (
    <section className="testimonial-section">

      <div className="container testimonial-container">

        {/* =========================
            TESTIMONIAL CARD
        ========================= */}

        <div className="testimonial-card">

          <h2>
            “{quotes[i].text}”
          </h2>

          <div className="testimonial-person">

            <img
              src={quotes[i].img}
              alt={quotes[i].name}
              className="testimonial-avatar"
            />

            <div>
              <div className="testimonial-name">
                {quotes[i].name}
              </div>

              <div className="testimonial-role">
                {quotes[i].role}
              </div>
            </div>

          </div>


          {/* Dots */}

          <div className="testimonial-dots">

            {[0, 1, 2].map((n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Show testimonial ${n + 1}`}
                className={`testimonial-dot ${
                  n === i ? 'active' : ''
                }`}
              />
            ))}

          </div>

        </div>


        {/* =========================
            IMAGE
        ========================= */}

        <div className="testimonial-image-wrapper">

          <img
            src={sunsetimage}
            alt="Travel"
            className="testimonial-image"
          />

          {/*
          <div className="testimonial-image-text">
            New Places<br />
            New Stories<br />
            Same You ♡
          </div>
          */}

        </div>

      </div>


      {/* =========================
          RESPONSIVE CSS
      ========================= */}

      <style>{`

        /* =====================================
           SECTION
        ===================================== */

        .testimonial-section {
          width: 100%;

          background: #f6f2fa;

          padding: 25px 0;

          box-sizing: border-box;

          overflow: hidden;
        }


        /* =====================================
           MAIN CONTAINER
        ===================================== */

        .testimonial-container {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 40px;

          align-items: center;
        }


        /* =====================================
           TESTIMONIAL CARD
        ===================================== */

        .testimonial-card {
          width: 100%;

          box-sizing: border-box;

          background: #fff;

          border-radius: 28px;

          padding: 36px;

          box-shadow:
            0 12px 40px rgba(74, 29, 122, 0.08);
        }


        /* =====================================
           QUOTE
        ===================================== */

        .testimonial-card h2 {
          margin: 0 0 16px;

          font-size: 1.6rem;

          font-weight: 800;

          letter-spacing: -0.03em;

          line-height: 1.2;

          color: var(--text-dark, #1f1630);
        }


        /* =====================================
           PERSON
        ===================================== */

        .testimonial-person {
          display: flex;

          align-items: center;

          gap: 12px;

          margin-bottom: 20px;
        }


        /* =====================================
           AVATAR
        ===================================== */

        .testimonial-avatar {
          width: 56px !important;

          height: 56px !important;

          min-width: 56px;

          border-radius: 50%;

          object-fit: cover !important;

          box-shadow:
            0 4px 12px rgba(74, 29, 122, 0.15);

          display: block;

          max-width: none !important;
        }


        /* =====================================
           NAME
        ===================================== */

        .testimonial-name {
          font-weight: 700;

          line-height: 1.3;
        }


        /* =====================================
           ROLE
        ===================================== */

        .testimonial-role {
          font-size: 0.82rem;

          color: var(--text-muted, #777);

          margin-top: 2px;
        }


        /* =====================================
           DOTS
        ===================================== */

        .testimonial-dots {
          display: flex;

          gap: 8px;

          align-items: center;
        }


        .testimonial-dot {
          width: 10px;

          height: 10px;

          padding: 0;

          border-radius: 50%;

          border: none;

          background: var(--lavender, #ddd0ef);

          cursor: pointer;

          flex: 0 0 auto;

          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }


        .testimonial-dot.active {
          background: var(--purple-deep, #4a1d7a);

          transform: scale(1.15);
        }


        /* =====================================
           IMAGE WRAPPER
        ===================================== */

        .testimonial-image-wrapper {
          position: relative;

          width: 100%;

          min-width: 0;
        }


        /* =====================================
           IMAGE
        ===================================== */

        .testimonial-image {
          display: block;

          width: 100% !important;

          height: 238px !important;

          max-width: none !important;

          border-radius: 28px;

          object-fit: cover !important;

          object-position: center;

          box-sizing: border-box;
        }


        /* =====================================
           OPTIONAL IMAGE TEXT
        ===================================== */

        .testimonial-image-text {
          position: absolute;

          bottom: 30px;

          left: 30px;

          font-family: 'Caveat', cursive;

          font-size: 1.8rem;

          color: #fff;

          background: rgba(74, 29, 122, 0.75);

          padding: 10px 18px;

          border-radius: 16px;

          backdrop-filter: blur(4px);

          line-height: 1.2;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .testimonial-container {
            grid-template-columns: 1fr 1fr;

            gap: 24px;
          }

          .testimonial-card {
            padding: 28px;

            border-radius: 24px;
          }

          .testimonial-card h2 {
            font-size: 1.4rem;
          }

          .testimonial-image {
            height: 220px !important;

            border-radius: 24px;
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 640px) {

          .testimonial-section {
            padding: 35px 0;
          }


          /*
             IMPORTANT:
             Change the two-column layout
             into one column.
          */

          .testimonial-container {
            width: 100% !important;

            max-width: none !important;

            padding:
              0
              16px !important;

            box-sizing: border-box;

            display: grid;

            grid-template-columns: 1fr;

            gap: 24px;
          }


          /* Testimonial card */

          .testimonial-card {
            width: 100%;

            padding: 24px;

            border-radius: 22px;
          }


          .testimonial-card h2 {
            font-size: clamp(
              1.3rem,
              5vw,
              1.6rem
            );

            line-height: 1.25;

            margin-bottom: 18px;
          }


          /* Person */

          .testimonial-person {
            gap: 10px;

            margin-bottom: 18px;
          }


          .testimonial-avatar {
            width: 52px !important;

            height: 52px !important;

            min-width: 52px;
          }


          .testimonial-name {
            font-size: 0.95rem;
          }


          .testimonial-role {
            font-size: 0.78rem;
          }


          /* Image */

          .testimonial-image-wrapper {
            width: 100%;
          }


          .testimonial-image {
            width: 100% !important;

            height: 240px !important;

            max-width: none !important;

            border-radius: 22px;

            object-fit: cover !important;
          }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 400px) {

          .testimonial-section {
            padding: 30px 0;
          }


          .testimonial-container {
            padding:
              0
              12px !important;

            gap: 20px;
          }


          .testimonial-card {
            padding: 20px;

            border-radius: 20px;
          }


          .testimonial-card h2 {
            font-size: 1.25rem;

            line-height: 1.28;
          }


          .testimonial-avatar {
            width: 48px !important;

            height: 48px !important;

            min-width: 48px;
          }


          .testimonial-image {
            height: 210px !important;

            border-radius: 20px;
          }

        }


        /* =====================================
           VERY SMALL MOBILE
        ===================================== */

        @media (max-width: 340px) {

          .testimonial-container {
            padding:
              0
              10px !important;
          }


          .testimonial-card {
            padding: 18px;
          }


          .testimonial-card h2 {
            font-size: 1.18rem;
          }


          .testimonial-image {
            height: 190px !important;
          }

        }

      `}</style>

    </section>
  );
}