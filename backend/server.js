import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';
import Quiz from './Models/Quiz.js';
import User from './Models/Auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

app.post('/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)

    if (!username || !password)
      return res.status(400).json({ error: 'Username & password required' });

    const user = await User.create({ username, password });

    console.log(user)
    const token = signToken(user);
    console.log(token)
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    if (err.code === 11000)  // duplicate key
      return res.status(409).json({ error: 'Username already taken' });
    res.status(400).json({ error: err.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password)

  if (!username || !password)
    return res.status(400).json({ error: 'Username & password required' });

  const user = await User.findOne({ username });
  console.log(user)
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(user);
  console.log(token)
  res.json({ token, user: { id: user._id, username: user.username } });
});


app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/quizzes/:title', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ title: req.params.title });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function stripIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(stripIds);
  } else if (obj && typeof obj === 'object') {
    const { _id, ...cleaned } = obj;
    for (const key in cleaned) {
      cleaned[key] = stripIds(cleaned[key]);
    }
    return cleaned;
  }
  return obj;
}

app.post('/quizzes', protect, async (req, res) => {
  try {
    const cleanQuiz = stripIds(req.body);       
    const newQuiz = new Quiz(cleanQuiz);
    console.log(newQuiz);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (err) {
    console.error(err); 
    res.status(400).json({ error: err.message });
  }
});
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/quiz", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt required" });

  try {
    const gpt = await openai.chat.completions.create({
      model: "gpt-4o-mini",        
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
              You must return strictly valid JSON matching this type:

              type Quiz = {
                title: string,
                categories: {
                  name: string,
                  questions: {
                    points: number,
                    question: string,
                    answers: { text: string, correct: boolean }[]
                  }[]
                }[]
              }

              Rules:
              - Exactly 6 categories
              - Each category has exactly 5 questions
              - Each question has exactly 4 answers
              - Exactly ONE answer must have correct=true

              You MUST obey these rules without exception. Do not explain. Just return valid JSON.
              `
        },
        { role: "user", content: prompt }
      ]
    });
    let raw = gpt.choices[0].message.content.trim();
    console.log(raw)

    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    }

    const quiz = JSON.parse(raw); 
    return res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.post("/scores/:username", protect, async (req, res) => {
  const { username } = req.params;
  const { quizTitle, score, outOf } = req.body;

  if (!quizTitle || typeof score !== "number" || typeof outOf !== "number") {
    return res.status(400).json({ error: "quizTitle, score, and outOf are required" });
  }

  try {
    if (username !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = user.scores.find(score => score.quizTitle === quizTitle);

    if (existing) {
      // ✏️ Update the existing score
      existing.score = score;
      existing.outOf = outOf;
      existing.date = new Date(); // optional: update timestamp
    } else {
      // ➕ Add new score
      user.scores.push({ quizTitle, score, outOf });
    }

    await user.save();
    res.status(200).json({ message: "Score saved", scores: user.scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("/scores", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("scores username");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      username: user.username,
      scores: user.scores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));