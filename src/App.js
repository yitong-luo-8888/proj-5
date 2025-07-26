import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Welcome     from "./pages/Welcome";
import Login       from "./pages/Login";
import Signup      from "./pages/Signup";
import ChooseQuiz  from "./pages/ChooseQuiz";
import Play        from "./pages/Play";
import Finished    from "./pages/Finished";
import ErrorPage   from "./pages/Error";
import { quizListLoader, quizLoader } from "./data/loaders";
import { authGuard } from "./authGuard";
import GlobalStyle from './GlobalStyle'
import CreateQuiz from "./pages/CreateQuiz";   // 👈 correct path/case
import { QuizProvider } from "./contexts/gameContext";
import Scores from "./pages/Scores";

const router = createBrowserRouter([
  { path: "/",       element: <Welcome />, errorElement: <ErrorPage /> },
  { path: "/login",  element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // Everything below is protected:
  {
    path: "/choose",
    element: <ChooseQuiz />,
    loader: async () => { await authGuard(); return quizListLoader(); },
    errorElement: <ErrorPage />
  },
  {
    path: "/gamezone/:title",
    element: <Play />,
    loader: async (args) => { await authGuard(); return quizLoader(args); },
    errorElement: <ErrorPage />
  },

  { path: "/finished", element: <Finished />, loader: authGuard },
  {
    path: "/create",
    element: <CreateQuiz />,
    loader: authGuard,   
    errorElement: <ErrorPage />
  },
  {
    path: "/scores",
    element: <Scores />,
    loader: authGuard,   
    errorElement: <ErrorPage />
  }
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <QuizProvider>
          <RouterProvider router={router} />
          
        </QuizProvider>
      </AuthProvider>
    </>
  );
}

export default App;
