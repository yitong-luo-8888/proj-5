import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  current: null,
  answer: null,
  points: 0,
  answered: []
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "closeQuestion":
  return { ...state, current: null };

    case "nextQuestion":
      return { ...state, current: action.payload, answer: null };

        case "newAnswer": {
      const question = state.questions[state.current];
      const selectedText = action.payload.trim().toLowerCase();

      const ansObj = question.answers.find(
        ({ text }) => text.trim().toLowerCase() === selectedText
      );
      const isCorrect = !!ansObj?.correct;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
        answered: [...state.answered, question.id]
      };
    }

    case "finish":
      return { ...state, status: "finished" };

    case "restart":
      return {
        ...initialState,
        status: "ready"
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, current, answer, points, answered } = state;

  const closeQuestion = useCallback(() => dispatch({ type: "closeQuestion" }), []);

  const dataReceived = useCallback(
  (data) => dispatch({ type: "dataReceived", payload: data }),
  []
);

const nextQuestion = useCallback(
  (id) => {
    const idx = state.questions.findIndex(q => q.id === id);
    console.log("Looking for ID:", id, "→ index:", idx); // 👀 Debug log
    if (idx !== -1) dispatch({ type: "nextQuestion", payload: idx });
  },
  [state.questions]
);

const newAnswer = useCallback(
  (answerText) => dispatch({ type: "newAnswer", payload: answerText }),
  []
);

  const finish = useCallback(() => dispatch({ type: "finish" }), []);
  const restart = useCallback(() => dispatch({ type: "restart" }), []);

  const value = useMemo(
    () => ({
      questions,
      status,
      current,
      answer,
      points,
      answered,
      dataReceived,
      nextQuestion,
      newAnswer,
      finish,
      restart,
      closeQuestion
    }),
    [
      questions,
      status,
      current,
      answer,
      points,
      answered,
      dataReceived,
      nextQuestion,
      newAnswer,
      finish,
      restart,
      closeQuestion
    ]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}

export { QuizProvider, useQuiz };
