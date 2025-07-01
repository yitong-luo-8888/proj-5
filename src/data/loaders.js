// loaders/optionLoader.js
import { getAllQuizzes } from './Quiz';
import { getAllSportsQuestions } from './SportsQuestion';
import { getAllTelevisionQuestions } from './TelevisionQuestion';

let quizCache = null;

export async function optionLoader() {
  if (quizCache) {
    console.log("Using cached quiz data");
    return quizCache;
  }

  const ORDER = ['television_shows', 'television_movies', 'sports_football', 'sports_soccer'];

  const quizRows = await getAllQuizzes();

  const quizIdToMeta = {};
  quizRows.forEach((quiz) => {
    quizIdToMeta[quiz.id] = {
      topic: quiz.get('topic'),
      questionNumber: quiz.get('questionNumber'),
    };
  });

  const sportsQuestions = await getAllSportsQuestions();
  const tvQuestions = await getAllTelevisionQuestions();

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

  const columnFirstOrdered = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 4; col++) {
      const question = finalOrdered[col * 5 + row];
      if (question) columnFirstOrdered.push(question);
    }
  }

  quizCache = columnFirstOrdered;
  return columnFirstOrdered;
}
