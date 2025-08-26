import React from "react";
import "../styles/navbar.css";

const MainNavbar = ({ onNavClick }) => {
  return (
    <nav className="main-navbar w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="font-bold text-xl tracking-wide">Snake & Ladder</div>
      <div className="flex gap-4">
        <button
          className="nav-btn px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => onNavClick("bot")}
          aria-label="Play with Bot"
        >
          Play with Bot
        </button>
        <button
          className="nav-btn px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => onNavClick("friend")}
          aria-label="Play with Friend"
        >
          Play with Friend
        </button>
      </div>
    </nav>
  );
};

export default MainNavbar;
