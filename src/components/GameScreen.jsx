import React from "react";
import PlayerToken from "./PlayerToken";
import { useGame } from "../context/GameContext";
import "../styles/game.css";

// Example positions for 2-4 players
const playerPositions = {
  2: [
    { top: 24, left: 24 }, // top-left
    { bottom: 24, right: 24 }, // bottom-right
  ],
  3: [
    { top: 24, left: 24 }, // top-left
    { top: 24, right: 24 }, // top-right
    { bottom: 24, left: '50%', transform: 'translateX(-50%)' }, // bottom-center
  ],
  4: [
    { top: 24, left: 24 }, // top-left
    { top: 24, right: 24 }, // top-right
    { bottom: 24, left: 24 }, // bottom-left
    { bottom: 24, right: 24 }, // bottom-right
  ],
};


const GameScreen = () => {
  const { players, positions, turn, dice, playTurn, moving } = useGame();
  const numPlayers = players.length;
  return (
    <div className="game-board-wrapper flex items-center justify-center min-h-[400px] w-full">
      <div className="game-board relative max-w-[1200px] w-full h-[60vw] max-h-[700px] min-h-[400px] bg-white rounded-lg shadow-xl overflow-visible">
        {/* Board image can be placed here as background */}
        {players.map((player, idx) => (
          <PlayerToken
            key={player.name}
            name={player.name}
            color={player.color}
            score={positions[idx]}
            position={playerPositions[numPlayers][idx]}
            animate={true}
            highlight={turn === idx}
          />
        ))}
        {/* Player HUD */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {players.map((player, idx) => (
            <div key={player.name} className={`bg-white/90 rounded-xl shadow px-4 py-2 flex items-center gap-2 border ${turn === idx ? 'border-yellow-400' : 'border-gray-200'}`} style={{ minWidth: 120 }}>
              <span className={`color-badge bg-${player.color}`}></span>
              <span className="font-bold text-gray-800">{player.name}</span>
              <span className="text-xs text-gray-500">Score: {positions[idx]}</span>
            </div>
          ))}
        </div>
        {/* Controls */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center z-20">
          <div className="mb-2 text-lg font-semibold text-gray-800">
            {players[turn].name}'s turn {players[turn].name.startsWith('Bot') && '(Bot)'}
          </div>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
              onClick={playTurn}
              disabled={moving || players[turn].name.startsWith('Bot')}
              aria-label="Play turn"
            >
              {moving ? 'Moving...' : 'Play'}
            </button>
            <button
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300"
              onClick={() => window.location.reload()}
              aria-label="Reset game"
            >
              Reset
            </button>
          </div>
          {dice && <div className="mt-2 text-gray-700">Last roll: <span className="font-bold">{dice}</span></div>}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
