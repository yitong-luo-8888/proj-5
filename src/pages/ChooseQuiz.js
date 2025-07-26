import { useLoaderData, NavLink } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: black;
  min-height: 100vh;
  padding: 3rem 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 2rem;
  text-shadow: 2px 2px #060ce9;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const QuizCard = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; 
  padding: 0 10px;    
  background-color: #060ce9;
  color: #ffd700;
  width: 200px;
  height: 100px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid #ffd700;
  border-radius: 8px;
  transition: transform 0.2s, background-color 0.2s;
  word-break: break-word; 
  
  &:hover {
    background-color: #0815f4;
    transform: scale(1.05);
  }
`;

export default function ChooseQuiz() {
  const quizList = useLoaderData();  // [{ title }, ...]
  return (
    <PageWrapper>
      <Heading>Choose a Quiz</Heading>
      <Grid>
        {quizList.map(({ title }) => (
          <QuizCard key={title} to={`/gamezone/${encodeURIComponent(title)}`}>
            {title}
          </QuizCard>
        ))}
      </Grid>
    </PageWrapper>
  );
}
