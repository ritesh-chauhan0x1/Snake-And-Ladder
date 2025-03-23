import React, { useState } from "react";

const snakes = {
  25: 3,
  42: 1,
  56: 48,
  61: 43,
  92: 67,
  94: 12,
  98: 80,
};
const ladders = {
  7: 30,
  16: 33,
  20: 38,
  36: 83,
  50: 68,
  63: 81,
  71: 89,
  86: 97,
};

const generateBoardNumbers = () => {
  let board = [];
  for (let row = 9; row >= 0; row--) {
    let numbers = [];
    for (let col = 0; col < 10; col++) {
      numbers.push(row % 2 === 0 ? row * 10 + col + 1 : (row + 1) * 10 - col);
    }
    board.push(...numbers);
  }
  return board;
};

const boardNumbers = generateBoardNumbers();

const SnakeLadder = () => {
  const [playerPos, setPlayerPos] = useState(0);
  const [botPos, setBotPos] = useState(0);
  const [dice, setDice] = useState(1);
  const [turn, setTurn] = useState("You");
  const [rolling, setRolling] = useState(false);
  const [hasPlayerRoll, setHasPlayerRoll] = useState(false);

  const rollDiceSound = new Audio("roll.mp3");

  const movePlayer = (currentPos, roll, setPos, player) => {
    console.log(currentPos, roll);
    if (currentPos + roll > 100) return;
    let newPos = currentPos;
    const interval = setInterval(() => {
      if (newPos < currentPos + roll) {
        newPos++;
        setPos(newPos);
      } else {
        clearInterval(interval);
        if (snakes[newPos]) newPos = snakes[newPos];
        if (ladders[newPos]) newPos = ladders[newPos];
        setPos(newPos);

        if (newPos === 100) {
          alert(player + " Wins");
          window.location.reload();
        }
      }
    }, 300);
  };

  const rollDice = () => {
    if (hasPlayerRoll) return;
    if (turn !== "You" || rolling) return;
    rollDiceSound.play();

    setHasPlayerRoll(turn);
    setRolling(true);
    setDice(null);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDice(roll);
      setRolling(false);
      movePlayer(playerPos, roll, setPlayerPos, "You");
      setTimeout(() => {
        setTurn("bot");
        setTimeout(botMove, roll * 300 + 100);
      }, roll * 300 + 500);
    }, 1000);
  };

  const botMove = () => {
    setRolling(true);
    setDice(null);
    rollDiceSound.play();
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDice(roll);
      movePlayer(botPos, roll, setBotPos, "Bot");
      setRolling(false);
      setTimeout(() => {
        setTurn("You");
        setHasPlayerRoll(false);
      }, roll * 300 + 500);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Snake & Ladder</h1>
        <div
          className="relative w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-cover bg-center grid grid-cols-10 border-2"
          style={{ backgroundImage: "url('board.png')" }}
        >
          {boardNumbers.map((num) => (
            <div
              key={num}
              className="relative w-[9vw] h-[9vw] md:w-[60px] md:h-[60px] flex items-center justify-center"
            >
              {playerPos === num && (
                <img
                  src="blue.png"
                  alt="Player"
                  className="absolute w-6 h-6 md:w-8 md:h-8 left-1 top-1 md:left-2 md:top-2 transition-transform duration-300"
                />
              )}
              {botPos === num && (
                <img
                  src="red.png"
                  alt="Bot"
                  className="absolute w-6 h-6 md:w-8 md:h-8 right-1 bottom-1 md:right-2 md:bottom-2 transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          {playerPos == 0 && (
            <img
              src="blue.png"
              alt="Player"
              className="w-6 h-6 md:w-8 md:h-8"
            />
          )}
          {botPos === 0 && (
            <img src="red.png" alt="Bot" className="w-6 h-6 md:w-8 md:h-8" />
          )}
        </div>
      </div>
      <div className="mt-6 md:ml-8 flex flex-col items-center">
        <div className="mt-4">
          {rolling ? (
            <img src="roll.gif" alt="Rolling..." className="w-16 h-16" />
          ) : (
            <img
              src={`${dice}.png`}
              alt={`Dice ${dice}`}
              className="w-16 h-16"
              onClick={rollDice}
              style={{
                cursor: rolling ? "not-allowed" : "pointer",
                pointerEvents: rolling ? "none" : "auto",
              }}
            />
          )}
        </div>
        <div className="mt-2 font-bold flex w-40 justify-center items-center gap-2">
          {turn === "You" ? (
            <img src="blue.png" alt="Bot" className="w-6 h-6 md:w-8 md:h-8" />
          ) : (
            <img src="red.png" alt="Bot" className="w-6 h-6 md:w-8 md:h-8" />
          )}
          <span>{turn.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default SnakeLadder;
