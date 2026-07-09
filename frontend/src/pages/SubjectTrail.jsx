import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

const SUBJECT_META = {
  mathematics: { label: "Mathematics", emoji: "📐", color: "violet", name: "Mathematics" },
  science: { label: "Science", emoji: "🔬", color: "mint", name: "Science" },
};

const ACTIVITY_ICON = { quiz: "❓", match: "🔗", sequence: "🧩" };

export default function SubjectTrail() {
  const { subjectKey } = useParams();
  const { session } = useAuth();
  const [subjects, setSubjects] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getSubjects(session.token).then(setSubjects).catch((e) => setError(e.message));
  }, [session.token]);

  if (error) return <div className="p-8 font-body text-coralDark">{error}</div>;
  if (!subjects) return <div className="p-8 font-display text-ink/50">Loading trail...</div>;

  const subject = subjects.find((s) => s.subject_key === subjectKey);
  const meta = SUBJECT_META[subjectKey] || SUBJECT_META.mathematics;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/student" className="font-body text-sm text-ink/50 hover:text-violet">← Back to dashboard</Link>
        <h1 className="font-display text-3xl text-ink mt-2 mb-1">
          {meta.emoji} {meta.name} Trail
        </h1>
        <p className="font-body text-ink/60 mb-10">Walk the path, topic by topic — every stop has 3 activities.</p>

        {/* The trail */}
        <div className="relative">
          {subject?.topics.map((topic, i) => (
            <TopicStop key={topic.id} topic={topic} index={i} side={i % 2 === 0 ? "left" : "right"} color={meta.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopicStop({ topic, index, side, color }) {
  const isLeft = side === "left";
  const isViolet = color === "violet";
  const nodeClass = isViolet ? "bg-violet" : "bg-mint";
  const pillClass = isViolet
    ? "text-violet border-violet hover:text-white hover:bg-violet"
    : "text-mint border-mint hover:text-white hover:bg-mint";

  return (
    <div className={`flex items-start gap-4 mb-10 ${isLeft ? "" : "flex-row-reverse text-right"}`}>
      {/* Node number */}
      <div className={`shrink-0 w-14 h-14 rounded-full ${nodeClass} text-white font-display text-xl flex items-center justify-center shadow-pop node-pop`}>
        {index + 1}
      </div>

      {/* Topic card */}
      <div className="flex-1 bg-white rounded-xl2 shadow-pop p-5">
        <h3 className="font-display text-lg text-ink mb-3">{topic.name}</h3>
        <div className={`flex gap-2 flex-wrap ${isLeft ? "" : "justify-end"}`}>
          {topic.activities.map((activity) => (
            <Link
              key={activity.id}
              to={`/activity/${activity.id}`}
              className={`node-pop inline-flex items-center gap-1.5 border-2 rounded-full px-3 py-1.5 text-sm font-body font-bold transition-colors ${pillClass}`}
            >
              <span>{ACTIVITY_ICON[activity.type]}</span>
              {activity.title}
              <span className="text-xs opacity-70">+{activity.xp}xp</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
