// pages/Play.jsx
import { useLoaderData, useNavigate } from "react-router";
import { JeopardyTitle, ScoreBox } from "../styles";
import { useEffect } from "react";
import { useQuiz } from "../contexts/gameContext";
import JeopardyForm from "../components/JeopardyForm";
import QuestionScreen from "./Question";
import { useRef } from "react";
import { useAuth } from "../contexts/authContext";

export default function Play() {
  const flatQuestions = useLoaderData(); // now comes from quizLoader
  const navigate = useNavigate();
  const { dataReceived, status, answered, points, current, restart } = useQuiz();
  const skipReset  = useRef(false);
  const { token, user } = useAuth(); 

  useEffect(() => {
    if (flatQuestions.length) dataReceived(flatQuestions);
  }, [flatQuestions, dataReceived]);

  /* ---------- redirect when finished --------------- */
  useEffect(() => {
  if (answered.length === flatQuestions.length) {
    skipReset.current = true;

    (async () => {
      try {
        await fetch(`http://localhost:3001/scores/${user.username}`, {
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
        // ✅ Navigate only after saving (or failing gracefully)
        navigate("/finished");
      }
    })();
  }
}, [answered, flatQuestions, points, navigate, token, user]);

  /* ---------- reset quiz on page exit -------------- */
  useEffect(() => {
    return () => {
      if (!skipReset.current) {
        restart(); // ✅ now only resets if you're truly leaving
      }
    };
  }, [restart]);

  /* ---------- render -------------------------------- */
  const categoryMap = flatQuestions.reduce((acc, q) => {
    (acc[q.topic] = acc[q.topic] || []).push(q);
    return acc;
  }, {});


  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <JeopardyTitle>Jeopardy</JeopardyTitle>

      <ScoreBox>Score: {points}</ScoreBox>
      {/* ...score box */}
      {status === "ready" && <JeopardyForm categoryMap={categoryMap} />}
      {status === "ready" && current !== null && <QuestionScreen />}
    </div>
  );
}
