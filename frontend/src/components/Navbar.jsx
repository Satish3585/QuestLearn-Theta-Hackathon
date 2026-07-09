import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-night text-white px-6 py-4 flex items-center justify-between shadow-pop">
      <Link to={session?.role === "teacher" ? "/teacher" : "/student"} className="font-display text-2xl tracking-wide flex items-center gap-2">
        <span className="text-gold">🗺️</span> QuestLearn
      </Link>
      <div className="flex items-center gap-5 font-body font-semibold text-sm">
        {session?.role === "student" && (
          <Link to="/student" className="hover:text-gold transition-colors">Dashboard</Link>
        )}
        {session?.role === "teacher" && (
          <Link to="/teacher" className="hover:text-gold transition-colors">Class Overview</Link>
        )}
        <Link to="/leaderboard" className="hover:text-gold transition-colors">Leaderboard</Link>
        {session && (
          <span className="hidden sm:inline text-white/70">Hi, {session.display_name}</span>
        )}
        {session && (
          <button
            onClick={handleLogout}
            className="bg-coral hover:bg-coralDark text-white px-3 py-1.5 rounded-full shadow-popSm transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
