// models/Quiz.js
import Parse from './parseConfig';

const Quiz = Parse.Object.extend('Quizzes');

export async function getAllQuizzes() {
  const query = new Parse.Query(Quiz);
  try {
    return await query.find();
  } catch (err) {
    console.error('Failed to fetch Quizzes:', err);
    return [];
  }
}