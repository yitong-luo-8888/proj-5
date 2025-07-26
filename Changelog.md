# Changelog

All notable changes to this project are documented by development day.

---

## [0.1.0] - 2025-07-22

### 🎮 Gameplay Engine & Core UI
- Implemented Jeopardy-style game board and logic
- Built `Play.js`, `GameCard.js`, `Question.js` components for rendering the interactive quiz interface
- Added routing with React Router for navigation between Welcome, Play, and Finish screens
- Established `gameContext.js` for managing question state, current round, and answer tracking

---

## [0.2.0] - 2025-07-23

### 🛠️ Quiz Creator Tool (Manual)
- Developed `CreateQuiz.js` and `JeopardyForm.js` for creating quizzes manually
- Allowed users to select topics, enter questions, and assign correct answers
- Implemented backend endpoint to save custom quizzes via `Quiz.js` model
- Hooked quiz creation into frontend with form validation and context state

---

## [0.3.0] - 2025-07-24

### 🔐 Authentication System
- Created `Login.js`, `Signup.js`, and implemented JWT-based login logic in `authController.js`
- Protected routes using `authGuard.js` and `newAuthContext.js`
- Stored user credentials securely with hashing in `Auth.js` (Mongoose schema)
- Ensured authenticated sessions persist across reloads with localStorage

---

## [0.4.0] - 2025-07-25

### 🤖 AI Quiz Generation via OpenAI
- Integrated OpenAI GPT-4 to auto-generate Jeopardy-style quiz sets
- Created `staticGameController.js` with prompt templates and response parsing
- Added server logic to handle prompt → AI → structured quiz transformation
- Enabled quiz generation via backend POST call and integrated response into frontend

---

## [1.0.0] - 2025-07-26

### 📊 User Scores & Game Completion
- Built `userScoreController.js` for saving and retrieving quiz scores
- Created `Scores.js` and `Finished.js` to display performance summaries
- Linked scores to authenticated users and stored via `Quiz.js` schema
- Finalized app-wide styling via `GlobalStyle.js` and `styles.js`
- Wrapped up testing, minor UI refinements, and bug fixes
