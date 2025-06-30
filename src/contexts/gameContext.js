import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading",
    current: 0,
    answers: null,
    points: 0,
    answered: []
}

function reducer(state, action) {
    switch(action.type) {
        case 'dataReceived':
            return {...state, questions: action.payload, status: "ready"}
        case 'dataFailed':
            return {...state, status:'error'}
        case 'newAnswer':
            const question = state.questions.at(state.current);
            const selected = action.payload.trim().toLowerCase();

            console.log("User selected:", selected);
            console.log("rawAnswers:", question.rawAnswers);

            const correctKey = Object.entries(question.rawAnswers).find(
                ([key, value]) =>
                key.trim().toLowerCase() === selected && value === true
            );

            const isCorrect = !!correctKey;

            console.log("Is Correct:", isCorrect);
            console.log("question is worth ", question.points)
            return {...state, answer: action.payload, points:  isCorrect ? state.points + question.points : state.points, answered: [...state.answered, question.index]}
        case 'nextQuestion':
            return {...state, current: action.payload, answer: null}
        case 'finish':
            return {...state, status: 'finished'}
        case 'restart':
            return {...state, current: 0, points: 0, answer: null, status:'active', answered: []}
        default:
            throw new Error("action unkown");
    }
}

function QuizProvider({children}) {

  const [{questions, status, current, answer, points, answered}, dispatch] = useReducer(reducer, initialState)
    //const maxPoints = questions.reduce((prev,curr)=> prev+curr.points,0);
    //const numQuestions = questions.length;

    function dataReceived(data) {
        dispatch({type:"dataReceived", payload: data})
    }
    function start() {
        dispatch({type:"start"});
    }

    function nextQuestion(index) {
        console.log(index)
        dispatch({type:"nextQuestion", payload: index})
    }

    function finish() {
        dispatch({type:"finish"})
    }

    function restart () {
        dispatch({type: 'restart'})
    }

    function newAnswer(answerindex) {
        dispatch({type: 'newAnswer', payload: answerindex});
    }

  return <QuizContext.Provider value={{dataReceived, newAnswer, restart, nextQuestion, finish, start, questions, answered, status, current, answer, points}}>
    {children}
  </QuizContext.Provider>
}

function useQuiz() {
    const x = useContext(QuizContext);
    if(x===undefined) throw new Error("Quiz context useed outside provider");
    return x;
}

export {QuizProvider, useQuiz}