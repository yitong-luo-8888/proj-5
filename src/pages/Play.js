// pages/Play.jsx
import { useLoaderData, useNavigate } from "react-router";
import { JeopardyTitle, ScoreBox } from "../styles";
import { useEffect } from "react";
import { useQuiz } from "../contexts/gameContext";
import JeopardyForm from "../components/JeopardyForm";
import QuestionScreen from "./Question";
import { useRef } from "react";
import { useAuth } from "../contexts/newAuthContext";

export default function Play() {
  const flatQuestions = useLoaderData();
  const navigate = useNavigate();
  const { dataReceived, status, answered, points, current, restart } = useQuiz();
  const skipReset  = useRef(false);
  const { token, user } = useAuth(); 

  useEffect(() => {
    if (flatQuestions.length) dataReceived(flatQuestions);
  }, [flatQuestions, dataReceived]);

  useEffect(() => {
  if (answered.length === flatQuestions.length) {
    skipReset.current = true;

    (async () => {
      try {
        await fetch(`http://localhost:3001/api/v1/userRoutes/scores/${user.username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            quizTitle: flatQuestions[0]?.title || "Untitled Quiz",
            score: points,
            outOf: flatQuestions.reduce((total, q) => total + q.points, 0)
          })
        });
      } catch (err) {
        console.error("❌ Failed to save score:", err);
      } finally {
        navigate("/finished");
      }
    })();
  }
}, [answered, flatQuestions, points, navigate, token, user]);

  useEffect(() => {
    return () => {
      if (!skipReset.current) {
        restart();
      }
    };
  }, [restart]);

  const categoryMap = flatQuestions.reduce((acc, q) => {
    (acc[q.topic] = acc[q.topic] || []).push(q);
    return acc;
  }, {});


  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <JeopardyTitle>Jeopardy</JeopardyTitle>

      <ScoreBox>Score: {points}</ScoreBox>
      {status === "ready" && <JeopardyForm categoryMap={categoryMap} />}
      {status === "ready" && current !== null && <QuestionScreen />}
    </div>
  );
}
