Project Video: 
https://youtu.be/7VlBXrs4UzA
🎮 Mini Jeopardy
Mini Jeopardy is a trivia game inspired by Jeopardy! — built with React, Parse, and a custom global state engine using useReducer. It’s a fully interactive quiz app that emphasizes clean component design, modular architecture, and a smooth user experience.

👥 Built in collaboration with Yitong

🚀 Features
🎯 Interactive 4x5 Jeopardy board

🧠 Instant answer feedback with visual cues

📈 Real-time scoring based on point values

🔁 Full game loop: start → play → finish → restart

⚡ Smart data caching to reduce API requests

🧱 Tech Stack
Layer	Tech Used
🖥️ Frontend	React (CRA)
🔁 Routing	React Router v6
🎨 Styling	Styled-components
🧠 State Engine	useReducer + Context API
☁️ Backend DB	Parse (Back4App)

🧩 Game Flow
Start Screen

Game Board

Question View

Finish Screen with score + restart option

All views are synced with React Router and powered by a centralized reducer for consistent, reactive state management.

💻 Development Highlights
⚙️ Built a custom reducer engine for game state logic

☁️ Integrated with Parse SDK for cloud data storage

🧼 Clean architecture with decoupled data/model files

⚡ Optimized backend access with local data caching

🤝 Collaborative project with shared frontend/backend ownership

🛠️ Getting Started
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/mini-jeopardy.git
cd mini-jeopardy
2. Backend Setup
bash
Copy
Edit
cd backend
npm install
3. Create a .env file in the backend/ folder
⚠️ You must provide your own credentials.
Never commit sensitive info — use .env and add it to .gitignore.

env
Copy
Edit
# .env (example)

# MongoDB connection string
MONGODB_URI=your_mongodb_connection_uri

# Port the backend will run on
PORT=3001

# JWT Auth config
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h

# OpenAI API Key (for quiz generation)
OPENAI_API_KEY=your_openai_api_key
4. Start the backend
bash
Copy
Edit
npm run dev
5. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
🖼️ Screenshots (optional)
Game Board 🧠	Question Screen ❓	Score Screen 🏆
(Add screenshots here if available)		

🙋 About the Creator
Thomas Mitchell
GitHub – @thomaswynnem

A clean, scalable React project built for fun, learning, and future extensions.

Let me know if you want to add:

📡 Live demo link / deploy instructions

🧪 Test cases

🧩 Quiz authoring tools guide

👥 Contribution instructions

You’re ready to ship this to the world 🌍🔥
