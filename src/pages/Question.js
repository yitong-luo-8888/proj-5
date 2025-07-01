import { useQuiz } from "../contexts/gameContext";
import styled from "styled-components";
import { QuestionBox } from "../styles";
import { useNavigate } from "react-router";
import { useState } from "react";
import GameCard from "../components/GameCard";


const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

const AnswerButton = styled.button`
  background-color: ${({ status }) =>
    status === "correct"
      ? "green"
      : status === "wrong"
      ? "red"
      : "#0033cc"};
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  margin-top: 0.5rem;
  width: 60%;
  cursor: pointer;
  &:hover {
    background-color: ${({ status }) =>
      status === "correct" || status === "wrong" ? null : "#0022aa"};
  }
`;

function QuestionScreen() {
  const { questions, current, newAnswer} = useQuiz();
  const question = questions[current];

  const [clicked, setClicked] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  if (!question) return null;

  function onClick(answerText) {
    if (clicked) return; // prevent double-clicks

    setClicked(answerText);

    const isCorrect = question.rawAnswers[answerText] === true;
    setStatusMap({
      [answerText]: isCorrect ? "correct" : "wrong"
    });

    setTimeout(() => {
      newAnswer(answerText);
    }, 1000);
  }

  return (
    <OverlayWrapper>
      <GameCard question={question} type="Answer" />
      {Object.keys(question.rawAnswers || {}).map((answerText) => (
        <AnswerButton
          key={answerText}
          onClick={() => onClick(answerText)}
          disabled={!!clicked}
          status={statusMap[answerText]}
        >
          {answerText}
        </AnswerButton>
      ))}
    </OverlayWrapper>
  );
}

export default QuestionScreen;
