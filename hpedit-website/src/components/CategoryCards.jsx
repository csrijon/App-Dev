
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const cats = [
  {
    name: 'Lifestyle',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80',
  },
  {
    name: 'Travel',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
  },
  {
    name: 'Fashion',
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
  },
  {
    name: 'Fitness',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
  },
  {
    name: 'Food',
    img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80',
  },
  {
    name: 'Music',
    img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  },
  {
    name: 'Pets',
    img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&q=80',
  },
  {
    name: 'Art & Design',
    img: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80',
  },
  {
    name: 'Business',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
  },
];

export default function CategoryCards() {
  return (
    <section
      className="category-section"
      onMouseEnter={(e) => {
        const track = e.currentTarget.querySelector(
          '.category-scroll-track'
        );

        if (track) {
          track.style.animationPlayState = 'paused';
        }
      }}
      onMouseLeave={(e) => {
        const track = e.currentTarget.querySelector(
          '.category-scroll-track'
        );

        if (track) {
          track.style.animationPlayState = 'running';
        }
      }}
    >
      <div className="category-container">
        <div className="category-scroll-track">
          {[...cats, ...cats].map((c, i) => (
            <a
              href="#"
              key={`${c.name}-${i}`}
              className="category-card"
            >
              {/* Category Image */}
              <img
                src={c.img}
                alt={c.name}
                className="category-card-image"
              />

              {/* Purple Gradient Overlay */}
              <div className="category-overlay" />

              {/* Category Name */}
              <div className="category-name">
                {c.name}
              </div>

              {/* Arrow Button */}
              <div className="category-arrow">
               <ArrowForwardIcon sx={{ fontSize: 22 }} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* =====================================================
           CATEGORY SECTION
        ===================================================== */

        .category-section {
          width: 100%;
          background: #fff;
          padding: 60px 0 40px;
          overflow: hidden;
        }

        /* =====================================================
           CONTAINER
        ===================================================== */

        .category-container {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          scrollbar-width: none;
        }

        .category-container::-webkit-scrollbar {
          display: none;
        }

        /* =====================================================
           INFINITE SCROLL TRACK
        ===================================================== */

        .category-scroll-track {
          display: flex;
          align-items: stretch;
          gap: 16px;

          width: max-content;
          min-width: max-content;

          animation: categoryScrollLeft 30s linear infinite;

          will-change: transform;
        }

        /* =====================================================
           CATEGORY CARD
        ===================================================== */

        .category-card {
          position: relative;

          display: block;

          width: 220px;
          height: 300px;

          flex: 0 0 220px;

          border-radius: 24px;
          overflow: hidden;

          background: #eee;

          text-decoration: none;

          box-shadow:
            0 8px 24px rgba(74, 29, 122, 0.12);
        }

        /* =====================================================
           IMAGE
           
           IMPORTANT:
           Do NOT use global:
           
           img {
             height: auto !important;
           }
           
           because it overrides height: 100%.
        ===================================================== */

        .category-card-image {
          display: block;

          width: 100% !important;
          height: 100% !important;

          max-width: none !important;
          max-height: none !important;

          object-fit: cover;
          object-position: center;

          transition: transform 0.6s ease;
        }

        /* Image hover */

        .category-card:hover .category-card-image {
          transform: scale(1.05);
        }

        /* =====================================================
           PURPLE OVERLAY
        ===================================================== */

        .category-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to top,
              rgba(74, 29, 122, 0.85) 0%,
              rgba(74, 29, 122, 0.35) 50%,
              rgba(74, 29, 122, 0.15) 100%
            );

          z-index: 1;

          pointer-events: none;
        }

        /* =====================================================
           CATEGORY NAME
        ===================================================== */

        .category-name {
          position: absolute;

          left: 16px;
          bottom: 20px;

          z-index: 2;

          color: #fff;

          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.2;

          max-width: calc(100% - 70px);

          pointer-events: none;
        }

        /* =====================================================
           ARROW
        ===================================================== */

        .category-arrow {
          position: absolute;

          right: 16px;
          bottom: 16px;

          z-index: 2;
        }

        .category-arrow span {
          width: 36px;
          height: 36px;

          border-radius: 50%;

          background: #fff;

          color: var(--purple-deep);

          display: inline-flex;
          align-items: center;
          justify-content: center;

          font-weight: 700;
          font-size: 18px;

          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.12);
        }

        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes categoryScrollLeft {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {
          .category-section {
            padding: 50px 0 35px;
          }

          .category-scroll-track {
            gap: 15px;
          }

          .category-card {
            width: 210px;
            height: 285px;

            flex: 0 0 210px;

            border-radius: 22px;
          }

          .category-card-image {
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 640px) {
          .category-section {
            padding: 40px 0 30px;
          }

          .category-container {
            width: 100%;
            max-width: 100%;
            padding: 0;
            margin: 0;
          }

          .category-scroll-track {
            gap: 14px;
          }

          .category-card {
            width: 190px;
            height: 270px;

            flex: 0 0 190px;

            border-radius: 20px;
          }

          .category-card-image {
            display: block;

            width: 100% !important;
            height: 100% !important;

            max-width: none !important;
            max-height: none !important;

            object-fit: cover !important;
            object-position: center;
          }

          .category-name {
            left: 14px;
            bottom: 18px;

            font-size: 1rem;
          }

          .category-arrow {
            right: 14px;
            bottom: 14px;
          }

          .category-arrow span {
            width: 34px;
            height: 34px;

            font-size: 17px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 400px) {
          .category-card {
            width: 175px;
            height: 250px;

            flex: 0 0 175px;

            border-radius: 19px;
          }

          .category-scroll-track {
            gap: 12px;
          }

          .category-name {
            left: 13px;
            bottom: 17px;

            font-size: 0.95rem;
          }

          .category-arrow {
            right: 13px;
            bottom: 13px;
          }

          .category-arrow span {
            width: 32px;
            height: 32px;
          }
        }

        /* =====================================================
           VERY SMALL MOBILE
        ===================================================== */

        @media (max-width: 360px) {
          .category-card {
            width: 165px;
            height: 240px;

            flex: 0 0 165px;
          }

          .category-scroll-track {
            gap: 11px;
          }
        }

        /* =====================================================
           REDUCE MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .category-scroll-track {
            animation: none;
          }

          .category-card-image {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}