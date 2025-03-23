import React, { useEffect, useRef, useState } from "react";
import { SnakeAndLadder } from "../board";
import Cell from "./Cell";
import { motion } from "framer-motion";

const Game = () => {
  const game = new SnakeAndLadder();

  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [human, setHuman] = useState({ x: 0, y: 0, value: 0 });
  const [bot, setBot] = useState({ x: 0, y: 0, value: 0 });
  const [prevTurn, setPrevTurn] = useState(null);
  const [initialInfo, setInitialInfo] = useState({
    human: null,
    bot: null,
  });

  const humanRef = useRef();
  const botRef = useRef();
  const diceRef = useRef();

  const refMapping = {
    human: humanRef,
    bot: botRef,
  };

  const rollDice = async (e) => {
    if (prevTurn && e.isTrusted) return;
    setIsRolling(true);
    const diceSound = new Audio("/diceroll.mp3");
    diceSound.play();
    try {
      const val = Math.floor(Math.random() * 6) + 1;
      await new Promise((res) => {
        setTimeout(res, 1000);
      });
      setDiceValue(val);
      setPrevTurn(!prevTurn);
    } catch (error) {
    } finally {
      setIsRolling(false);
    }
  };

  useEffect(() => {
    if (prevTurn == null) return;

    const move = async () => {
      await new Promise((res) => setTimeout(res, 700));
      let nextVal = (prevTurn ? human.value : bot.value) + diceValue;

      if (nextVal > game.n) {
        rollBotDice();
        return;
      }

      let ref = refMapping[nextVal];
      if (ref && ref.current) {
        const cellRect = ref.current.getBoundingClientRect();
        if (prevTurn) {
          console.log("human", {
            x: cellRect.left - initialInfo.human.left,
            y: cellRect.top - initialInfo.human.top,
            value: nextVal,
          });
          setHuman({
            x: cellRect.left - initialInfo.human.left,
            y: cellRect.top - initialInfo.human.top,
            value: nextVal,
          });
        } else {
          console.log("bot", {
            x: cellRect.right - initialInfo.bot.right,
            y: cellRect.top - initialInfo.bot.top,
            value: nextVal,
          });
          setBot({
            x: cellRect.right - initialInfo.bot.right,
            y: cellRect.top - initialInfo.bot.top,
            value: nextVal,
          });
        }
      }

      if (nextVal == 100) {
        alert(prevTurn ? "You Win" : "You Loose");
        window.location.reload();
        return;
      }

      if (game.snakes[nextVal]) {
        const audio = new Audio("/snakesound.mp3");
        audio.play();
        nextVal = game.snakes[nextVal];
      } else if (game.ladder[nextVal]) {
        const diceSound = new Audio("/laddersound.mp3");
        diceSound.play();
        nextVal = game.ladder[nextVal];
      } else nextVal = null;

      if (nextVal) {
        if (game.snakes) await new Promise((res) => setTimeout(res, 1000));

        ref = refMapping[nextVal];
        if (ref && ref.current) {
          const cellRect = ref.current.getBoundingClientRect();
          if (prevTurn) {
            console.log("human f", {
              x: cellRect.left - initialInfo.human.left,
              y: cellRect.top - initialInfo.human.top,
              value: nextVal,
            });
            setHuman({
              x: cellRect.left - initialInfo.human.left,
              y: cellRect.top - initialInfo.human.top,
              value: nextVal,
            });
          } else {
            console.log("bot f", {
              x: cellRect.right - initialInfo.bot.right,
              y: cellRect.top - initialInfo.bot.top,
              value: nextVal,
            });
            setBot({
              x: cellRect.right - initialInfo.bot.right,
              y: cellRect.top - initialInfo.bot.top,
              value: nextVal,
            });
          }
        }
      }

      rollBotDice();
    };

    move();
  }, [prevTurn]);

  const rollBotDice = async () => {
    await new Promise((res) => setTimeout(res, 1500));
    if (prevTurn) {
      diceRef.current.click();
    }
  };

  useEffect(() => {
    console.log({
      human: humanRef.current?.getBoundingClientRect(),
      bot: botRef.current?.getBoundingClientRect(),
    });

    setInitialInfo({
      human: humanRef.current?.getBoundingClientRect(),
      bot: botRef.current?.getBoundingClientRect(),
    });
  }, [humanRef, botRef]);

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="flex flex-col justify-end h-[700px]">
        <div className="h-[70px] w-[70px] gap-0 flex items-center justify-center">
          <motion.div
            ref={humanRef}
            animate={{ x: human.x, y: human.y }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="h-full"
          >
            <img src="/red.png" height={35} width={35} alt="" className="" />
          </motion.div>

          <motion.div
            ref={botRef}
            animate={{ x: bot.x, y: bot.y }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="h-full"
          >
            <img src="/blue.png" height={35} width={35} alt="" className="" />
          </motion.div>
        </div>
      </div>
      <div className="overflow-hidden board h-[700px] w-[700px]">
        <div className="grid grid-cols-10 grid-rows-10">
          {game.board.map((_, index) => {
            return (
              <Cell
                key={index}
                value={game.getValue(index)}
                refMapping={refMapping}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div
        className={`p-2 w-60 rounded-2xl absolute top-1/2 right-20 text-center font-semibold text-2xl ${
          prevTurn
            ? "bg-blue-500/10 text-blue-500"
            : "bg-red-500/10 text-red-500"
        } `}
      >
        {prevTurn ? (
          <div className="flex items-center justify-center gap-1">
            <img src="/blue.png" height={35} width={35} alt="" className="" />
            <p>Computer Turn</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <img src="/red.png" height={35} width={35} alt="" className="" />
            <p>Your Turn</p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end h-[700px]">
        <div className="h-[70px] gap-0 flex flex-col items-center justify-center">
          <button onClick={rollDice} disabled={isRolling} ref={diceRef}>
            <img
              src={isRolling ? "roll.gif" : diceValue + ".png"}
              height={70}
              width={70}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
