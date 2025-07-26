// models/Quiz.js
import mongoose from 'mongoose';

// Answer subdocument: text + correctness flag
const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, required: true }
});

// Question subdocument: points value, question text, and exactly 4 answers
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

// Category subdocument: name and exactly 5 questions
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

// Quiz document: title + exactly 6 categories
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
