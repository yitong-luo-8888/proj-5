// QuestionWrapper.jsx
import { useQuiz } from "./contexts/gameContext";
import QuestionScreen from "./pages/Question";

function QuestionWrapper() {
  const { current } = useQuiz();
  return <QuestionScreen key={current} />;
}

export default QuestionWrapper;