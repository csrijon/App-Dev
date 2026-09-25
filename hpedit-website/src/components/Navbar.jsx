import { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/discover', label: 'Discover' },
  { to: '#FeaturedCreators', label: 'For Creators', isHash: true },
  { to: '/about', label: 'About' },
];

function SearchBox({ className = '' }) {
  return (
    <div className={`nb-search ${className}`} role="search">
      <input
        type="text"
        placeholder="Search creators, skills, or interests..."
        aria-label="Search creators, skills, or interests"
      />

      <Search size={16} aria-hidden="true" />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu with Escape
  // Close menu automatically when switching to desktop
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const mediaQuery = window.matchMedia('(min-width: 1021px)');

    const onChange = (e) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
      mediaQuery.addListener(onChange);
    }

    return () => {
      window.removeEventListener('keydown', onKey);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onChange);
      } else {
        mediaQuery.removeListener(onChange);
      }
    };
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <header className="nb-header">

      {/* ==============================
          MAIN NAVBAR
      ============================== */}

      <nav
        className="container nb-bar"
        aria-label="Main navigation"
      >

        {/* LOGO */}

        <Link
          to="/"
          className="nb-logo"
          onClick={() => {
            close();
            window.scrollTo(0, 0);
          }}
        >
          HPEDIT<span>+</span>
        </Link>


        {/* ==============================
            DESKTOP LINKS
        ============================== */}

        <div className="nb-links">

          {LINKS.map((l) =>
            l.isHash ? (
              <a
                key={l.to}
                href={l.to}
                className="nb-link"
                onClick={close}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="nb-link"
                onClick={() => {
                  close();
                  window.scrollTo(0, 0);
                }}
              >
                {l.label}
              </Link>
            )
          )}

          <Link
            to="/help"
            className="nb-link"
            onClick={() => {
              close();
              window.scrollTo(0, 0);
            }}
          >
            Help
          </Link>

        </div>


        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="nb-right">

          {/* Desktop / Tablet Search */}

          <SearchBox className="nb-search-header" />


          {/* Desktop Get Started */}

          <Link
            to="/for-creators"
            className="btn-primary nb-cta"
            onClick={() => {
              close();
              window.scrollTo(0, 0);
            }}
          >
            Get Started →
          </Link>


          {/* Mobile Hamburger */}

          <button
            type="button"
            className="nb-hamburger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nb-mobile-menu"
          >
            {open ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

      </nav>


      {/* ==============================
          MOBILE / TABLET MENU
      ============================== */}

      <div
        id="nb-mobile-menu"
        className={`nb-mobile ${open ? 'nb-mobile-open' : ''}`}
      >

        <div className="nb-mobile-inner">

          {/* =================================
              MOBILE SEARCH
          ================================= */}

          <SearchBox className="nb-search-mobile" />


          {/* =================================
              MOBILE LINKS
          ================================= */}

          {LINKS.map((l) =>
            l.isHash ? (
              <a
                key={l.to}
                href={l.to}
                className="nb-mobile-link"
                onClick={close}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="nb-mobile-link"
                onClick={() => {
                  close();
                  window.scrollTo(0, 0);
                }}
              >
                {l.label}
              </Link>
            )
          )}


          {/* =================================
              HELP
          ================================= */}

          <Link
            to="/help"
            className="nb-mobile-link"
            onClick={() => {
              close();
              window.scrollTo(0, 0);
            }}
          >
            Help
          </Link>


          {/* =================================
              GET STARTED
          ================================= */}

          <Link
            to="/for-creators"
            className="btn-primary nb-mobile-cta"
            onClick={() => {
              close();
              window.scrollTo(0, 0);
            }}
          >
            Get Started →
          </Link>

        </div>

      </div>


      {/* ==============================
          RESPONSIVE CSS
      ============================== */}

      <style>{`

        /* =========================================
           NAVBAR
        ========================================= */

        .nb-header {
          position: sticky;
          top: 0;
          z-index: 1000;

          width: 100%;

          background: rgba(255, 255, 255, 0.92);

          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);

          border-bottom: 1px solid rgba(74, 29, 122, 0.06);

          overflow-x: clip;
        }


        /* =========================================
           MAIN BAR
        ========================================= */

        .nb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          height: 72px;

          box-sizing: border-box;
        }


        /* =========================================
           LOGO
        ========================================= */

        .nb-logo {
          flex: 0 0 auto;

          display: inline-flex;
          align-items: center;

          font-family: 'Inter', sans-serif;

          font-weight: 900;
          font-size: 1.6rem;

          letter-spacing: -0.04em;

          color: var(--purple-deep, #4a1d7a);

          text-decoration: none;

          white-space: nowrap;

          visibility: visible;
          opacity: 1;
        }

        .nb-logo span {
          color: var(--purple-soft, #7c3aed);
          margin-left: 2px;
        }


        /* =========================================
           DESKTOP LINKS
        ========================================= */

        .nb-links {
          display: flex;
          align-items: center;

          gap: 28px;

          font-weight: 500;
          font-size: 0.92rem;

          color: var(--text-dark);

          flex: 0 1 auto;
        }

        .nb-link {
          color: inherit;

          text-decoration: none;

          white-space: nowrap;

          transition: color 0.2s ease;
        }

        .nb-link:hover {
          color: var(--purple-deep);
        }


        /* =========================================
           RIGHT SIDE
        ========================================= */

        .nb-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 14px;

          flex: 1;

          min-width: 0;
        }


        /* =========================================
           SEARCH
        ========================================= */

        .nb-search {
          position: relative;

          display: flex;
          align-items: center;

          width: 240px;
          min-width: 0;
        }

        .nb-search input {
          width: 100%;

          height: 38px;

          padding: 8px 36px 8px 16px;

          border: 1px solid rgba(74, 29, 122, 0.15);

          border-radius: 100px;

          background: #fff;

          color: var(--text-dark);

          font-size: 0.85rem;

          outline: none;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;

          box-sizing: border-box;
        }

        .nb-search input::placeholder {
          color: #777;
          opacity: 1;
        }

        .nb-search input:focus {
          border-color: var(--purple-soft);

          box-shadow:
            0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .nb-search svg {
          position: absolute;

          right: 12px;

          color: var(--purple-soft);

          pointer-events: none;
        }


        /* =========================================
           MOBILE SEARCH
        ========================================= */

        .nb-search-mobile {
          display: none;
        }


        /* =========================================
           DESKTOP GET STARTED
        ========================================= */

        .nb-header .nb-cta {
          font-size: 0.85rem;

          padding: 8px 20px;

          white-space: nowrap;

          flex: 0 0 auto;

          text-decoration: none;
        }


        /* =========================================
           HAMBURGER
        ========================================= */

        .nb-hamburger {
          display: none;

          align-items: center;
          justify-content: center;

          width: 42px;
          height: 42px;

          padding: 4px;

          background: none;

          border: none;

          border-radius: 8px;

          color: var(--text-dark);

          cursor: pointer;

          flex: 0 0 auto;
        }

        .nb-hamburger:hover {
          background: rgba(74, 29, 122, 0.06);
        }


        /* =========================================
           FOCUS
        ========================================= */

        .nb-logo:focus-visible,
        .nb-link:focus-visible,
        .nb-mobile-link:focus-visible,
        .nb-hamburger:focus-visible {
          outline: 2px solid var(--purple-soft);

          outline-offset: 3px;
        }


        /* =========================================
           MOBILE MENU
        ========================================= */

        .nb-mobile {
          display: none;

          width: 100%;

          box-sizing: border-box;

          background: #fff;

          border-top: 1px solid rgba(74, 29, 122, 0.08);

          overflow-x: hidden;
        }

        .nb-mobile-open {
          display: block;
        }

        .nb-mobile-inner {
          display: flex;

          flex-direction: column;

          gap: 4px;

          width: 100%;

          box-sizing: border-box;
        }


        /* =========================================
           MOBILE LINKS
        ========================================= */

        .nb-mobile-link {
          display: block;

          width: 100%;

          padding: 14px 4px;

          border-bottom: 1px solid rgba(74, 29, 122, 0.08);

          color: var(--text-dark);

          font-weight: 600;

          text-decoration: none;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            padding-left 0.2s ease;
        }

        .nb-mobile-link:hover {
          background: rgba(74, 29, 122, 0.03);

          padding-left: 10px;
        }


        /* =========================================
           MOBILE GET STARTED
        ========================================= */

        .nb-header .nb-mobile-cta {
          display: none;

          align-items: center;
          justify-content: center;

          width: 100%;

          box-sizing: border-box;

          margin-top: 14px;

          padding: 12px 20px;

          text-align: center;

          text-decoration: none;

          white-space: nowrap;
        }


        /* =========================================
           SMALL LAPTOP
        ========================================= */

        @media (max-width: 1200px) {

          .nb-bar {
            gap: 16px;
          }

          .nb-links {
            gap: 20px;
          }

          .nb-search-header {
            width: 190px;
          }

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1020px) {

          .nb-links {
            display: none;
          }

          .nb-hamburger {
            display: inline-flex;
          }

          .nb-search-header {
            flex: 1;

            width: auto;

            max-width: 280px;
          }

          .nb-search-header input {
            width: 100%;
          }

          .nb-mobile-open {
            padding: 12px 20px 20px;

            background: #fff;

            max-height: calc(100vh - 72px);

            overflow-y: auto;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 640px) {

          .nb-bar {
            width: 100% !important;

            max-width: none !important;

            height: 64px;

            min-height: 64px;

            padding-left: 16px !important;
            padding-right: 16px !important;

            gap: 12px;

            box-sizing: border-box;
          }


          /* Keep logo visible */

          .nb-logo {
            display: inline-flex !important;

            flex: 0 0 auto !important;

            width: max-content !important;

            min-width: max-content !important;

            max-width: none !important;

            font-size: 1.4rem;

            visibility: visible !important;

            opacity: 1 !important;

            white-space: nowrap !important;
          }


          /* Right side */

          .nb-right {
            margin-left: auto;

            gap: 10px;

            flex: 0 0 auto;
          }


          /* Hide desktop search */

          .nb-search-header {
            display: none !important;
          }


          /* Hide desktop Get Started */

          .nb-header .nb-cta {
            display: none;
          }


          /* Hamburger */

          .nb-hamburger {
            display: inline-flex;

            width: 40px;
            height: 40px;
          }


          /* =================================
             MOBILE MENU
          ================================= */

          .nb-mobile-open {
            display: block !important;

            width: 100%;

            max-height: calc(100vh - 64px);

            padding:
              16px
              16px
              28px;

            background: #fff;

            overflow-y: auto;
            overflow-x: hidden;

            box-sizing: border-box;
          }


          .nb-mobile-inner {
            display: flex;

            flex-direction: column;

            width: 100%;

            max-width: none;

            margin: 0 auto;

            gap: 4px;

            box-sizing: border-box;
          }


          /* =================================
             MOBILE SEARCH
          ================================= */

          .nb-mobile .nb-search-mobile {
            display: flex !important;

            position: relative;

            width: 100% !important;

            min-width: 0;

            height: 46px;

            margin:
              4px 0
              12px;

            flex: 0 0 auto;
          }

          .nb-mobile .nb-search-mobile input {
            display: block !important;

            width: 100% !important;

            min-width: 0;

            height: 46px;

            padding:
              11px
              42px
              11px
              16px;

            border: 1px solid rgba(74, 29, 122, 0.15);

            border-radius: 100px;

            background: #fff;

            color: var(--text-dark);

            font-size: 0.95rem;

            outline: none;

            box-sizing: border-box;
          }

          .nb-mobile .nb-search-mobile input::placeholder {
            color: #777;

            opacity: 1;
          }

          .nb-mobile .nb-search-mobile input:focus {
            border-color: var(--purple-soft);

            box-shadow:
              0 0 0 3px rgba(124, 58, 237, 0.12);
          }

          .nb-mobile .nb-search-mobile svg {
            position: absolute;

            right: 14px;

            top: 50%;

            transform: translateY(-50%);

            width: 17px;
            height: 17px;

            color: var(--purple-soft);

            pointer-events: none;
          }


          /* =================================
             MOBILE LINKS
          ================================= */

          .nb-mobile-link {
            min-height: 50px;

            display: flex;

            align-items: center;

            width: 100%;

            padding:
              0
              4px;

            box-sizing: border-box;
          }


          /* =================================
             MOBILE GET STARTED
          ================================= */

          .nb-header .nb-mobile-cta {
            display: flex !important;

            align-items: center;

            justify-content: center;

            width: 100%;

            min-height: 48px;

            margin-top: 18px;

            padding: 12px 20px;

            text-align: center;

            box-sizing: border-box;

            text-decoration: none;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 400px) {

          .nb-bar {
            padding-left: 12px !important;
            padding-right: 12px !important;

            gap: 8px;
          }

          .nb-logo {
            font-size: 1.3rem;
          }

          .nb-hamburger {
            width: 38px;
            height: 38px;
          }

          .nb-mobile-open {
            padding-left: 12px;
            padding-right: 12px;
          }

          .nb-mobile .nb-search-mobile {
            height: 44px;

            margin-top: 4px;
          }

          .nb-mobile .nb-search-mobile input {
            height: 44px;

            font-size: 0.92rem;
          }

          .nb-mobile-link {
            min-height: 48px;
          }

          .nb-header .nb-mobile-cta {
            min-height: 46px;

            margin-top: 16px;
          }

        }


        /* =========================================
           VERY SMALL MOBILE
        ========================================= */

        @media (max-width: 360px) {

          .nb-bar {
            gap: 8px;
          }

          .nb-right {
            gap: 6px;
          }

          .nb-logo {
            font-size: 1.2rem;
          }

          .nb-hamburger svg {
            width: 22px;
            height: 22px;
          }

          .nb-mobile .nb-search-mobile input {
            padding-left: 14px;
            padding-right: 40px;

            font-size: 0.88rem;
          }

        }


        /* =========================================
           LARGE DESKTOP
        ========================================= */

        @media (min-width: 1921px) {

          .nb-bar {
            max-width: 1800px;

            margin-left: auto;
            margin-right: auto;
          }

        }


        /* =========================================
           BOX SIZING
        ========================================= */

        .nb-header,
        .nb-header * {
          box-sizing: border-box;
        }

      `}</style>

    </header>
  );
}