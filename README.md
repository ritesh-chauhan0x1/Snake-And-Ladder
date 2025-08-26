
# 🎲 Snake and Ladder Game in React (2–4 Player Edition)

This is a web-based Snake and Ladder game developed using React.js, now supporting 2–4 player gameplay (with bots or friends), a backend for game state, and a polished, responsive UI.

## 🚀 Features

- Play with Bot (2–4 players, bots auto-play)
- Play with Friend (2–4 players, enter names/colors)
- Animated player tokens, colored outlines, and card-like HUD
- Turn-based logic, bot automation, and dice roll
- Backend (Express) for game creation and state
- Sound effects (click)
- Fully responsive and accessible design

## 🛠️ Technologies Used

- React.js (component-based UI)
- Express.js (backend API)
- Tailwind CSS + custom CSS
- JavaScript (ES6+)
- HTML5

## 📂 Files Added/Modified (feature/game-play-2to4 branch)

- `src/components/MainNavbar.jsx` — Top navigation bar
- `src/components/GameScreen.jsx` — Main game board and controls
- `src/components/PlayerToken.jsx` — Player token with animation
- `src/components/PlayerSetupModal.jsx` — Modal for player count/name/color
- `src/context/GameContext.jsx` — Game state, turn, dice, bot logic
- `src/styles/navbar.css` — Navbar styles
- `src/styles/game.css` — Board, token, HUD, responsive styles
- `src/assets/players/red.png`, `blue.png`, `green.png`, `black.png` — Player tokens
- `src/assets/sounds/click.mp3` — Sound effect
- `server/index.js` — Express backend
- `package.json` — Backend scripts and dependencies

## 📦 How to Run

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the backend server (port 4000):
   ```sh
   npm run start:server
   ```
3. In a new terminal, start the frontend:
   ```sh
   npm start
   ```
4. Open your browser at [http://localhost:5173](http://localhost:5173)

## 🧪 Demo Checklist

- [ ] Click **Play with Bot**: game starts, tokens placed, bots auto-play
- [ ] Click **Play with Friend**: modal for 2–4 players, then name/color entry, then game starts
- [ ] Turn order cycles, current player glows
- [ ] Tokens use red, blue, green, black PNGs (no duplicates)
- [ ] Responsive: tokens/HUD do not overlap on small screens
- [ ] Backend logs game creation and state requests
- [ ] Play/Reset buttons work

## ⚠️ Known Limitations & Next Improvements

- Player name/color entry modal is basic (can be improved for validation)
- No persistent backend (in-memory only)
- No full board logic (just demo token movement)
- Sound effects are minimal (add more for dice, win, etc.)

## 📝 Commit Messages

- Each commit is self-contained with a one-line message.
- Final commit: `chore: finish game MVP - navbar, setup, tokens and backend`

---

**Branch:** `feature/game-play-2to4`

---
