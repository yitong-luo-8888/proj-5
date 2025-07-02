import Parse from '../services/parseConfig';

export async function fetchTelevisionQuestions() {
  const TVQuestion = Parse.Object.extend('Television_Questions');
  const query = new Parse.Query(TVQuestion);
  query.include('topic_area');
  return query.find();
}
