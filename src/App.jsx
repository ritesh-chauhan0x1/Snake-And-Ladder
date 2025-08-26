

import React, { useState } from "react";
import MainNavbar from "./components/MainNavbar";
import GameScreen from "./components/GameScreen";
import { GameProvider } from "./context/GameContext";
import PlayerSetupModal from "./components/PlayerSetupModal";

const App = () => {
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [gameMode, setGameMode] = useState(null); // 'bot' or 'friend'
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([
    { name: 'Player 1', color: 'red', score: 0 },
    { name: 'Bot 1', color: 'blue', score: 0 },
  ]);
  const [showGame, setShowGame] = useState(false);
  const [animateTokens, setAnimateTokens] = useState(false);

  const handleNavClick = (mode) => {
    setGameMode(mode);
    if (mode === "bot") {
      // Default: 2 players, user is red, bot is blue
      setPlayers([
        { name: 'You', color: 'red', score: 0 },
        { name: 'Bot 1', color: 'blue', score: 0 },
      ]);
      setNumPlayers(2);
      setShowGame(true);
      setShowPlayerModal(false);
      setTimeout(() => setAnimateTokens(true), 100); // trigger entrance
    } else if (mode === "friend") {
      setShowPlayerModal(true);
    }
  };

  const handlePlayerSelect = (count) => {
    setNumPlayers(count);
    // For now, auto-fill players for demo
    const colorOrder = ['red', 'blue', 'green', 'black'];
    const newPlayers = Array(count).fill(0).map((_, i) => ({
      name: `Player ${i + 1}`,
      color: colorOrder[i],
      score: 0,
    }));
    setPlayers(newPlayers);
    setShowPlayerModal(false);
    setShowGame(true);
    setTimeout(() => setAnimateTokens(true), 100);
    // TODO: Show player name/color entry modal next
  };

  return (
    <>
      <MainNavbar onNavClick={handleNavClick} />
      <PlayerSetupModal
        isOpen={showPlayerModal}
        onSelect={handlePlayerSelect}
        onClose={() => setShowPlayerModal(false)}
      />
      <div style={{ paddingTop: 72 }}>
        {/* Add top padding to avoid navbar overlap */}
        {showGame ? (
          <GameProvider initialPlayers={players}>
            <GameScreen animateTokens={animateTokens} />
          </GameProvider>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[600px] text-gray-500 text-xl">
            <p>Select a game mode to start playing.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
