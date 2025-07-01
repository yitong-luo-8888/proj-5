import { useQuiz } from "../contexts/gameContext";
import { QuestionBox } from "../styles";


function GameCard({question, index=null, type=null}) {

    const {nextQuestion} = useQuiz();

    function onClick() {
        nextQuestion(index)
    }

    const { answered } = useQuiz();
    if (type === 'Answer') {
        return <QuestionBox
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
    }
    return (
        <QuestionBox
                    key={index}
                    onClick={onClick}
                    disabled={answered.includes(question.index)}
                >
                {question.question}
        </QuestionBox>
    )
}

export default GameCard