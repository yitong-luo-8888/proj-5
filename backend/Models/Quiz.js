// Models/Quiz.js
/*
  Mongoose model for storing quiz games
  - Includes metadata (title, topic)
  - Questions with options, correct index
  - Can be used for both static and AI-generated quizzes
*/
import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true }
});

const QuestionSchema = new mongoose.Schema({
  points: { type: Number, required: true },
  question: { type: String, required: true },
  answers: {
    type: [AnswerSchema],
    validate: {
      validator: function(arr) { return arr.length === 4; },
      message: 'Each question must have exactly 4 answers'
    }
  }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: {
    type: [QuestionSchema],
    validate: {
      validator: function(arr) { return arr.length === 5; },
      message: 'Each category must have exactly 5 questions'
    }
  }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: {
    type: [CategorySchema],
    validate: {
      validator: function(arr) { return arr.length === 6; },
      message: 'Quiz must have exactly 6 categories'
    }
  }
});

export default mongoose.model('Quiz', QuizSchema);
