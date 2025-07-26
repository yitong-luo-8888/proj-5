import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/newAuthContext";

export default function Signup() {
  const { token, signup } = useAuth();        
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }
  if (token) return <Navigate to="/choose" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.username, form.password); 
      nav("/choose");                            
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Create account</button>
      </form>
      <p>Already have one? <Link to="/login">Log‑in</Link></p>
    </div>
  );
}
