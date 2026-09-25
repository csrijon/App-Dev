export default function CTASection() {
  return (
    <section
      className="cta-section"
      style={{
        position: 'relative',
        minHeight: '500px',
        overflow: 'hidden',
      }}
    >

      {/* Background Image */}
      <img
        className="cta-background"
        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=80"
        alt="Nature"
      />


      {/* Purple Overlay */}
      <div className="cta-overlay" />


      {/* Content */}
      <div
        className="container cta-content"
      >
        <h2>
          Ready to Build Your
          <br />
          Online Home?
        </h2>

        <a
          href="#"
          className="btn-primary cta-button"
        >
          Create Your Portfolio →
        </a>

      </div>


      {/* Responsive CSS */}
      <style>{`

        /* =====================================
           CTA SECTION
        ===================================== */

        .cta-section {
          position: relative;
          width: 100%;
          min-height: 500px;
          overflow: hidden;
        }


        /* =====================================
           BACKGROUND IMAGE
        ===================================== */

        .cta-background {
          position: absolute !important;

          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;

          width: 100% !important;
          height: 100% !important;

          max-width: none !important;

          object-fit: cover !important;

          object-position: center center;

          z-index: 0;

          display: block;

          opacity: 0.85;
        }


        /* =====================================
           PURPLE OVERLAY
        ===================================== */

        .cta-overlay {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          background:
            linear-gradient(
              to top,
              rgba(74, 29, 122, 0.82),
              rgba(74, 29, 122, 0.55)
            );

          z-index: 1;
        }


        /* =====================================
           CONTENT
        ===================================== */

        .cta-content {
          position: relative;

          z-index: 2;

          min-height: 500px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;

          color: #fff;

          box-sizing: border-box;
        }


        /* =====================================
           HEADING
        ===================================== */

        .cta-content h2 {
          margin: 0 0 24px;

          font-size: clamp(
            2.2rem,
            5vw,
            3.8rem
          );

          font-weight: 900;

          letter-spacing: -0.05em;

          line-height: 1.05;
        }


        /* =====================================
           BUTTON
        ===================================== */

        .cta-button {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-height: 48px;

          padding: 12px 32px;

          background: #fff;

          color: var(--purple-deep);

          text-decoration: none;

          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.15);

          border-radius: 999px;

          white-space: nowrap;

          box-sizing: border-box;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 768px) {

          .cta-section {
            min-height: 460px;

            padding: 100px 0;
          }

          .cta-content {
            min-height: 460px;

            padding:
              0
              20px;
          }

          .cta-content h2 {
            font-size: clamp(
              2rem,
              7vw,
              3rem
            );
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 640px) {

          .cta-section {
            min-height: 430px;

            padding: 80px 0;
          }


          /*
             IMPORTANT:
             Do NOT use height:auto on this image.
          */

          .cta-background {
            width: 100% !important;

            height: 100% !important;

            max-width: none !important;

            object-fit: cover !important;

            object-position: center center !important;
          }


          .cta-content {
            min-height: 430px;

            width: 100%;

            padding:
              0
              24px;

            box-sizing: border-box;
          }


          .cta-content h2 {
            font-size: clamp(
              2rem,
              9vw,
              2.8rem
            );

            line-height: 1.05;

            margin-bottom: 24px;
          }


          .cta-button {
            width: 100%;

            max-width: 360px;

            min-height: 48px;

            padding:
              12px
              20px;

            font-size: 0.95rem;
          }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 400px) {

          .cta-section {
            min-height: 400px;

            padding: 70px 0;
          }

          .cta-content {
            min-height: 400px;

            padding:
              0
              20px;
          }

          .cta-content h2 {
            font-size: 2rem;

            letter-spacing: -0.04em;
          }

          .cta-button {
            max-width: 100%;
          }

        }

      `}</style>

    </section>
  );
}