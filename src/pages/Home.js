import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  color: #FFD700;
  font-family: 'Copperplate', 'Bank Gothic', 'Impact', sans-serif;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px #002868, 4px 4px #000;
`;

const PlayButton = styled(NavLink)`
  background-color: #060CE9;
  color: #FFD700;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  border: 2px solid #FFD700;
  border-radius: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: #0815f4;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

function Home() {
  return (
    <HomeWrapper>
      <Title>Welcome to Jeopardy</Title>
      <PlayButton to="/gamezone">Start Game</PlayButton>
    </HomeWrapper>
  );
}

export default Home;
