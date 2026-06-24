import "../styles/Livebooks.css";

const categories = [
  {
    id: "class12",
    icon: "📋",
    iconClass: "lb-icon--class12",
    cardClass: "lb-card--class12",
    title: "Class 12",
    desc: "Complete Class 12 Chemistry — from Electrochemistry to Polymers",
    count: "38 Books",
  },
  {
    id: "class11",
    icon: "🧪",
    iconClass: "lb-icon--class11",
    cardClass: "lb-card--class11",
    title: "Class 11",
    desc: "Build your foundation — Atomic Structure, Bonding & Thermodynamics",
    count: "34 Books",
  },
  {
    id: "neet",
    icon: "⚛️",
    iconClass: "lb-icon--neet",
    cardClass: "lb-card--neet",
    title: "NEET / JEE Notes",
    desc: "Curated revision notes & shortcuts for competitive exam success",
    count: "52 Notes",
  },
];

export default function LiveBooks({ onBack, onSelectCategory }) {
  return (
    <div className="lb-root">

      {/* Topbar */}
      <div className="lb-topbar">
        <div className="lb-top-left">
          <div className="lb-logo-area">
            <div className="lb-logo-circle">C</div>
            <div>
              <div className="lb-logo-title">ChemIQ</div>
              <div className="lb-logo-sub">LEARN • EXPLORE • DISCOVER</div>
            </div>
          </div>
          <div className="lb-divider" />
          <div className="lb-page-title">
            <span className="lb-page-title-icon">📖</span>
            <span>Live Books</span>
          </div>
        </div>
        <button className="lb-back-btn" onClick={onBack}>
          ← Back to Home
        </button>
      </div>

      {/* Hero */}
      <div className="lb-hero">
        <div className="lb-hero-eyebrow">YOUR LIBRARY</div>
        <h1 className="lb-hero-title">
          Choose Your <span className="lb-hero-accent">Study Set</span>
        </h1>
        <p className="lb-hero-sub">
          Select a category below to dive into interactive
          <br />
          chemistry books & notes.
        </p>
      </div>

      {/* Cards */}
      <div className="lb-cards-row">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`lb-card ${cat.cardClass}`}
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
          >
            <div className={`lb-icon-box ${cat.iconClass}`}>
              <span>{cat.icon}</span>
            </div>
            <div className="lb-card-title">{cat.title}</div>
            <div className="lb-card-desc">{cat.desc}</div>
            <div className="lb-count-badge">
              <span>📚</span>
              {cat.count}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}