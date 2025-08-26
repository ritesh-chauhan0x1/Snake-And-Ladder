
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';


const app = express();
app.use(cors());
app.use(express.json());

const games = new Map();

// POST /api/game/create
app.post('/api/game/create', (req, res) => {
  const { mode, players } = req.body;
  const gameId = uuidv4();
  const initialState = {
    gameId,
    mode,
    players,
    state: 'waiting',
    turn: 0,
    positions: players.map(() => 0),
    createdAt: Date.now(),
  };
  games.set(gameId, initialState);
  console.log(`[CREATE] Game ${gameId} created with mode=${mode}, players=${players.length}`);
  res.json({ gameId, state: initialState });
});

// GET /api/game/:gameId/state
app.get('/api/game/:gameId/state', (req, res) => {
  const { gameId } = req.params;
  const game = games.get(gameId);
  console.log(`[STATE] Game ${gameId} state requested`);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Snake & Ladder backend running on port ${PORT}`);
});
