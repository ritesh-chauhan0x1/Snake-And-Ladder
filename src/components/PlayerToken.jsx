import React from "react";
import "../styles/game.css";

const PlayerToken = ({ name, color, score, position, animate, highlight }) => {
  // color: 'red' | 'blue' | 'green' | 'black'
  // position: { top, left, bottom, right, center }
  const colorMap = {
    red: require(`../assets/players/red.png`),
    blue: require(`../assets/players/blue.png`),
    green: require(`../assets/players/green.png`),
    black: require(`../assets/players/black.png`),
  };
  return (
    <div
      className={`player-token-container${animate ? ' token-animate' : ''}${highlight ? ' token-highlight' : ''}`}
      style={position}
      aria-label={`Player ${name}`}
    >
      <img
        src={colorMap[color]}
        alt={`${color} player token`}
        className={`player-token-img outline-${color}`}
      />
      <div className="player-meta">
        <span className={`color-badge bg-${color}`}></span>
        <span className="player-name">{name}</span>
        <span className="player-score">Score: {score}</span>
      </div>
    </div>
  );
};

export default PlayerToken;
