// src/contexts/authContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const API = process.env.REACT_APP_API || "http://localhost:3001"; // adjust if needed

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user,  setUser]  = useState(JSON.parse(localStorage.getItem("user") || "null"));

  const save = (t, u) => {
    localStorage.setItem("jwt", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const call = async (route, body) => {
    const r = await fetch(`${API}/auth/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Auth failed");
    save(d.token, d.user);
  };

  const login  = (u, p) => call("login",  { username: u, password: p });
  const signup = (u, p) => call("signup", { username: u, password: p });
  const logout = () => { localStorage.clear(); setToken(null); setUser(null); };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
