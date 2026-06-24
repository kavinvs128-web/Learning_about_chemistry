import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Zap, RotateCcw, ChevronRight, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import "../styles/OxidationReduction.css";
import careerMap from "../assets/oxidation-career-map.png";
/* ---------- Static content data ---------- */

const sideNavItems = [
  { id: "or-hero", label: "Intro" },
  { id: "or-sec-redox", label: "Redox" },
  { id: "or-sec-electron", label: "Electron transfer" },
  { id: "or-sec-rules", label: "Oxidation rules" },
  { id: "or-sec-agents", label: "Agents" },
  { id: "or-sec-flash", label: "Flashcards" },
  { id: "or-sec-worked", label: "Worked examples" },
  { id: "or-sec-quiz", label: "Quiz" },
  { id: "or-sec-industry", label: "Applications" },
  { id: "or-sec-practice", label: "Practice" },
];

const flashcards = [
  { q: "What does OIL stand for?", a: "Oxidation Is Loss of electrons" },
  { q: "What does RIG stand for?", a: "Reduction Is Gain of electrons" },
  { q: "Oxidation number of free elements?", a: "Always 0 — e.g. Na, H₂, O₂, Cl₂" },
  { q: "Oxidation number of O in a peroxide?", a: "−1 (e.g. in H₂O₂)" },
  { q: "In CuO + H₂ → Cu + H₂O, who's the reducing agent?", a: "H₂ — it gets oxidized to H₂O" },
  { q: "Mn oxidation number in KMnO₄?", a: "+7" },
];

/* Mid-page inline quiz data */
const midQuizData = [
  {
    q: "Cu + Cl₂ → CuCl₂ — what is Cl₂ here?",
    options: ["Oxidizing agent", "Reducing agent", "Neither", "Both"],
    correct: 0,
    explain: "Cl₂ gets reduced (gains electrons) while causing Cu to be oxidized — so it's the oxidizing agent.",
  },
  {
    q: "Which species undergoes disproportionation?",
    options: ["HCl", "NaCl", "H₂O₂", "NH₃"],
    correct: 2,
    explain: "In H₂O₂, oxygen (−1) splits into O at −2 (H₂O) and 0 (O₂) — both oxidized and reduced at once.",
  },
  {
    q: "Oxidation number of Cr in K₂Cr₂O₇?",
    options: ["+3", "+6", "+7", "+2"],
    correct: 1,
    explain: "2(+1) + 2x + 7(−2) = 0 → 2x = 12 → x = +6.",
  },
  {
    q: "In Zn + CuSO₄ → ZnSO₄ + Cu, who is the reducing agent?",
    options: ["Cu²⁺", "SO₄²⁻", "Zn", "ZnSO₄"],
    correct: 2,
    explain: "Zn loses electrons (gets oxidized) — by giving electrons away, it reduces Cu²⁺. That makes Zn the reducing agent.",
  },
  {
    q: "Oxidation number of O in KO₂ (superoxide)?",
    options: ["−2", "−1", "−1/2", "0"],
    correct: 2,
    explain: "Superoxide ion O₂⁻ splits charge across two oxygens: −1/2 each.",
  },
];

/* Full-page quiz data */
const fullQuizData = [
  {
    q: "In the reaction Zn + CuSO₄ → ZnSO₄ + Cu, which species is oxidized?",
    options: ["Cu²⁺", "Zn", "SO₄²⁻", "Cu"],
    correct: 1,
    explain: "Zn loses 2 electrons (Zn → Zn²⁺ + 2e⁻), so it is oxidized. The reducing agent is always the species that gets oxidized.",
    chapter: "Redox basics",
  },
  {
    q: "According to the OIL RIG mnemonic, which statement correctly defines reduction?",
    options: [
      "Reduction Is Loss of electrons",
      "Reduction Is Gain of electrons",
      "Oxidation Is Loss of electrons",
      "Oxidation Is Gain of electrons",
    ],
    correct: 1,
    explain: "RIG = Reduction Is Gain of electrons. OIL = Oxidation Is Loss of electrons.",
    chapter: "OIL RIG mnemonic",
  },
  {
    q: "What is the oxidation number of Mn in KMnO₄?",
    options: ["+4", "+5", "+6", "+7"],
    correct: 3,
    explain: "(+1) + x + 4(−2) = 0 → 1 + x − 8 = 0 → x = +7.",
    chapter: "Oxidation numbers",
  },
  {
    q: "In the reaction CuO + H₂ → Cu + H₂O, which is the oxidizing agent?",
    options: ["H₂", "Cu", "CuO", "H₂O"],
    correct: 2,
    explain: "CuO is reduced (loses oxygen → Cu), so it is the oxidizing agent. H₂ is oxidized, making it the reducing agent.",
    chapter: "Oxidizing & reducing agents",
  },
  {
    q: "Which of the following reactions is an example of disproportionation?",
    options: [
      "Fe + 2Fe³⁺ → 3Fe²⁺",
      "2H₂O₂ → 2H₂O + O₂",
      "Zn + CuSO₄ → ZnSO₄ + Cu",
      "CuO + H₂ → Cu + H₂O",
    ],
    correct: 1,
    explain: "In 2H₂O₂ → 2H₂O + O₂, oxygen goes from −1 to both −2 and 0 simultaneously. Option A is comproportionation.",
    chapter: "Disproportionation",
  },
];

const industryCards = [
  { num: "01", title: "Extraction of iron", eq: "Fe₂O₃ + 3CO → 2Fe + 3CO₂", use: "Blast furnace process — Fe₂O₃ is reduced, CO is oxidized." },
  { num: "02", title: "Sulphuric acid (Contact Process)", eq: "2SO₂ + O₂ → 2SO₃", use: "Fertilizer and chemical industries." },
  { num: "03", title: "Nitric oxide (Ostwald Process)", eq: "4NH₃ + 5O₂ → 4NO + 6H₂O", use: "Explosives and fertilizer manufacturing." },
  { num: "04", title: "Electroplating", eq: "Ag⁺ + e⁻ → Ag", use: "Jewellery, automobile parts, electronics." },
  { num: "05", title: "Batteries & fuel cells", eq: "Lead-acid · Lithium-ion", use: "Phones, laptops, electric vehicles." },
  { num: "06", title: "Bleaching industry", eq: "Bleaching powder · H₂O₂", use: "Paper, textiles, water treatment." },
];

const practiceQuestions = [
  "Find the oxidation state of Cl in HClO₄.",
  "Find the oxidation state of N in NH₄NO₂.",
  "Identify oxidizing & reducing agents in: MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O",
  "Balance: Cr₂O₇²⁻ + Fe²⁺ → Cr³⁺ + Fe³⁺",
  "Why is H₂O₂ called both an oxidizing and a reducing agent?",
  "Calculate the oxidation number of S in S₂O₈²⁻.",
  "Which is the stronger oxidizing agent — KMnO₄ or O₂?",
];

/* ---------- ElectronStage ---------- */
function ElectronStage() {
  const [zapped, setZapped] = useState(false);
  const stageRef = useRef(null);

  const handleClick = () => {
    if (!zapped) {
      const el = stageRef.current;
      if (el) { el.classList.remove("or-zapped"); void el.offsetWidth; }
      setZapped(true);
    } else {
      setZapped(false);
    }
  };

  return (
    <div className={`or-electron-stage${zapped ? " or-zapped" : ""}`} ref={stageRef}>
      <div className="or-electron-stage-label">Zn + Cu²⁺ → Zn²⁺ + Cu</div>
      <div className="or-atoms-row">
        <div className="or-atom or-atom-zn">
          <div className="or-atom-circle">Zn</div>
          <div className="or-atom-charge">{zapped ? "+2" : "0"}</div>
          <div className="or-atom-name">Zinc</div>
        </div>
        <div className="or-electron-path">
          <div className="or-e-dot or-e1">e⁻</div>
          <div className="or-e-dot or-e2">e⁻</div>
        </div>
        <div className="or-atom or-atom-cu">
          <div className="or-atom-circle">Cu</div>
          <div className="or-atom-charge">{zapped ? "0" : "+2"}</div>
          <div className="or-atom-name">Copper</div>
        </div>
      </div>
      <div className="or-electron-controls">
        <button className="or-electron-btn" onClick={handleClick}>
          {zapped ? (
            <><RotateCcw size={15} style={{ marginRight: 6, verticalAlign: "-2px" }} />Reset</>
          ) : (
            <><Zap size={28} style={{ marginRight: 6, verticalAlign: "-2px" }} />Transfer electrons</>
          )}
        </button>
      </div>
      <div className="or-electron-readout">
        <div className="or-readout-item ox">
          <div className="or-rv">Zn → Zn²⁺ + 2e⁻</div>
          <div className="or-rl">Oxidized · OIL</div>
        </div>
        <div className="or-readout-item red">
          <div className="or-rv">Cu²⁺ + 2e⁻ → Cu</div>
          <div className="or-rl">Reduced · RIG</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Flashcard ---------- */
function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`or-flashcard${flipped ? " or-flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="or-flashcard-inner">
        <div className="or-flashcard-face or-flashcard-front">
          <div className="or-fc-icon">Q</div>
          <div className="or-fc-q">{card.q}</div>
        </div>
        <div className="or-flashcard-face or-flashcard-back">
          <div className="or-fc-a">{card.a}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inline mid-page Quiz ---------- */
function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const finished = currentQ >= midQuizData.length;
  const item = !finished ? midQuizData[currentQ] : null;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="or-quiz-box">
      <div className="or-quiz-progress">
        {midQuizData.map((_, i) => (
          <div key={i} className={`or-dot${i < currentQ ? " or-done" : i === currentQ ? " or-current" : ""}`} />
        ))}
      </div>
      {!finished ? (
        <div>
          <div className="or-quiz-q">Q{currentQ + 1}. {item.q}</div>
          <div className="or-quiz-options">
            {item.options.map((opt, i) => {
              let cls = "or-quiz-opt";
              if (answered && i === item.correct) cls += " or-correct";
              else if (answered && i === selected) cls += " or-wrong";
              return (
                <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && <div className="or-quiz-feedback">{item.explain}</div>}
          {answered && (
            <button className="or-quiz-next" onClick={handleNext}>
              Next <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </button>
          )}
        </div>
      ) : (
        <div className="or-quiz-score">
          <div className="or-big">{score}/{midQuizData.length}</div>
          <p style={{ margin: "10px 0 18px" }}>Nice work. Review any you missed above, or retry the deck.</p>
          <button className="or-electron-btn" onClick={handleRetry}>
            <RotateCcw size={15} style={{ marginRight: 6, verticalAlign: "-2px" }} />
            Retry quiz
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Full-page Quiz ---------- */
function QuizPage({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = done;
  }, [done]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (doneRef.current) { clearInterval(interval); return; }
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const item = !done ? fullQuizData[currentQ] : null;
  const labels = ["A", "B", "C", "D"];
  const pct = Math.round((score / fullQuizData.length) * 100);
  const passed = pct >= 60;
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
    setUserAnswers((prev) => [...prev, { chosen: i, correct: i === item.correct }]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= fullQuizData.length) { setDone(true); return; }
    setCurrentQ((q) => q + 1);
    setSelected(null);
    setAnswered(false);
  };

  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setUserAnswers([]); setDone(false);
    setTimeLeft(5 * 60);
  };

  const progressPct = (currentQ / fullQuizData.length) * 100;

  return (
    <div className="or-root">
      {/* Topbar */}
      <div className="or-topbar">
        <div className="or-top-left">
          <button className="or-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to lesson
          </button>
        </div>
        <div className="or-page-pill">
          <span>🧪</span>
          <span>Oxidation &amp; Reduction — Quiz</span>
        </div>
        {!done && (
          <div className="or-quiz-timer">
            ⏱ {mins}:{secs}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="or-progress-rail">
        <div className="or-progress-fill" style={{ width: done ? "100%" : `${progressPct}%` }} />
      </div>

      <div className="or-quiz-page-wrap">
        {!done ? (
          <div className="or-quiz-page-card">
            <div className="or-qp-meta">
              <span className="or-qp-counter">Question {currentQ + 1} of {fullQuizData.length}</span>
              <span className="or-qp-chapter">{item.chapter}</span>
            </div>
            <div className="or-qp-dots">
              {fullQuizData.map((_, i) => (
                <div key={i} className={`or-qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>
            <div className="or-qp-question">{item.q}</div>
            <div className="or-qp-options">
              {item.options.map((opt, i) => {
                let cls = "or-qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="or-qp-opt-label">{labels[i]}</span>
                    <span className="or-qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="or-qp-opt-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="or-qp-opt-icon wrong" />}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div className={`or-qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "Correct!" : "Not quite."}</strong>{" "}{item.explain}
              </div>
            )}
            {answered && (
              <div className="or-qp-next-row">
                <button className="or-qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= fullQuizData.length ? "See results" : "Next question"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="or-quiz-page-card">
            <div className="or-qp-result-top">
              <div className={`or-qp-trophy ${passed ? "pass" : "fail"}`}>
                {passed ? "🏆" : "📚"}
              </div>
              <div>
                <div className="or-qp-result-pct">{pct}%</div>
                <div className="or-qp-result-sub">{score} out of {fullQuizData.length} correct</div>
              </div>
            </div>
            <div className="or-qp-result-divider" />
            <p className="or-qp-result-msg">
              {passed
                ? "Great job! You passed the Oxidation & Reduction quiz. You have a solid understanding of redox reactions, oxidation numbers, and agents."
                : "Not quite — review the sections on OIL RIG, oxidation numbers, and disproportionation, then try again."}
            </p>
            <div className="or-qp-breakdown">
              {fullQuizData.map((q, i) => (
                <div key={i} className="or-qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={18} className="or-qp-opt-icon correct" />
                    : <XCircle size={18} className="or-qp-opt-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>
            <div className="or-qp-result-actions">
              <button className="or-qp-next-btn" onClick={handleRetry}>
                <RotateCcw size={16} /> Retry quiz
              </button>
              <button className="or-back-btn" onClick={onBack}>
                <ArrowLeft size={16} /> Back to lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function OxidationReduction({ onBack }) {
  const [activeNav, setActiveNav] = useState("or-hero");
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleScroll = useCallback(() => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    setProgress(scrolled || 0);
    let active = sideNavItems[0].id;
    for (const item of sideNavItems) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = item.id;
    }
    setActiveNav(active);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const id = requestAnimationFrame(handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(id); };
  }, [handleScroll]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Show full quiz page instead of lesson */
  if (showQuiz) return <QuizPage onBack={() => setShowQuiz(false)} />;

  return (
    <div className="or-root">
      {/* Topbar */}
      <div className="or-topbar">
        <div className="or-top-left">
          <button className="or-back-btn" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Class 11
          </button>
        </div>
        <div className="or-page-pill">
          <span>🧪</span>
          <span>Oxidation And Reduction</span>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="or-progress-rail">
        <div className="or-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Side nav */}
      <nav className="or-side-nav">
        {sideNavItems.map((item) => (
          <button key={item.id} data-label={item.label}
            className={activeNav === item.id ? "or-active" : ""}
            onClick={() => jumpTo(item.id)} />
        ))}
      </nav>

      {/* Hero */}
      <header className="or-hero" id="or-hero">
        <div className="or-hero-content">
          <div className="or-hero-eyebrow">
            Class 11 Chemistry <span className="crumb">›</span> Unit 1.1
          </div>
          <h1 className="or-hero-title">
            <span className="ox">Oxidation</span> &amp; <span className="red">Reduction</span>
          </h1>
          <p className="or-hero-sub">
            Every redox reaction is really just electrons moving house. Learn to spot
            who's losing them, who's gaining them, and why it never happens alone.
          </p>
          <div className="or-mnemonic-row">
            <div className="or-mnemonic-chip ox">OIL <span className="full">— Oxidation Is Loss of e⁻</span></div>
            <div className="or-mnemonic-chip red">RIG <span className="full">— Reduction Is Gain of e⁻</span></div>
          </div>
        </div>
      </header>

      <div className="or-lesson-wrap">
        {/* 1. Redox */}
        <section className="or-section" id="or-sec-redox">
          <div className="or-section-tag"><span className="or-section-num">1</span> Foundation</div>
          <h2>What is a redox reaction?</h2>
          <p>A reaction in which oxidation and reduction happen <strong>at the same time</strong> is called a redox reaction. One species can't lose electrons unless another is there to take them.</p>
          <div className="or-reaction-box">
            <span className="or-label">Classic example</span>
            Zn <span className="or-arrow">+</span> CuSO<sub>4</sub>{" "}
            <span className="or-arrow">→</span> ZnSO<sub>4</sub> <span className="or-arrow">+</span> Cu
          </div>
          <p><span className="or-tag-ox">Zn is oxidized</span> &nbsp;·&nbsp; <span className="or-tag-red">Cu²⁺ is reduced</span></p>
        </section>

        {/* 2. Electron transfer */}
        <section className="or-section" id="or-sec-electron">
          <div className="or-section-tag"><span className="or-section-num">2</span> See it happen</div>
          <h2>Watch the electrons move</h2>
          <p>Zinc hands two electrons to copper. That's the entire reaction. Tap the button to run it.</p>
          <ElectronStage />
        </section>

        {/* 3. Definitions */}
        <section className="or-section" id="or-sec-rules">
          <div className="or-section-tag"><span className="or-section-num">3</span> Definitions</div>
          <h2>Four ways to spot each one</h2>
          <p>Oxidation and reduction mirror each other exactly — whatever oxidation does, reduction undoes.</p>
          <div className="or-split-cards">
            <div className="or-def-card ox">
              <div className="or-def-card-head">🔥 Oxidation</div>
              <ul className="or-def-list">
                <li>Gains oxygen <span className="or-eq">2Mg + O₂ → 2MgO</span></li>
                <li>Loses hydrogen <span className="or-eq">CH₃CH₂OH → CH₃CHO + H₂</span></li>
                <li>Loses electrons <span className="or-eq">Zn → Zn²⁺ + 2e⁻</span></li>
                <li>Oxidation number increases <span className="or-eq">Fe²⁺ → Fe³⁺ (+2 → +3)</span></li>
              </ul>
            </div>
            <div className="or-def-card red">
              <div className="or-def-card-head">❄️ Reduction</div>
              <ul className="or-def-list">
                <li>Loses oxygen <span className="or-eq">CuO + H₂ → Cu + H₂O</span></li>
                <li>Gains hydrogen <span className="or-eq">CH₂=CH₂ + H₂ → CH₃–CH₃</span></li>
                <li>Gains electrons <span className="or-eq">Cu²⁺ + 2e⁻ → Cu</span></li>
                <li>Oxidation number decreases <span className="or-eq">Fe³⁺ + e⁻ → Fe²⁺ (+3 → +2)</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Agents + rules */}
        <section className="or-section" id="or-sec-agents">
          <div className="or-section-tag"><span className="or-section-num">4</span> Agents</div>
          <h2>Oxidizing &amp; reducing agents</h2>
          <p>The agent is named for what it <em>does to the other guy</em> — and the opposite happens to itself.</p>
          <div className="or-agent-grid">
            <div className="or-agent-card ox">
              <h4>Oxidizing agent</h4>
              <p>Causes oxidation of another substance — and gets reduced itself.</p>
              <div className="or-pill-row">
                <span className="or-pill">KMnO₄</span><span className="or-pill">K₂Cr₂O₇</span>
                <span className="or-pill">H₂O₂</span><span className="or-pill">O₂</span><span className="or-pill">Cl₂</span>
              </div>
              <div className="or-agent-example">Cu + Cl₂ → CuCl₂ — Cl₂ is the oxidizing agent</div>
            </div>
            <div className="or-agent-card red">
              <h4>Reducing agent</h4>
              <p>Causes reduction of another substance — and gets oxidized itself.</p>
              <div className="or-pill-row">
                <span className="or-pill">H₂</span><span className="or-pill">CO</span>
                <span className="or-pill">Zn</span><span className="or-pill">Fe</span><span className="or-pill">NaBH₄</span>
              </div>
              <div className="or-agent-example">CuO + H₂ → Cu + H₂O — H₂ is the reducing agent</div>
            </div>
          </div>
          <h2 style={{ marginTop: 40 }}>Oxidation number rules</h2>
          <div className="or-rules-list">
            <div className="or-rule-row"><div className="or-rule-num">01</div><div className="or-rule-body"><strong>Free elements = 0</strong><span className="or-eg">Na, H₂, O₂, Cl₂ → all 0</span></div></div>
            <div className="or-rule-row"><div className="or-rule-num">02</div><div className="or-rule-body"><strong>Monoatomic ions = their charge</strong><span className="or-eg">Na⁺ = +1 &nbsp; Mg²⁺ = +2 &nbsp; Cl⁻ = −1</span></div></div>
            <div className="or-rule-row"><div className="or-rule-num">03</div><div className="or-rule-body"><strong>Hydrogen</strong> — usually +1, but −1 in metal hydrides<span className="or-eg">  HCl → H is +1 | NaH → H is −1</span></div></div>
            <div className="or-rule-row"><div className="or-rule-num">04</div><div className="or-rule-body"><strong>Oxygen</strong> — usually −2, peroxide −1, superoxide −1/2<span className="or-eg">  H₂O₂ → −1 | KO₂ → −1/2</span></div></div>
            <div className="or-rule-row"><div className="or-rule-num">05</div><div className="or-rule-body"><strong>Sum of oxidation numbers</strong> — neutral molecule = 0, polyatomic ion = charge on ion</div></div>
          </div>
          <h2 style={{ marginTop: 40 }}>High-frequency oxidation numbers (JEE &amp; NEET)</h2>
          <div className="or-rules-list">
            <div className="or-rule-row"><div className="or-rule-num or-mono">Mn</div><div className="or-rule-body"><strong>KMnO₄ → Mn = +7</strong></div></div>
            <div className="or-rule-row"><div className="or-rule-num or-mono">Cr</div><div className="or-rule-body"><strong>K₂Cr₂O₇ → Cr = +6</strong></div></div>
            <div className="or-rule-row"><div className="or-rule-num or-mono">O</div><div className="or-rule-body"><strong>H₂O₂ → O = −1</strong></div></div>
            <div className="or-rule-row"><div className="or-rule-num or-mono">O</div><div className="or-rule-body"><strong>KO₂ → O = −1/2</strong></div></div>
            <div className="or-rule-row"><div className="or-rule-num or-mono">Cl</div><div className="or-rule-body"><strong>ClO₄⁻ → Cl = +7</strong></div></div>
          </div>
        </section>

        {/* 5. Special cases */}
        <section className="or-section">
          <div className="or-section-tag"><span className="or-section-num">5</span> Special cases</div>
          <h2>When one element plays both roles</h2>
          <div className="or-def-card neutral" style={{ marginBottom: 16 }}>
            <div className="or-def-card-head accent">Disproportionation</div>
            <p style={{ margin: "0 0 12px", fontSize: 24 }}>The same element is oxidized <em>and</em> reduced in the same reaction.</p>
            <div className="or-reaction-box" style={{ margin: "0 0 10px" }}>
              2H<sub>2</sub>O<sub>2</sub> <span className="or-arrow">→</span> 2H<sub>2</sub>O <span className="or-arrow">+</span> O<sub>2</sub>
            </div>
            <p style={{ margin: 0, fontSize: 18, color: "#64748b" }}>
              Oxygen goes from −1 → −2 <span className="or-tag-red">(reduced)</span> and −1 → 0 <span className="or-tag-ox">(oxidized)</span>, simultaneously.
            </p>
          </div>
          <div className="or-def-card neutral">
            <div className="or-def-card-head accent">Comproportionation</div>
            <p style={{ margin: "0 0 12px", fontSize: 24 }}>Two different oxidation states of the same element combine into one intermediate state.</p>
            <div className="or-reaction-box" style={{ margin: 0 }}>
              Fe <span className="or-arrow">+</span> 2Fe³⁺ <span className="or-arrow">→</span> 3Fe²⁺
            </div>
          </div>
        </section>

        {/* 6. Flashcards */}
        <section className="or-section" id="or-sec-flash">
          <div className="or-section-tag"><span className="or-section-num">6</span> Quick recall</div>
          <h2>Flashcard drill</h2>
          <div className="or-flash-section-intro">
            <p style={{ margin: 0 }}>Tap a card to flip it. No peeking until you've guessed.</p>
          </div>
          <div className="or-flash-deck">
            {flashcards.map((card, i) => <Flashcard key={i} card={card} />)}
          </div>
        </section>

        {/* 7. Worked examples */}
        <section className="or-section" id="or-sec-worked">
          <div className="or-section-tag"><span className="or-section-num">7</span> Step by step</div>
          <h2>Worked examples</h2>
          <div className="or-worked">
            <div className="or-wq">Find the oxidation number of Mn in KMnO₄</div>
            <div className="or-wstep">(+1) + x + 4(−2) = 0</div>
            <div className="or-wstep">1 + x − 8 = 0</div>
            <div className="or-wans">x = +7</div>
          </div>
          <div className="or-worked">
            <div className="or-wq">Find the oxidation number of Cr in K₂Cr₂O₇</div>
            <div className="or-wstep">2(+1) + 2x + 7(−2) = 0</div>
            <div className="or-wstep">2 + 2x − 14 = 0 → 2x = 12</div>
            <div className="or-wans">x = +6</div>
          </div>
          <div className="or-worked">
            <div className="or-wq">(JEE level) Oxidation number of S in Na₂S₄O₆</div>
            <div className="or-wstep">2(+1) + 4x + 6(−2) = 0</div>
            <div className="or-wstep">2 + 4x − 12 = 0 → 4x = 10</div>
            <div className="or-wans">x = +2.5</div>
          </div>
        </section>

        {/* 8. Inline Quiz */}
        <section className="or-section" id="or-sec-quiz">
          <div className="or-section-tag"><span className="or-section-num">8</span> Check yourself</div>
          <h2>Quick quiz</h2>
          <p>Five questions pulled straight from JEE/NEET patterns. No pressure — you can retry.</p>
          <Quiz />
        </section>

        {/* 9. Industry */}
        <section className="or-section" id="or-sec-industry">
          <div className="or-section-tag"><span className="or-section-num">9</span> Why it matters</div>
          <h2>Redox in industry</h2>
          <p>This isn't just an exam topic — it's how metal gets extracted, fertilizer gets made, and your phone battery works.</p>
          <div className="or-industry-scroll">
            {industryCards.map((card) => (
              <div className="or-industry-card" key={card.num}>
                <div className="or-ic-num">{card.num}</div>
                <h4>{card.title}</h4>
                <div className="or-ic-eq">{card.eq}</div>
                <div className="or-ic-use">{card.use}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Practice */}
        <section className="or-section" id="or-sec-practice">
          <div className="or-section-tag"><span className="or-section-num">10</span> Your turn</div>
          <h2>Practice on your own</h2>
          <p>Work these out before checking the next subtopic. Grab a notebook.</p>
          <div className="or-practice-list">
            {practiceQuestions.map((q, i) => (
              <div className="or-practice-item" key={i}>
                <span className="or-pnum">{i + 1}</span> {q}
              </div>
            ))}
          </div>
        </section>
        
         <div className="career-image-section">

        <img 
          src={careerMap}
          alt="Oxidation and Reduction Career Pathway"
        />

</div>       

        {/* Quiz CTA — bottom of page */}
        <div className="or-quiz-cta-card">
          <div className="or-quiz-cta-left">
            <div className="or-quiz-cta-icon">🧠</div>
            <div>
              <h2 className="or-quiz-cta-title">It's quiz time</h2>
              <p className="or-quiz-cta-desc">
                Lock in what you've learned. Take this quiz to review key concepts and mark this learning unit as complete.
              </p>
              <div className="or-quiz-cta-meta">
                <span className="or-quiz-cta-meta-item">✅ Get 60% or more to pass</span>
                <span className="or-quiz-cta-meta-item">🕐 ~5 minutes</span>
              </div>
              <button className="or-quiz-cta-btn" onClick={() => setShowQuiz(true)}>
                Start Quiz <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="or-quiz-cta-right">
            <div className="or-quiz-cta-trophy">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}