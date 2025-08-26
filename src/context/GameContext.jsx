import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children, initialPlayers }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [positions, setPositions] = useState(Array(initialPlayers.length).fill(0));
  const [turn, setTurn] = useState(0); // index of current player
  const [dice, setDice] = useState(null);
  const [moving, setMoving] = useState(false);

  // Move player by X (simulate animation)
  const movePlayer = (idx, steps) => {
    setMoving(true);
    let pos = positions[idx];
    let count = 0;
    const interval = setInterval(() => {
      if (count < steps) {
        pos += 1;
        setPositions((prev) => {
          const next = [...prev];
          next[idx] = pos;
          return next;
        });
        count++;
      } else {
        clearInterval(interval);
        setMoving(false);
        setTurn((prev) => (prev + 1) % players.length);
      }
    }, 200);
  };

  // Roll dice and move
  const playTurn = () => {
    if (moving) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    setTimeout(() => {
      movePlayer(turn, roll);
    }, 500);
  };

  // Bot auto-play
  React.useEffect(() => {
    if (players[turn].name.startsWith("Bot")) {
      setTimeout(() => {
        playTurn();
      }, 1200);
    }
    // eslint-disable-next-line
  }, [turn]);

  return (
    <GameContext.Provider value={{ players, positions, turn, dice, playTurn, moving }}>
      {children}
    </GameContext.Provider>
  );
};
