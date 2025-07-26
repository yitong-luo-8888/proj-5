import Quiz from './../Models/Quiz.js';
import OpenAI from 'openai';

import dotenv from './../dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getOneQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ title: req.params.title });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createOneQuiz = async (req, res) => {
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
}

export const gptWriteQuiz = async (req, res) => {
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

              You MUST obey these rules without exception. Do not explain. Just return valid JSON of 6 category jeopardy
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
}