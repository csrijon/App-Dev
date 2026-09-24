import React from "react";
import { Heart, Zap, Palette, Monitor, Play, ArrowRight } from "lucide-react";
import backgroudimage from "../assets/normal backgroud.png";
import PHOTO_MAIN from "../assets/ladyimage-removebg-preview.png";

/**
 * CreatorHero  (desktop layout = the design screenshot)
 *
 *   col 1        col 2                        col 3          col 4
 *  ┌────────┬─────────────────────────────┬──────────────┬────────────┐
 *  │ note   │ small heading               │ note         │ polaroids  │
 *  │ (top)  │ BIG heading                 │ woman photo  │ (top)      │
 *  │        │ subtitle + buttons          │ (bottom)     │            │
 *  ├────────┴─────────────────────────────┤              │ note+arrow │
 *  │ features row (starts at left margin) │              │            │
 *  └──────────────────────────────────────┴──────────────┴────────────┘
 *
 * Everything is TOP / LEFT aligned. Nothing is vertically or horizontally
 * centred, and there is no max-width, so it spans the full page width.
 *
 * Requires only lucide-react:  npm install lucide-react
 *
 * TUNING KNOBS
 *  - PHOTO_SCALE : make the woman bigger / smaller inside her column
 *  - PHOTO_*     : replace the placeholder polaroid images
 */

const PHOTO_SCALE = 1.15;

const PHOTO_CREATE = "https://picsum.photos/seed/creator-hero-create/300/300";
const PHOTO_SHARE = "https://picsum.photos/seed/creator-hero-share/300/300";
const PHOTO_INSPIRE = "https://picsum.photos/seed/creator-hero-inspire/300/300";
const PHOTO_BELONG = "https://picsum.photos/seed/creator-hero-belong/300/300";

const FEATURES = [
  { icon: Zap, title: "Fast & Easy", subtitle: "Get online in minutes", fill: "#fbbf24", stroke: "#f97316" },
  { icon: Palette, title: "Beautiful Designs", subtitle: "Made for creators", fill: "#c4b5fd", stroke: "#7c3aed" },
  { icon: Monitor, title: "Works Everywhere", subtitle: "Mobile, tablet, desktop", fill: "#7c3aed", stroke: "#4c1d95" },
  { icon: Heart, title: "100% You", subtitle: "Share your story your way", fill: "#7c3aed", stroke: "#5b21b6" },
];

const POLAROIDS = [
  { label: "Create", src: PHOTO_CREATE, rotate: "rotate(-4deg)" },
  { label: "Share", src: PHOTO_SHARE, rotate: "rotate(3deg)" },
  { label: "Inspire", src: PHOTO_INSPIRE, rotate: "rotate(-3deg)" },
  { label: "Belong", src: PHOTO_BELONG, rotate: "rotate(3deg)" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ch-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #efe8fb;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Plus Jakarta Sans', Inter, system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #12093a;
  text-align: left;            /* override any global "center" rule */
}
.ch-section * { box-sizing: border-box; }
.ch-hand {
  font-family: 'Caveat', 'Segoe Script', 'Bradley Hand', cursive;
  color: #2b1a6e;
  font-weight: 600;
}

/* ================= GRID ================= */
.ch-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  width: 100%;
  margin: 0;                   /* no auto-centering */
  padding: 32px 5% 36px;
  text-align: left;
}

@media (min-width: 1024px) {
  .ch-grid {
    grid-template-columns:
      minmax(90px, 1.2fr)
      minmax(300px, 3.3fr)
      minmax(200px, 3.8fr)
      minmax(190px, 1.9fr);
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 18px;
    align-items: start;        /* TOP aligned, not centred */
    padding: 20px 3% 30px 4%;
  }
  .ch-note-left  { grid-column: 1;     grid-row: 1; }
  .ch-text       { grid-column: 2;     grid-row: 1; }
  .ch-features   { grid-column: 1 / 3; grid-row: 2; }
  .ch-photo      { grid-column: 3;     grid-row: 1 / 3; }
  .ch-polaroids  { grid-column: 4;     grid-row: 1 / 3; }
}

/* ================= HANDWRITTEN NOTES (desktop only) ================= */
.ch-note-left,
.ch-note-mid,
.ch-note-bottom { display: none; }

@media (min-width: 1024px) {
  .ch-note-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    transform: rotate(-8deg);
    text-align: center;
  }
  .ch-note-left p {
    margin: 0;
    font-size: clamp(1.4rem, 2.15vw, 1.95rem);
    line-height: 0.95;
  }
  .ch-note-left svg { margin: 8px 0 0 44px; }

  .ch-note-mid {
    display: block;
    position: absolute;
    top: 6%;
    left: -8px;
    z-index: 3;
    transform: rotate(-9deg);
    transform-origin: left top;
    text-align: left;
    font-size: clamp(1.3rem, 1.95vw, 1.75rem);
    line-height: 0.95;
  }
  .ch-note-mid p { margin: 0; }
  .ch-note-mid svg { display: block; margin-top: 8px; }

  .ch-note-bottom {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    position: absolute;
    right: -2%;
    bottom: -14px;
    z-index: 3;
  }
  .ch-note-bottom p {
    margin: 0 0 4px;
    font-size: clamp(1.05rem, 1.55vw, 1.4rem);
    line-height: 0.95;
    text-align: left;
    transform: rotate(-22deg);
    transform-origin: left bottom;
  }
  .ch-note-bottom svg { width: 38px; height: 54px; flex-shrink: 0; }
}

/* ================= TEXT BLOCK ================= */
.ch-text {
  position: relative;
  z-index: 2;
  text-align: left;
}

.ch-h1 {
  margin: 0;
  color: #12093a;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  text-align: left;
}
.ch-h1-small {
  display: block;
  margin-bottom: 6px;
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  font-weight: 500;
  letter-spacing: 0.005em;
}
.ch-h1-big {
  display: block;
  font-size: clamp(2.4rem, 4.2vw, 3.7rem);
  line-height: 0.98;
}
.ch-underline {
  position: relative;
  display: inline-block;
}
.ch-underline svg {
  position: absolute;
  left: -1%;
  bottom: -0.06em;
  width: 102%;
  height: 0.14em;
  overflow: visible;
}

.ch-sub {
  margin: 14px 0 0;
  max-width: 420px;
  font-size: clamp(0.85rem, 1.1vw, 0.98rem);
  font-weight: 500;
  color: #3d3a5c;
  text-align: left;
}

/* ================= BUTTONS ================= */
.ch-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 16px;
}
.ch-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.85em 1.5em;
  border-radius: 999px;
  font-family: inherit;
  font-size: clamp(0.8rem, 1.05vw, 0.92rem);
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}
.ch-btn:focus-visible { outline: 3px solid #a78bfa; outline-offset: 3px; }
.ch-btn:active { transform: translateY(1px); }

.ch-btn-primary {
  background: #43189c;
  color: #fff;
  border: none;
  box-shadow: 0 8px 18px rgba(67, 24, 156, 0.3);
}
.ch-btn-primary:hover { background: #5521c4; }

.ch-btn-secondary {
  background: #fff;
  color: #12093a;
  border: 1px solid #e7e0f7;
  padding-left: 0.9em;
  box-shadow: 0 4px 12px rgba(67, 24, 156, 0.08);
}
.ch-btn-secondary:hover { background: #f8f5ff; }
.ch-play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.95em;
  height: 1.95em;
  border-radius: 50%;
  border: 1.5px solid #43189c;
  color: #43189c;
}

/* ================= FEATURES ================= */
.ch-features {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 12px;
  text-align: center;          /* text is centred UNDER each icon only */
}
@media (min-width: 640px) {
  .ch-features { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 1024px) {
  .ch-features {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    padding-right: 8px;
  }
}
.ch-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.ch-feature-title {
  margin: 0;
  font-size: clamp(0.74rem, 0.92vw, 0.84rem);
  font-weight: 700;
  color: #12093a;
  white-space: nowrap;
}
.ch-feature-sub {
  margin: 0;
  font-size: clamp(0.68rem, 0.82vw, 0.76rem);
  font-weight: 500;
  color: #5b5878;
  white-space: nowrap;
}

/* ================= WOMAN PHOTO ================= */
.ch-photo {
  position: relative;
  z-index: 1;
  min-height: 340px;
}
.ch-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;   /* stays glued to the bottom edge */
  transform: scale(var(--photo-scale, 1.15));
  transform-origin: center bottom;
  pointer-events: none;
}
@media (min-width: 1024px) {
  .ch-photo {
    align-self: stretch;            /* full height of the banner */
    min-height: 0;
    margin: -20px -40px -30px 0;    /* touch top + bottom edges, slide under polaroids */
  }
}

/* ================= POLAROIDS ================= */
.ch-polaroids {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
}
@media (min-width: 1024px) {
  .ch-polaroids {
    align-self: stretch;
    justify-content: flex-end;
    align-items: flex-start;
  }
}
.ch-pol-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 10px;
  width: 100%;
  max-width: 200px;
}
@media (min-width: 640px) and (max-width: 1023px) {
  .ch-pol-grid { grid-template-columns: repeat(4, 1fr); max-width: 460px; }
}
.ch-pol {
  margin: 0;
  background: #fff;
  padding: 5px 5px 0;
  box-shadow:
    0 2px 4px rgba(46, 20, 110, 0.1),
    0 10px 22px rgba(46, 20, 110, 0.16);
}
.ch-pol:nth-child(2) { margin-top: 6px; }
.ch-pol:nth-child(3) { margin-left: -8px; }
.ch-pol img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 0.85;
  object-fit: cover;
}
.ch-pol span {
  display: block;
  padding: 6px 0 7px;
  text-align: center;
  font-size: 1.05rem;
  line-height: 1;
}
`;

export default function CreatorHero() {
  return (
    <>
      <style>{css}</style>

      <section
        className="ch-section"
        style={{ backgroundImage: `url("${backgroudimage}")` }}
      >
        <div className="ch-grid">
          {/* col 1 : left handwritten note (top-left) */}
          <div className="ch-note-left ch-hand" aria-hidden="true">
            <p>
              Creators
              <br />
              Build
              <br />
              Brighter
              <br />
              Worlds
            </p>
            <Heart size={16} strokeWidth={2} color="#2b1a6e" />
          </div>

          {/* col 2 : heading, subtitle, buttons */}
          <div className="ch-text">
            <h1 className="ch-h1">
              <span className="ch-h1-small">Turn Your Passion Into A</span>
              <span className="ch-h1-big ch-underline">
                Beautiful
                <svg viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M2 8 C 50 3, 130 10, 218 4"
                    fill="none"
                    stroke="#6d28d9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="ch-h1-big">Online Home</span>
            </h1>

            <p className="ch-sub">
              Stunning portfolio websites for creators, by creators.
            </p>

            <div className="ch-actions">
              <button type="button" className="ch-btn ch-btn-primary">
                Create Your Portfolio
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>

              <button type="button" className="ch-btn ch-btn-secondary">
                <span className="ch-play">
                  <Play size={11} fill="currentColor" strokeWidth={0} />
                </span>
                Watch How It Works
              </button>
            </div>
          </div>

          {/* row 2 : features (starts at the far-left margin, under the note) */}
          <div className="ch-features">
            {FEATURES.map(({ icon: Icon, title, subtitle, fill, stroke }) => (
              <div className="ch-feature" key={title}>
                <Icon size={30} fill={fill} stroke={stroke} strokeWidth={1.8} />
                <div>
                  <p className="ch-feature-title">{title}</p>
                  <p className="ch-feature-sub">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* col 3 : woman photo (bottom) + handwritten note (top) */}
          <div className="ch-photo" style={{ "--photo-scale": PHOTO_SCALE }}>
            <div className="ch-note-mid ch-hand" aria-hidden="true">
              <p>
                Same
                <br />
                Passion
                <br />
                Bigger
                <br />
                Opportunities
              </p>
              <Heart size={16} strokeWidth={2} color="#2b1a6e" />
            </div>

            <img src={PHOTO_MAIN} alt="Creator holding a camera" />
          </div>

          {/* col 4 : polaroids (top) + bottom-right note */}
          <div className="ch-polaroids">
            <div className="ch-pol-grid">
              {POLAROIDS.map(({ label, src, rotate }) => (
                <figure
                  key={label}
                  className="ch-pol"
                  style={{ transform: rotate }}
                >
                  <img src={src} alt={label} />
                  <span className="ch-hand">{label}</span>
                </figure>
              ))}
            </div>

            <div className="ch-note-bottom ch-hand" aria-hidden="true">
              <svg viewBox="0 0 38 54" fill="none">
                <path
                  d="M34 50 C 14 50, 3 34, 8 8"
                  stroke="#2b1a6e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M2 17 L8 6 L16 14"
                  stroke="#2b1a6e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>
                Create
                <br />
                Share
                <br />
                Inspire
                <br />
                Belong
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}