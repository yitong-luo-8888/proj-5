// src/pages/Welcome.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/authContext";
import LoginSignUpFeature from "../components/NavBar";

/* ---------- top‑left corner container ---------- */
const Corner = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;                /* top‑right corner */
  z-index: 1000;              /* keep it above everything */
`;
/* ---------- existing styled components ---------- */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(#001 0%, #000 100%);
  color: #ffd700;
  gap: 2.5rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px #002868, 4px 4px #000;
  margin: 0;
`;

const Btn = styled(Link)`
  display: inline-block;
  background: #060ce9;
  color: #ffd700;
  padding: 1rem 2.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: 2px solid #ffd700;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.18s, background 0.18s;

  &:hover  { background: #0815f4; transform: scale(1.05); }
  &:active { transform: scale(0.95); }
  background: #333
`;

/* ---------- component ---------- */
export default function Welcome() {
  const { token } = useAuth();

  return (
    <>
      {/* ⬇️ corner login / signup button */}
      <Corner>
        <LoginSignUpFeature />
      </Corner>

      {/* ⬇️ existing centered content */}
      <Wrapper>
        <Title>Jeopardy Master</Title>

        <Btn to="/choose">Play a Quiz</Btn>

        {token
          ? <Btn to="/create" >Create Your Own Quiz</Btn>
          : <p>Log in to create quizzes.</p>}

        {token
          ? <Btn to="/scores" >Check Scores</Btn>
          : <p>Log in to see scores.</p>}
      </Wrapper>
    </>
  );
}
