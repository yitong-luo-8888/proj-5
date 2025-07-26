// pages/QuestionScreen.jsx
import { useQuiz } from "../contexts/gameContext";
import styled from "styled-components";
import { QuestionBox } from "../styles";
import { useState } from "react";

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0; left: 0;
  height: 100vh; width: 100vw;
  background: rgba(0,0,0,0.8);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

// Custom option button with transient $correct prop
const OptionButton = styled.button`
  background-color: ${({ $selected, $correct }) => {
    if (!$selected) return "#0033cc";
    return $correct ? "green" : "red";
  }};
  border: 2px solid #fff;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  width: 60%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? undefined : "#0022aa")};
  }
`;

export default function QuestionScreen() {
  const { questions, current, newAnswer, closeQuestion } = useQuiz();
  const question = questions[current];
  const [clicked, setClicked] = useState(null);

  if (!question) return null;

  function onClick(answerText, isCorrect) {
    if (clicked) return; // only one click
    setClicked(answerText);
    setTimeout(() => {
  newAnswer(answerText);
  closeQuestion();
}, 1000);
  }

  return (
    <OverlayWrapper>
      {/* Show the full question */}
      <QuestionBox
        as="div"
        style={{
          width: "60%",
          padding: "2rem",
          fontSize: "1.5rem",
          lineHeight: "1.8rem",
          textAlign: "center"
        }}
      >
        {question.question}
      </QuestionBox>

      {/* Render each answer choice */}
      {question.answers.map(({ text, correct }) => (
        <OptionButton
  key={text}
  disabled={!!clicked}
  $selected={clicked === text}
  $correct={clicked === text && correct}
  onClick={() => onClick(text, correct)}
>
  {text} {/* ✅ this renders the answer text */}
</OptionButton>
      ))}
    </OverlayWrapper>
  );
}
