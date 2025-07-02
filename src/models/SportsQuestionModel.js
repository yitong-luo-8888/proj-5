import Parse from '../services/parseConfig';

export async function fetchSportsQuestions() {
  const SportsQuestion = Parse.Object.extend('Sports_Questions');
  const query = new Parse.Query(SportsQuestion);
  query.include('topic_area');
  return query.find();
}
