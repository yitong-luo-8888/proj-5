import { Outlet, useLoaderData, useNavigate } from "react-router";
import {
  JeopardyTitle,
  TopicHeader,
  TopicHeaderRow,
  TotalBox,
  QuestionBox
} from "../styles";
import { useEffect } from "react";
import { useQuiz } from "../contexts/gameContext";
import styled from "styled-components";


const ScoreBox = styled.div`
  color: #ffd700;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

function Play() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { dataReceived, status, nextQuestion, answered, points } = useQuiz();

  useEffect(() => {
    if (data) {
      dataReceived(data);
    }
  }, [data]);

  useEffect(() => {
    if (answered.length === data.length) {
        navigate('/finished')
    }
  }, [answered, data, navigate])

  function onClick(index) {
    nextQuestion(index);
    navigate("/question");
  }

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <JeopardyTitle>Open Book Jeopardy</JeopardyTitle>

      <ScoreBox>Score: {points}</ScoreBox>

      {status === "loading" && <p style={{ color: "white" }}>Data loading</p>}
      {status === "error" && <p style={{ color: "white" }}>Error</p>}

      {status === "ready" && (
        <div>
          <TopicHeaderRow>
            <TopicHeader>TV Show</TopicHeader>
            <TopicHeader>Movie</TopicHeader>
            <TopicHeader>Football</TopicHeader>
            <TopicHeader>Soccer</TopicHeader>
          </TopicHeaderRow>

          <TotalBox>
            {data.map((question, i) => (
              <QuestionBox
                onClick={() => onClick(i)}
                key={i}
                disabled={answered.includes(question.index)}
              >
                {question.question}
              </QuestionBox>
            ))}
          </TotalBox>
        </div>
      )}
    </div>
  );
}

export default Play;