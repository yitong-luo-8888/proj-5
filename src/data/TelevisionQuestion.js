// models/TelevisionQuestion.js
import Parse from './parseConfig';

const TelevisionQuestion = Parse.Object.extend('Television_Questions');

export async function getAllTelevisionQuestions() {
  const query = new Parse.Query(TelevisionQuestion);
  query.include('topic_area');
  try {
    return await query.find();
  } catch (err) {
    console.error('Failed to fetch Television questions:', err);
    return [];
  }
}
