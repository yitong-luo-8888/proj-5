import express from 'express';
import { login, signup, protect } from '../controllers/authController.js';
import { postScores, getScores } from '../controllers/userScoreController.js';

const router = express.Router();


router.route('/signup').post(signup);
router.route('/login').post(login) 
router.route("/scores/:username").post(protect, postScores)
router.route("/scores/:username").get(protect, getScores)

export default router