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
import SubjectsHeader from "../components/SubjectsHeader";
import JeopardyForm from "../components/JeopardyForm";
import QuestionScreen from "./Question";


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

  const { dataReceived, status, nextQuestion, answered, points, current } = useQuiz();

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

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <JeopardyTitle>Open Book Jeopardy</JeopardyTitle>

      <ScoreBox>Score: {points}</ScoreBox>

      {status === "loading" && <p style={{ color: "white" }}>Data loading...</p>}
      {status === "error" && <p style={{ color: "white" }}>Error!</p>}
      {status === "ready" && (
        <div>
          <SubjectsHeader />
          <JeopardyForm />
        </div>
      )}
      {status ==="ready" && current!==null && <QuestionScreen />}


    </div>
  );
}

export default Play;