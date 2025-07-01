# Mini Jeopardy

**Mini Jeopardy** is a trivia game inspired by *Jeopardy*, built with **React**, **Parse**, and a custom global state engine using `useReducer`. It’s a fully interactive quiz app that emphasizes clean component design, modular architecture, and a smooth user experience.

Built in collaboration with **Yitong**, this project involved shared development across frontend components, backend integration via Back4App (Parse), and state management architecture.

---

## Key Features

- Interactive **4x5 game board** with category headers and clickable question tiles  
- **Answer feedback** system showing correctness with temporary color changes  
- **Real-time scoring** based on question point values  
- Full game loop: **start → play → finish → restart**  
- **Data caching** to minimize redundant API requests and improve load times  

---

## Tech Stack

| Technology         | Role                                         |
|--------------------|----------------------------------------------|
| React (CRA)        | Frontend UI and routing                      |
| React Router v6    | Page and state-based transitions             |
| Styled-components  | Modular, scoped component styling            |
| useReducer + Context | Global game state management               |
| Parse (Back4App)   | Cloud database for questions and metadata    |

---

## Game Flow

1. Start Screen  
2. Game Board  
3. Question View  
4. Finished Screen (with score and restart option)

State transitions are managed via `useReducer` and synced with React Router views.

---

## Development Highlights

- Designed a **custom reducer-based state engine** to manage question state, scoring, and navigation  
- Integrated **Back4App (Parse)** to load questions and quiz metadata dynamically  
- Organized all Parse queries in isolated model files for clean separation of concerns  
- Implemented efficient **data caching** at the module level to reduce backend load  
- Collaborated across architecture, styling, and gameplay logic with clear division of responsibilities

---

## Contact

**Thomas Mitchell**  
GitHub – [@thomaswynnem](https://github.com/thomaswynnem)

> A clean React architecture project with practical UI logic and backend integration — designed for clarity, simplicity, and reuse.
