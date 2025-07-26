// models/Quiz.js

// (No more Parse imports)
// models/Quiz.js
export async function getAllQuizzes() {
  try {
    const res = await fetch('http://localhost:3001/quizzes'); // ← include http://localhost
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch quizzes:', err);
    return [];
  }
}