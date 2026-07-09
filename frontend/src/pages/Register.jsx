import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
await register(username, password, role, displayName);
navigate("/login");  // ← go to login page after register
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🎒</div>
          <h1 className="font-display text-4xl text-white">Join QuestLearn</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-paper rounded-xl2 shadow-pop p-8">
          {error && (
            <div className="bg-coral/10 border border-coral text-coralDark rounded-lg px-4 py-2 mb-4 text-sm font-body">
              {error}
            </div>
          )}

          <label className="block font-body font-bold text-sm text-ink mb-1">I am a...</label>
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 rounded-lg font-display border-2 transition-colors ${
                role === "student" ? "bg-violet text-white border-violet" : "border-ink/10 text-ink"
              }`}
            >
              🧑‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`flex-1 py-2 rounded-lg font-display border-2 transition-colors ${
                role === "teacher" ? "bg-mint text-white border-mint" : "border-ink/10 text-ink"
              }`}
            >
              🧑‍🏫 Teacher
            </button>
          </div>

          <label className="block font-body font-bold text-sm text-ink mb-1">Full name</label>
          <input
            className="w-full border-2 border-ink/10 rounded-lg px-4 py-2 mb-4 font-body focus:border-violet outline-none"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <label className="block font-body font-bold text-sm text-ink mb-1">Username</label>
          <input
            className="w-full border-2 border-ink/10 rounded-lg px-4 py-2 mb-4 font-body focus:border-violet outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="block font-body font-bold text-sm text-ink mb-1">Password</label>
          <input
            type="password"
            className="w-full border-2 border-ink/10 rounded-lg px-4 py-2 mb-6 font-body focus:border-violet outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={4}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral hover:bg-coralDark text-white font-display text-lg py-2.5 rounded-lg shadow-popSm transition-colors disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center font-body text-sm text-ink/60 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-violet font-bold hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
