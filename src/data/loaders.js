import { getAllQuizzes } from "./Quiz";

export async function quizListLoader() {
  const quizzes = await getAllQuizzes();
  return quizzes.map(q => ({ title: q.title }));
}

export async function quizLoader({ params }) {
  const title = params.title;
  const res = await fetch(`http://localhost:3001/api/v1/gameRoutes/quizzes/${encodeURIComponent(title)}`);
  if (!res.ok) throw new Response("Quiz not found", { status: 404 });
  const quiz = await res.json();

  const flat = quiz.categories.flatMap(cat =>
  cat.questions.map((q, idx) => ({
    id:      q._id || `${cat.name}-${idx}`,
    topic:   cat.name,
    points:  q.points,
    question:q.question,
    answers: q.answers,
    index:   idx,
    title:   quiz.title 
  }))
);

  return flat;
}
