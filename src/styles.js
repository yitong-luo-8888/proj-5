import styled from "styled-components";


export const ScoreBox = styled.div`
  color: #ffd700;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;

export const TotalBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0.75rem;
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const QuestionBox = styled.button`
  background-color: #060CE9;
  color: #FFD700;
  font-family: 'Copperplate', 'Bank Gothic', 'Impact', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid #FFD700;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.2s;

  &:hover {
    background-color: #0815f4;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #333a9c;
    color: #aaa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const CenteredWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const JeopardyTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: 800;
  margin-top: 4rem;        
  margin-bottom: 2rem;
  color: #FFD700;           
  font-family: 'Copperplate', 'Bank Gothic', 'Impact', serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow:
    2px 2px 0 #002868,       
    4px 4px 0 #ffffff,    
    6px 6px 0 #d4af37;      
`;

export const TopicHeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  width: 50%;
  margin: 1rem auto 0;
  margin-bottom: 2rem; 
`;

export const TopicHeader = styled.div`
  background-color: #060CE9;
  color: #FFD700;
  font-family: 'Copperplate', 'Bank Gothic', 'Impact', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.8rem;
  border: 2px solid #FFD700;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #001f4d;
  color: white;
  padding: 2rem;
  border-radius: 10px;
  z-index: 11;
  box-shadow: 0 0 10px #ffd700;
`;