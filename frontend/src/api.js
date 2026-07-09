const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8123";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || "Something went wrong. Please try again.");
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  logout: (token) => request("/auth/logout", { method: "POST", token }),
  getSubjects: (token) => request("/content/subjects", { token }),
  getActivity: (id, token) => request(`/content/activity/${id}`, { token }),
  submitActivity: (payload, token) => request("/activity/submit", { method: "POST", body: payload, token }),
  studentDashboard: (token) => request("/dashboard/student", { token }),
  teacherDashboard: (token) => request("/dashboard/teacher", { token }),
  leaderboard: (token) => request("/leaderboard", { token }),
};
