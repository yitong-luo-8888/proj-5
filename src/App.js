import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Error from "./pages/Error"
import Play from "./pages/Play"
import Finished from "./pages/Finished"
import { optionLoader } from "./data/loaders"
import { QuizProvider } from "./contexts/gameContext"; 
import GlobalStyle from "./GlobalStyle"
import QuestionWrapper from "./QuestionWrapper"


const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/gamezone',
    element: <Play />,
    errorElement: <Error />,
    loader: optionLoader,
  },
  {
    path: 'finished',
    element: <Finished />,
  }
])



function App() {

  return <><GlobalStyle /><QuizProvider><RouterProvider router={router} /></QuizProvider></>
}

export default App