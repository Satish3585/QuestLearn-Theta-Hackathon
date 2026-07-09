import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(username, password);
      navigate(data.role === "teacher" ? "/teacher" : "/student");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🗺️</div>
          <h1 className="font-display text-4xl text-white">QuestLearn</h1>
          <p className="text-white/60 font-body mt-1">Your NCERT learning adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-paper rounded-xl2 shadow-pop p-8">
          <h2 className="font-display text-2xl text-ink mb-6">Welcome back</h2>

          {error && (
            <div className="bg-coral/10 border border-coral text-coralDark rounded-lg px-4 py-2 mb-4 text-sm font-body">
              {error}
            </div>
          )}

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
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral hover:bg-coralDark text-white font-display text-lg py-2.5 rounded-lg shadow-popSm transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Start Adventure"}
          </button>

          <p className="text-center font-body text-sm text-ink/60 mt-5">
            New here?{" "}
            <Link to="/register" className="text-violet font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
