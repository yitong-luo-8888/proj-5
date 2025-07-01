import { useQuiz } from "../contexts/gameContext";
import {TotalBox } from "../styles";
import GameCard from "./GameCard";

function JeopardyForm () {

    const { questions } = useQuiz();

    return (
        <TotalBox>
            {questions.map((question, i) => (
              <GameCard question={question} index={i} />
            ))}
          </TotalBox>
    )
}

export default JeopardyForm