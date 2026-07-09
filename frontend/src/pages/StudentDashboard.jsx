import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function StudentDashboard() {
  const { session } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.studentDashboard(session.token).then(setData).catch((e) => setError(e.message));
  }, [session.token]);

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState />;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-display text-3xl text-ink mb-1">
          Welcome back, {data.display_name} 👋
        </h1>
        <p className="font-body text-ink/60 mb-8">Keep your streak alive — your quest continues.</p>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="⭐" label="Level" value={data.level} color="bg-violet" />
          <StatCard icon="⚡" label="Total XP" value={data.xp} color="bg-coral" />
          <StatCard icon="🪙" label="Coins" value={data.coins} color="bg-gold" />
          <StatCard icon="🔥" label="Day Streak" value={data.streak} color="bg-mint" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: subjects */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-display text-xl text-ink">Your Learning Trails</h2>
            {data.subject_progress.map((s) => (
              <SubjectCard key={s.subject} subject={s} />
            ))}

            <div className="bg-white rounded-xl2 shadow-pop p-5">
              <h3 className="font-display text-lg text-ink mb-1">🎖️ Badges Earned</h3>
              {data.badges.length === 0 ? (
                <p className="font-body text-ink/50 text-sm">Complete your first activity to earn a badge!</p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.badges.map((b) => (
                    <span key={b} className="bg-gold/20 text-gold border border-gold px-3 py-1 rounded-full text-sm font-body font-bold">
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: daily challenge + leaderboard rank */}
          <div className="space-y-4">
            <div className="bg-night text-white rounded-xl2 shadow-pop p-5">
              <h3 className="font-display text-lg text-gold mb-1">🎯 Daily Challenge</h3>
              {data.daily_challenge ? (
                <>
                  <p className="font-body text-sm text-white/70 mb-1">{data.daily_challenge.topic}</p>
                  <p className="font-display text-lg mb-3">{data.daily_challenge.title}</p>
                  <Link
                    to={`/activity/${data.daily_challenge.id}`}
                    className="inline-block bg-coral hover:bg-coralDark px-4 py-2 rounded-lg font-body font-bold transition-colors"
                  >
                    Start (+{data.daily_challenge.xp} XP)
                  </Link>
                </>
              ) : (
                <p className="font-body text-sm text-white/70">You've completed everything! 🎉</p>
              )}
            </div>

            <div className="bg-white rounded-xl2 shadow-pop p-5 text-center">
              <p className="font-body text-ink/60 text-sm mb-1">Leaderboard Position</p>
              <p className="font-display text-4xl text-violet">
                #{data.leaderboard_position ?? "-"}
              </p>
              <Link to="/leaderboard" className="text-sm font-body text-violet hover:underline">
                View full leaderboard →
              </Link>
            </div>

            <div className="bg-white rounded-xl2 shadow-pop p-5">
              <p className="font-body text-ink/60 text-sm mb-1">Overall Progress</p>
              <p className="font-display text-2xl text-ink mb-2">
                {data.completed_count} / {data.total_activities} activities
              </p>
              <div className="w-full h-3 bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mint"
                  style={{ width: `${(data.completed_count / data.total_activities) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`${color} text-white rounded-xl2 shadow-pop p-4 text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display text-2xl">{value}</div>
      <div className="font-body text-xs text-white/80">{label}</div>
    </div>
  );
}

function SubjectCard({ subject }) {
  const pct = Math.round((subject.completed / subject.total) * 100);
  const isMath = subject.subject === "Mathematics";
  const subjectKey = isMath ? "mathematics" : "science";
  const barClass = isMath ? "h-full bg-violet" : "h-full bg-mint";
  return (
    <Link
      to={`/trail/${subjectKey}`}
      className="block bg-white rounded-xl2 shadow-pop p-5 node-pop"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg text-ink">
          {isMath ? "📐" : "🔬"} {subject.subject}
        </h3>
        <span className="font-body text-sm text-ink/60">{subject.completed}/{subject.total}</span>
      </div>
      <div className="w-full h-3 bg-ink/10 rounded-full overflow-hidden">
        <div className={barClass} style={{ width: `${pct}%` }} />
      </div>
    </Link>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <p className="font-display text-xl text-ink/50">Loading your quest map...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <p className="font-body text-coralDark">{message}</p>
    </div>
  );
}
