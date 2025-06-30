import Parse from './parseConfig';

let quizCache = null;

export async function optionLoader() {

  if (quizCache) {
    console.log("Using cached quiz data");
    return quizCache;
  }

  const ORDER = ['television_shows', 'television_movies', 'sports_football', 'sports_soccer'];

  const Quiz = Parse.Object.extend('Quizzes');
  const quizQuery = new Parse.Query(Quiz);

  let quizRows = [];

  try {
    quizRows = await quizQuery.find();
    console.log(quizRows)
  } catch (err) {
    console.error('Failed to fetch Quizzes:', err);
    return [];
  }

  const quizIdToMeta = {};

  quizRows.forEach((quiz) => {
    quizIdToMeta[quiz.id] = {
      topic: quiz.get('topic'),
      questionNumber: quiz.get('questionNumber'),
    };
  });if (quizCache) {
    console.log("Using cached quiz data");
    return quizCache;
  }

  const sportsQuery = new Parse.Query('Sports_Questions');
  sportsQuery.include('topic_area');

  const tvQuery = new Parse.Query('Television_Questions');
  tvQuery.include('topic_area');

  let sportsQuestions = [];
  let tvQuestions = [];

  try {
    sportsQuestions = await sportsQuery.find();
    tvQuestions = await tvQuery.find();
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    return [];
  }

  const allQuestions = [];

  const attach = (questionList, source) => {
  for (const q of questionList) {
    const quiz = q.get('topic_area');
    if (!quiz) continue;

    const quizId = quiz.id;
    if (!quizIdToMeta[quizId]) continue;

    const { topic, questionNumber } = quizIdToMeta[quizId];

    const rawAnswers = q.get('answers');

    const points = q.get('points') ?? 1;


    allQuestions.push({
      id: q.id,
      topic,
      questionNumber,
      question: q.get('question'),
      difficulty: q.get('difficulty'),
      source,
      rawAnswers,
      points
    });
  }
};

  attach(tvQuestions, 'Television');
  attach(sportsQuestions, 'Sports');

  // Step: Slice 5 per topic in order, sort by questionNumber, assign index 1–20
  const finalOrdered = [];

  for (const topic of ORDER) {
    const chunk = allQuestions
      .filter(q => q.topic === topic)
      .sort((a, b) => a.questionNumber - b.questionNumber)
      .slice(0, 5);
    finalOrdered.push(...chunk);
  }

  finalOrdered.forEach((q, idx) => {
    q.index = idx + 1;
  });
  console.log(finalOrdered)

  finalOrdered.forEach((q, idx) => {
  q.index = idx + 1;
});

// Reorder for 4-column, 5-row Jeopardy-style grid
const columnFirstOrdered = [];

for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 4; col++) {
    const question = finalOrdered[col * 5 + row];
    if (question) columnFirstOrdered.push(question);
  }
}

console.log(columnFirstOrdered);

quizCache = columnFirstOrdered;
return columnFirstOrdered;

  
}
