// src/components/NavBar.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";

/* ---------- Jeopardy‑styled link ---------- */
const CornerLink = styled(Link)`
  background: #0025af;           /* rich board blue */
  color: #ffd700;                /* “Daily Double” gold */
  padding: 0.55rem 1.4rem;
  font-size: 1.05rem;
  font-weight: 700;
  border: 2px solid #ffd700;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s;

  &:hover {
    background: #0935ff;
    transform: scale(1.07);
    box-shadow: 0 0 12px #ffd70088;
  }

  &:active {
    transform: scale(0.95);
  }
`;

function isTokenValid() {
  const token = localStorage.getItem("jwt");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function LoginSignUpFeature() {
  if (isTokenValid()) return null; 

  return <CornerLink to="/login">Login / Sign Up</CornerLink>;
}
