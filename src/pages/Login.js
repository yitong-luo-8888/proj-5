// src/pages/Login.jsx
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const { token, login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
        <button disabled={loading}>{loading ? "..." : "Login"}</button>
      </form>
      <p>No account? <Link to="/signup">Sign‑up</Link></p>
    </div>
  );
}