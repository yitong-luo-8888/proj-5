# 🔥 Super Cool Bro Proj

Welcome to **Super Cool Bro Proj** – a Jeopardy-style trivia game built with **React**, **styled-components**, and a touch of 🔥. This project showcases full-stack skill, clean UI/UX, and interactive gameplay powered by dynamic data and React context.

## 🎯 Features

- 🎮 **Jeopardy-Style Grid** – Cleanly styled 4x5 question board using `styled-components`.
- 🧠 **Trivia Engine** – Supports dynamic topic/question loading using a cloud-based Parse backend.
- ✅ **Live Scoring** – Track your score in real time with automatic correctness checks.
- ⏱️ **Answer Feedback** – Highlights correct and incorrect answers with color-coded buttons and animations.
- 🔁 **Restartable Game Loop** – Full reducer-based state management (like Redux-lite) with `useReducer`.
- 🌐 **Route-Based Flow** – Powered by React Router for smooth transitions between game states.
- 🗃️ **Module-Level Caching** – Prevents unnecessary reloads and boosts dev performance.

## ⚙️ Tech Stack

| Frontend        | Backend           | Tools & Libraries           |
|-----------------|-------------------|-----------------------------|
| React (Vite)    | Parse Server (Cloud) | React Router, styled-components |
| useReducer      | Parse Object Queries | Context API                |
| React Router v6 |                   |                             |

## 📸 Screenshots

| Gameplay                | Scoreboard              | Finish Screen            |
|-------------------------|--------------------------|---------------------------|
| ![gameplay](./assets/game.png) | ![score](./assets/score.png) | ![finish](./assets/finish.png) |

> _Note: Replace with your actual screenshots for max fire_ 🔥

## 🧠 Why It Matters

This project demonstrates:
- 🔄 **State machine logic** via `useReducer`
- ⚡️ **Optimized data fetching** using module-scoped caching
- 🧩 **Component composition** for scalable UI
- 🧼 **Clean styling** with full control using `styled-components`
- 🚀 **Real-world deployability** with GitHub + Parse + Vite

## 🚀 Getting Started

```bash
git clone https://github.com/thomaswynnem/super_cool_bro_proj.git
cd super_cool_bro_proj
npm install
npm run dev
