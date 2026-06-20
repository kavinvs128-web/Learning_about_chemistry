// WordsOfWisdom.jsx
// Animated sliding quote carousel for the ChemIQ dashboard.
// Usage: <WordsOfWisdom />

import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/WordsOfWisdom.css";

// ─── Quote data ───────────────────────────────────────────────────────────────
const QUOTES = [
  {
    quote:
      "The more you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Marie Curie",
    title: "First woman to win the Nobel Prize — twice",
    element: { number: 88, symbol: "Ra", name: "Radium",   gradient: "linear-gradient(135deg,#1565c0,#0288d1)" },
  },
  {
    quote:
      "Equipped with his five senses, man explores the universe around him and calls the adventure Science.",
    author: "Edwin Hubble",
    title: "Astronomer who discovered galaxies beyond the Milky Way",
    element: { number: 2,  symbol: "He", name: "Helium",   gradient: "linear-gradient(135deg,#6a1b9a,#ab47bc)" },
  },
  {
    quote:
      "Science is not only a disciple of reason but, also, one of romance and passion.",
    author: "Stephen Hawking",
    title: "Theoretical physicist & cosmologist",
    element: { number: 1,  symbol: "H",  name: "Hydrogen", gradient: "linear-gradient(135deg,#00695c,#26a69a)" },
  },
  {
    quote:
      "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    title: "Physicist, chemist, Nobel Prize winner",
    element: { number: 84, symbol: "Po", name: "Polonium", gradient: "linear-gradient(135deg,#b71c1c,#e53935)" },
  },
  {
    quote:
      "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    author: "Albert Einstein",
    title: "Developed the theory of relativity",
    element: { number: 79, symbol: "Au", name: "Gold",     gradient: "linear-gradient(135deg,#e65100,#ffa726)" },
  },
];

const SLIDE_DURATION = 10000; // ms between auto-slides
const TICK_INTERVAL  = 100;  // ms per progress tick
const STEP = 100 / (SLIDE_DURATION / TICK_INTERVAL); // % added each tick

// ─── Element badge ─────────────────────────────────────────────────────────────
function ElementBadge({ element }) {
  return (
    <div className="wow-element-badge" style={{ background: element.gradient }}>
      <span className="wow-el-num">{element.number}</span>
      <span className="wow-el-sym">{element.symbol}</span>
      <span className="wow-el-name">{element.name}</span>
    </div>
  );
}

// ─── Single slide ──────────────────────────────────────────────────────────────
function Slide({ quote, author, title, element }) {
  return (
    <div className="wow-slide">
      <ElementBadge element={element} />
      <div className="wow-slide-text">
        <p className="wow-quote">&#8220;{quote}&#8221;</p>
        <div className="wow-author-row">
          <span className="wow-author-line" />
          <div>
            <div className="wow-author-name">{author}</div>
            <div className="wow-author-title">{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function WordsOfWisdom() {
  const [current,  setCurrent]  = useState(0);
  const [progress, setProgress] = useState(0);

  const autoTimer     = useRef(null);
  const progressTimer = useRef(null);
  const touchStartX   = useRef(0);

  const total = QUOTES.length;

  // ── Navigate to a slide ────────────────────────────────────────────────────
  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
  }, [total]);

  // ── Auto-advance every SLIDE_DURATION ms ───────────────────────────────────
  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, SLIDE_DURATION);
  }, [total]);

  // ── Progress bar ───────────────────────────────────────────────────────────
  // FIX: Never call setProgress(0) directly in the effect body.
  // Instead, use a local `ticks` counter inside the interval callback
  // and derive the progress value from it — no synchronous setState in effect.
  useEffect(() => {
    clearInterval(progressTimer.current);

    let ticks = 0; // local counter — resets automatically when effect re-runs

    progressTimer.current = setInterval(() => {
      ticks += 1;
      const value = Math.min(ticks * STEP, 100);
      setProgress(value); // safe: called inside async callback, not effect body
    }, TICK_INTERVAL);

    return () => {
      clearInterval(progressTimer.current);
      setProgress(0); // safe: called inside cleanup function, not effect body
    };
  }, [current]); // re-runs whenever slide changes → ticks resets to 0

  // ── Start auto-advance on mount ────────────────────────────────────────────
  useEffect(() => {
    startAuto();
    return () => clearInterval(autoTimer.current);
  }, [startAuto]);

  // ── Nav handlers ──────────────────────────────────────────────────────────
  const handlePrev = () => { goTo(current - 1); startAuto(); };
  const handleNext = () => { goTo(current + 1); startAuto(); };

  // ── Touch / swipe support ──────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff > 0 ? 1 : -1));
      startAuto();
    }
  };

  return (
    <div
      className="wow-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Kicker label */}
      <p className="wow-kicker">
        <span className="wow-kicker-star">✦</span> Words of Wisdom
      </p>

      {/* Slides viewport */}
      <div className="wow-viewport">
        <div
          className="wow-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {QUOTES.map((q, i) => (
            <Slide key={i} {...q} />
          ))}
        </div>
      </div>

      {/* Footer — dots + navigation */}
      <div className="wow-footer">

        {/* Dot indicators */}
        <div className="wow-dots" role="tablist" aria-label="Slide indicators">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
              className={`wow-dot${i === current ? " active" : ""}`}
              onClick={() => { goTo(i); startAuto(); }}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="wow-nav">
          <button
            className="wow-nav-btn"
            onClick={handlePrev}
            aria-label="Previous quote"
          >
            &#8592;
          </button>
          <button
            className="wow-nav-btn"
            onClick={handleNext}
            aria-label="Next quote"
          >
            &#8594;
          </button>
        </div>

      </div>

      {/* Cyan → violet progress bar at bottom */}
      <div
        className="wow-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}