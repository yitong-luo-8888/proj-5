// Shown after quiz completion, displays score or feedback.
import { useNavigate } from "react-router";
import { useQuiz } from "../contexts/gameContext";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffd700;
`;

const ScoreText = styled.p`
  font-size: 1.8rem;
  color: white;
`;

const OutOfText = styled.p`
  font-size: 1.2rem;
  color: #ccc;
`;

const RestartButton = styled.button`
  background-color: #0033cc;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #001f99;
  }
`;

function Finished() {
  const { points, questions, restart } = useQuiz();
  const navigate = useNavigate();

  const maxPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  function handleRestart() {
    restart();
    navigate("/");
  }

  return (
    <Wrapper>
      <Title>🎉 You Finished! 🎉</Title>
      <ScoreText>Your final score: {points}</ScoreText>
      <OutOfText>Out of a possible {maxPoints} points</OutOfText>
      <RestartButton onClick={handleRestart}>Restart Game</RestartButton>
    </Wrapper>
  );
}

export default Finished;
