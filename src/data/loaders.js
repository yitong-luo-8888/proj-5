// src/data/loaders.js
import { getAllQuizzes } from "./Quiz";

// 1) Fetch just the list of quiz titles for the Home page
export async function quizListLoader() {
  const quizzes = await getAllQuizzes();
  return quizzes.map(q => ({ title: q.title }));
}

// 2) Fetch a single quiz by title for /gamezone/:title
export async function quizLoader({ params }) {
  const title = params.title;
  const res = await fetch(`http://localhost:3001/quizzes/${encodeURIComponent(title)}`);
  if (!res.ok) throw new Response("Quiz not found", { status: 404 });
  const quiz = await res.json();

  // flatten categories → questions with unique IDs
  const flat = quiz.categories.flatMap(cat =>
  cat.questions.map((q, idx) => ({
    id:      q._id || `${cat.name}-${idx}`,
    topic:   cat.name,
    points:  q.points,
    question:q.question,
    answers: q.answers,
    index:   idx,
    title:   quiz.title // ✅ Add the title to every question
  }))
);

  return flat;
}
