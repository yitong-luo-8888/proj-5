// models/SportsQuestion.js
import Parse from './parseConfig';

const SportsQuestion = Parse.Object.extend('Sports_Questions');

export async function getAllSportsQuestions() {
  const query = new Parse.Query(SportsQuestion);
  query.include('topic_area');
  try {
    return await query.find();
  } catch (err) {
    console.error('Failed to fetch Sports questions:', err);
    return [];
  }
}