import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { session } = useAuth();
  const [board, setBoard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.leaderboard(session.token).then(setBoard).catch((e) => setError(e.message));
  }, [session.token]);

  if (error) return <div className="p-8 font-body text-coralDark">{error}</div>;
  if (!board) return <div className="p-8 font-display text-ink/50">Loading leaderboard...</div>;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-ink mb-1">🏆 Leaderboard</h1>
        <p className="font-body text-ink/60 mb-8">Ranked by total XP earned.</p>

        <div className="bg-white rounded-xl2 shadow-pop divide-y divide-ink/5">
          {board.length === 0 && (
            <p className="p-6 font-body text-ink/50 text-center">No students yet — be the first to earn XP!</p>
          )}
          {board.map((row) => (
            <div
              key={row.username}
              className={`flex items-center gap-4 px-5 py-4 ${
                row.username === session.username ? "bg-violet/5" : ""
              }`}
            >
              <div className="w-8 text-center font-display text-lg text-ink/60">
                {MEDALS[row.rank - 1] || row.rank}
              </div>
              <div className="flex-1">
                <p className="font-body font-bold text-ink">
                  {row.display_name}
                  {row.username === session.username && (
                    <span className="text-violet text-xs ml-2">(you)</span>
                  )}
                </p>
                <p className="font-body text-xs text-ink/50">
                  Level {row.level} · {row.completed_activities} activities · {row.badges} badges
                </p>
              </div>
              <div className="font-display text-lg text-coral">{row.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
