import Parse from '../services/parseConfig';

export async function fetchAllQuizzes() {
  const Quiz = Parse.Object.extend('Quizzes');
  const query = new Parse.Query(Quiz);
  return query.find();
}
