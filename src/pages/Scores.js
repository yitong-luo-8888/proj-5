import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/newAuthContext";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 2rem;
  color: white;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
`;

const ScoreCard = styled.div`
  background-color: #101216;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const QuizTitle = styled.h3`
  color: #60cfff;
  margin-bottom: 6px;
`;

const ScoreInfo = styled.p`
  font-size: 1.1rem;
`;

export default function Scores() {
  const { token } = useAuth();
  const [scores, setScores] = useState([]);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const getUsername = () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.username;
    } catch {
        console.log("Now username in local storage")
        return null;
    }
  };
  const username = getUsername();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        console.log(username)
        const res = await fetch(`http://localhost:3001/api/v1/userRoutes/scores/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          nav("/login");
          return;
        }

        const data = await res.json();
        setScores(data.scores || []);
      } catch (e) {
        setErr("Failed to load scores");
        console.error(e);
      }
    };

    fetchScores();
  }, [token, nav]);

  return (
    <Page>
      <Heading>Your Quiz Scores</Heading>
      {err && <p style={{ color: "tomato" }}>{err}</p>}

      {scores.length === 0 && !err && <p>You haven't taken any quizzes yet.</p>}

      {scores.map((score, idx) => (
        <ScoreCard key={idx}>
          <QuizTitle>{score.quizTitle}</QuizTitle>
          <ScoreInfo>Score: {score.score} / {score.outOf}</ScoreInfo>
          <ScoreInfo>Date: {new Date(score.date).toLocaleString()}</ScoreInfo>
        </ScoreCard>
      ))}
    </Page>
  );
}
