Jeopardy – 3 Hour Production Time

Welcome to Jeopardy Spinoff – a Jeopardy-style trivia game built with React, styled-components, and a reducer-powered state engine. This is a fully interactive, dynamic quiz experience that showcases clean architecture and thoughtful UX.

Highlights:

Jeopardy-Style Grid – Interactive 4x5 board with category headers and click-to-play tiles.

Context + Reducer State Engine – Redux-style logic using useReducer, built from scratch.

Live Scoring System – Tracks points in real-time based on correct answers and question values.

Answer Feedback – Buttons flash green/red depending on correctness before continuing.

Full Game Flow – From start → play → finish, with a restart button at the end.

Module-Level Data Caching – Prevents unnecessary re-fetching of quiz data.

Built With:

React (CRA): UI framework

React Router v6: Routing between game states

Styled-Components: Styling with scoped, dynamic styles

useReducer + Context: Global state management without Redux

Parse (Back4App): Cloud backend for quizzes and questions

Game Flow:

Home/Start Screen (optional)

Jeopardy Board (play area)

Question View (with answer buttons)

Finished Screen (score + restart)

Everything flows smoothly with React Router transitions and state-driven rendering.

What This Project Demonstrates:

Manual state machine construction with useReducer

Cached async loading with module-level memoization

Component-based UI composition

Clean, scalable styling using styled-components

Recruiter-friendly code structure and real-world UI logic

Contributors:
Yitong Luo 
Thomas Wynne

Contact:

Email – yluo9 [at] nd [dot] edu
Email – thomaswynnem [at] gmail [dot] com
GitHub – https://github.com/thomaswynnem