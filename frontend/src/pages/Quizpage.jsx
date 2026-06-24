import { useState, useEffect,useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw, Clock } from "lucide-react";
import "../styles/QuizPage.css";

const quizData = [
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
    explain: "CuO is reduced (loses oxygen → Cu), so it is the oxidizing agent.",
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
    explain: "In 2H₂O₂ → 2H₂O + O₂, oxygen goes from −1 to both −2 and 0 simultaneously.",
    chapter: "Disproportionation",
  },
];

const TOTAL_TIME = 5 * 60;

export default function QuizPage({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

   const doneRef = useRef(false);

     useEffect(() => {
    doneRef.current = done;
  }, [done]);

  // ✅ Fixed: no setState called directly inside effect body
  useEffect(() => {
    const interval = setInterval(() => {
      if (doneRef.current) {
        clearInterval(interval);
        return;
      }
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // use setTimeout to avoid setState-in-effect warning
          setTimeout(() => setDone(true), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timerColor =
    timeLeft <= 30 ? "#ef4444" :
    timeLeft <= 60 ? "#f59e0b" :
    "#22d3ee";

  const item = quizData[currentQ];
  const labels = ["A", "B", "C", "D"];
  const progress = (currentQ / quizData.length) * 100;
  const pct = Math.round((score / quizData.length) * 100);
  const passed = pct >= 60;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === item.correct) setScore((s) => s + 1);
    setUserAnswers((prev) => [...prev, { chosen: i, correct: i === item.correct }]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= quizData.length) {
      setDone(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setDone(false);
    setTimeLeft(TOTAL_TIME);
  };

  return (
    <div className="qp-root">

      {/* Topbar */}
      <div className="qp-topbar">
        <button className="qp-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to lesson
        </button>

        {/* Timer */}
        {!done && (
          <div className="qp-timer" style={{ color: timerColor, borderColor: timerColor + "55" }}>
            <Clock size={16} />
            <span className="qp-timer-text">{formatTime(timeLeft)}</span>
          </div>
        )}

        <div className="qp-pill">
          <span>🧪</span>
          <span>Oxidation &amp; Reduction — Quiz</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="qp-progress-rail">
        <div className="qp-progress-fill" style={{ width: done ? "100%" : `${progress}%` }} />
      </div>

      {/* Body */}
      <div className="qp-body qp-full-body">
        {!done ? (

          <div className="qp-card">
            <div className="qp-meta">
              <span className="qp-counter">
                Question {currentQ + 1} <span className="qp-of">of {quizData.length}</span>
              </span>
              <span className="qp-chapter">{item.chapter}</span>
            </div>

            <div className="qp-dots">
              {quizData.map((_, i) => (
                <div key={i} className={`qp-dot${i < currentQ ? " done" : i === currentQ ? " current" : ""}`} />
              ))}
            </div>

            <div className="qp-question">{item.q}</div>

            <div className="qp-options">
              {item.options.map((opt, i) => {
                let cls = "qp-opt";
                if (answered && i === item.correct) cls += " correct";
                else if (answered && i === selected) cls += " wrong";
                return (
                  <button key={i} className={cls} disabled={answered} onClick={() => handleSelect(i)}>
                    <span className="qp-opt-label">{labels[i]}</span>
                    <span className="qp-opt-text">{opt}</span>
                    {answered && i === item.correct && <CheckCircle size={18} className="qp-opt-icon correct" />}
                    {answered && i === selected && i !== item.correct && <XCircle size={18} className="qp-opt-icon wrong" />}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`qp-feedback ${selected === item.correct ? "correct" : "wrong"}`}>
                <strong>{selected === item.correct ? "✓ Correct!" : "✗ Not quite."}</strong>{" "}
                {item.explain}
              </div>
            )}

            {answered && (
              <div className="qp-next-row">
                <button className="qp-next-btn" onClick={handleNext}>
                  {currentQ + 1 >= quizData.length ? "See results" : "Next question"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

        ) : (

          <div className="qp-card">
            <div className="qp-result-top">
              <div className={`qp-trophy ${passed ? "pass" : "fail"}`}>
                <Trophy size={40} />
              </div>
              <div className="qp-result-scores">
                <div className="qp-result-pct">{pct}%</div>
                <div className="qp-result-sub">{score} out of {quizData.length} correct</div>
                <div className="qp-result-time">
                  <Clock size={13} /> Completed in {formatTime(TOTAL_TIME - timeLeft)}
                </div>
              </div>
            </div>

            <div className="qp-result-divider" />

            <p className="qp-result-msg">
              {passed
                ? "Great job! You passed the Oxidation & Reduction quiz."
                : "Not quite — review OIL RIG, oxidation numbers, and disproportionation, then try again."}
            </p>

            <div className="qp-breakdown">
              {quizData.map((q, i) => (
                <div key={i} className="qp-breakdown-row">
                  {userAnswers[i]?.correct
                    ? <CheckCircle size={16} className="qp-opt-icon correct" />
                    : <XCircle size={16} className="qp-opt-icon wrong" />}
                  <span>Q{i + 1}: {q.chapter}</span>
                </div>
              ))}
            </div>

            <div className="qp-result-actions">
              <button className="qp-next-btn" onClick={handleRetry}>
                <RotateCcw size={16} /> Retry quiz
              </button>
              <button className="qp-back-btn" onClick={onBack}>
                <ArrowLeft size={16} /> Back to lesson
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}