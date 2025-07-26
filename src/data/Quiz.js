export async function getAllQuizzes() {
  try {
    const res = await fetch('http://localhost:3001/api/v1/gameRoutes/quizzes');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch quizzes:', err);
    return [];
  }
}