import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ActivityPlayer from "./pages/ActivityPlayer";
import Leaderboard from "./pages/Leaderboard";
import SubjectTrail from "./pages/SubjectTrail";

function Protected({ role, children }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          session ? (
            session.role === "teacher" ? (
              <Navigate to="/teacher" replace />
            ) : (
              <Navigate to="/student" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/student"
        element={
          <Protected role="student">
            <StudentDashboard />
          </Protected>
        }
      />
      <Route
        path="/trail/:subjectKey"
        element={
          <Protected role="student">
            <SubjectTrail />
          </Protected>
        }
      />
      <Route
        path="/activity/:activityId"
        element={
          <Protected role="student">
            <ActivityPlayer />
          </Protected>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Protected>
            <Leaderboard />
          </Protected>
        }
      />
      <Route
        path="/teacher"
        element={
          <Protected role="teacher">
            <TeacherDashboard />
          </Protected>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
