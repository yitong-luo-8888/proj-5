import { useQuiz } from "../contexts/gameContext";
import styled from "styled-components";
import { QuestionBox } from "../styles";
import { useNavigate } from "react-router";
import { useState } from "react";

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
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
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  if (!question) return null;

  function onClick(answerText) {
    if (clicked) return; // prevent double-clicks

    setClicked(answerText);
    newAnswer(answerText);

    const isCorrect = question.rawAnswers[answerText] === true;
    setStatusMap({
      [answerText]: isCorrect ? "correct" : "wrong"
    });

    setTimeout(() => {
      navigate("/gamezone");
    }, 1000);
  }

  return (
    <Wrapper>
      <QuestionBox
        as="div"
        style={{
          width: "60%",
          height: "auto",
          padding: "2rem",
          fontSize: "1.5rem",
          lineHeight: "1.8rem",
          textAlign: "center"
        }}
      >
        {question.question}
      </QuestionBox>

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
    </Wrapper>
  );
}

export default QuestionScreen;
