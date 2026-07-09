import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = sessionStorage.getItem("questlearn_session");
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (data) => {
    sessionStorage.setItem("questlearn_session", JSON.stringify(data));
    setSession(data);
  };

  const login = useCallback(async (username, password) => {
    const data = await api.login({ username, password });
    persist(data);
    return data;
  }, []);

const register = useCallback(async (username, password, role, display_name) => {
    const data = await api.register({ username, password, role, display_name });
    return data;   // ← just return, don't auto-login
}, []);

  const logout = useCallback(async () => {
    if (session?.token) {
      try { await api.logout(session.token); } catch (e) { /* ignore */ }
    }
    sessionStorage.removeItem("questlearn_session");
    setSession(null);
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
