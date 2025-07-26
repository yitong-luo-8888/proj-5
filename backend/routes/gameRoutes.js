import express from 'express';
import { protect } from '../controllers/authController.js';
import {
  createOneQuiz,
  getOneQuiz,
  getAllQuizzes,
  gptWriteQuiz
} from '../controllers/staticGameController.js';

const router = express.Router();

router.route('/quizzes').get( getAllQuizzes);
router.route('/quizzes/:title').get(getOneQuiz);
router.route('/quizzes').post(protect, createOneQuiz);
router.route("/quizzes/gpt").post(protect, gptWriteQuiz);

export default router