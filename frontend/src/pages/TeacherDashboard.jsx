import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function TeacherDashboard() {
  const { session } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.teacherDashboard(session.token).then(setData).catch((e) => setError(e.message));
  }, [session.token]);

  if (error) return <div className="p-8 font-body text-coralDark">{error}</div>;
  if (!data) return <div className="p-8 font-display text-ink/50">Loading class data...</div>;

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="font-display text-3xl text-ink mb-1">Class Overview</h1>
        <p className="font-body text-ink/60 mb-8">Monitor student progress across Mathematics and Science.</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Students" value={data.total_students} icon="🧑‍🎓" color="bg-violet" />
          <StatCard label="Avg. Accuracy" value={`${data.average_accuracy_percent}%`} icon="🎯" color="bg-mint" />
          <StatCard label="Active Today" value={data.daily_activity_participation} icon="🔥" color="bg-coral" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl2 shadow-pop p-5">
            <h2 className="font-display text-lg text-ink mb-4">Student Progress</h2>
            {data.students.length === 0 ? (
              <p className="font-body text-ink/50 text-sm">No students have registered yet.</p>
            ) : (
              <div className="space-y-3">
                {data.students.map((s) => (
                  <div key={s.username} className="border-b border-ink/5 pb-3 last:border-none">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-body font-bold text-ink">{s.display_name}</p>
                      <span className="text-xs font-body bg-violet/10 text-violet px-2 py-0.5 rounded-full">
                        Level {s.level}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-body text-ink/50 mb-1">
                      <span>{s.completed_activities}/{s.total_activities} activities</span>
                      <span>Avg accuracy: {s.average_accuracy_percent}%</span>
                      <span>🔥 {s.streak}d</span>
                    </div>
                    <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mint"
                        style={{ width: `${(s.completed_activities / s.total_activities) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl2 shadow-pop p-5">
            <h2 className="font-display text-lg text-ink mb-4">Topic Completion (Class-wide)</h2>
            <div className="space-y-3">
              {data.topic_completion.map((t) => (
                <div key={t.topic}>
                  <div className="flex justify-between text-sm font-body mb-1">
                    <span className="text-ink font-semibold">{t.topic}</span>
                    <span className="text-ink/50">{t.completion_percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full bg-violet" style={{ width: `${t.completion_percent}%` }} />
                  </div>
                </div>
              ))}
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
