import { useState } from "react";
import { ChevronDown, ChevronLeft, BookOpen, FileText, ListTree } from "lucide-react";
import "../styles/Classeleven.css";
import OxidationReduction from "../pages/OxidationReduction.jsx";
const learningPath = [
  {
    id: 1,
    title: "Basic Concept of Chemical and Chemical Calculation",
    subtopics: [
      {
        id: "1.1",
        title: "Oxidation And Reduction",
      },
    ],
    
  },
];

export default function ClassEleven({ onBack }) {
  // Which main topic is expanded in the sidebar
  const [openTopicId, setOpenTopicId] = useState(1);

  // Which subtopic is currently shown in the content panel
  const [activeSubtopic, setActiveSubtopic] = useState(
    learningPath[0].subtopics[0]
  );
  const [openView, setOpenView] = useState(null);

   if (openView === "lesson" && activeSubtopic.id === "1.1") {
    return <OxidationReduction onBack={() => setOpenView(null)} />;
  }
  
  const toggleTopic = (id) => {
    setOpenTopicId(openTopicId === id ? null : id);
  };

  return (
    <div className="ce-root">
      {/* Topbar */}
      <div className="ce-topbar">
        <div className="ce-top-left">
          <div className="ce-logo-area">
            <div className="ce-logo-circle">C</div>
            <div>
              <div className="ce-logo-title">ChemIQ</div>
              <div className="ce-logo-sub">LEARN • EXPLORE • DISCOVER</div>
            </div>
          </div>
          <div className="ce-divider" />
          <div className="ce-page-title">
            <span className="ce-page-title-icon">🧪</span>
            <span>Class 11</span>
          </div>
        </div>
        <button className="ce-back-btn" onClick={onBack}>
          ← Back to Live Books
        </button>
      </div>

      {/* Body: sidebar + content */}
      <div className="ce-body">
        {/* Sidebar */}
        <aside className="ce-sidebar">
          <div className="ce-sidebar-header">
            <ListTree size={18} />
            <span>Learning Path</span>
          </div>

          <div className="ce-sidebar-list">
            {learningPath.map((topic) => (
              <div className="ce-topic-block" key={topic.id}>
                <button
                  className="ce-topic-header"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <span className="ce-topic-number">{topic.id}</span>
                  <span className="ce-topic-title">{topic.title}</span>
                  <ChevronDown
                    size={16}
                    className={
                      openTopicId === topic.id
                        ? "ce-chevron ce-chevron--open"
                        : "ce-chevron"
                    }
                  />
                </button>

                {openTopicId === topic.id && (
                  <div className="ce-subtopic-list">
                    {topic.subtopics.map((sub) => (
                      <button
                        key={sub.id}
                        className={
                          activeSubtopic.id === sub.id
                            ? "ce-subtopic ce-subtopic--active"
                            : "ce-subtopic"
                        }
                        onClick={() => setActiveSubtopic(sub)}
                      >
                        <span className="ce-subtopic-number">{sub.id}</span>
                        <span>{sub.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="ce-content">
          <div className="ce-content-breadcrumb">
            <span className="ce-content-circle">{activeSubtopic.id}</span>
            <button className="ce-crumb-link" onClick={onBack}>
              <ChevronLeft size={14} />
              Class 11 - Chemistry
            </button>
          </div>

          <h1 className="ce-content-title">{activeSubtopic.title}</h1>

          <div className="ce-content-divider" />

          <div className="ce-cards-row">
            <div className="ce-action-card ce-action-card--lesson"
            onClick={() => setOpenView("lesson")}
            >
              <div className="ce-action-title">Lesson</div>
              <div className="ce-action-icon-box">
                <BookOpen size={40} />
              </div>
            </div>

            <div className="ce-action-card ce-action-card--notes">
              <div className="ce-action-title">Revision Notes</div>
              <div className="ce-action-icon-box">
                <FileText size={40} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}