import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import QuizActivity from "../components/QuizActivity";
import MatchActivity from "../components/MatchActivity";
import SequenceActivity from "../components/SequenceActivity";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function ActivityPlayer() {
  const { activityId } = useParams();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [startTime] = useState(Date.now());

  useEffect(() => {
    setActivity(null);
    setResult(null);
    api.getActivity(activityId, session.token).then(setActivity).catch((e) => setError(e.message));
  }, [activityId, session.token]);

  const handleSubmit = async (payload) => {
    try {
      const time_taken_seconds = Math.round((Date.now() - startTime) / 1000);
      const res = await api.submitActivity(
        { activity_id: activityId, time_taken_seconds, ...payload },
        session.token
      );
      setResult(res);
    } catch (e) {
      setError(e.message);
    }
  };

  if (error) return <div className="p-8 font-body text-coralDark">{error}</div>;
  if (!activity) return <div className="p-8 font-display text-ink/50">Loading activity...</div>;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link to="/student" className="font-body text-sm text-ink/50 hover:text-violet">← Back to dashboard</Link>

        <div className="mb-6 mt-2">
          <p className="font-body text-sm text-violet font-bold uppercase tracking-wide">{activity.topic_name}</p>
          <h1 className="font-display text-2xl text-ink">{activity.title}</h1>
        </div>

        {result ? (
          <ResultCard result={result} onNext={() => navigate("/student")} />
        ) : (
          <>
            {activity.type === "quiz" && <QuizActivity activity={activity} onSubmit={handleSubmit} />}
            {activity.type === "match" && <MatchActivity activity={activity} onSubmit={handleSubmit} />}
            {activity.type === "sequence" && <SequenceActivity activity={activity} onSubmit={handleSubmit} />}
          </>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result, onNext }) {
  const pct = Math.round((result.correct_count / result.total_count) * 100);
  return (
    <div className="bg-white rounded-xl2 shadow-pop p-8 text-center">
      <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "💪"}</div>
      <p className="font-display text-2xl text-ink mb-1">
        {result.correct_count} / {result.total_count} correct
      </p>
      <p className="font-body text-ink/60 mb-6">
        {pct >= 80 ? "Excellent work!" : pct >= 50 ? "Good effort — keep practicing!" : "Nice try — review and attempt again!"}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <MiniStat label="XP Earned" value={`+${result.earned_xp}`} />
        <MiniStat label="Coins" value={`+${result.earned_coins}`} />
        <MiniStat label="Streak" value={`🔥${result.streak}`} />
      </div>

      {result.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {result.badges.map((b) => (
            <span key={b} className="bg-gold/20 text-gold border border-gold px-3 py-1 rounded-full text-sm font-body font-bold">
              {b}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full bg-violet hover:bg-violetDark text-white font-display text-lg py-3 rounded-lg shadow-popSm transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-paper rounded-lg py-3">
      <div className="font-display text-lg text-ink">{value}</div>
      <div className="font-body text-xs text-ink/50">{label}</div>
    </div>
  );
}
