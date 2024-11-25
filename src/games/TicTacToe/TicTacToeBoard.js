import React from "react";

const TicTacToeBoard = ({ gameState, onMove, winningCombination }) => {
  // Function to calculate line position and orientation based on winning combination
  const getLineStyle = (combination) => {
    if (!combination) return {};
    const [a, b, c] = combination;

    if (a === 0 && b === 1 && c === 2) {
      return { top: "16.66%", left: "0", width: "100%", height: "2px", transform: "translateY(-50%)" };
    }
    if (a === 3 && b === 4 && c === 5) {
      return { top: "50%", left: "0", width: "100%", height: "2px", transform: "translateY(-50%)" };
    }
    if (a === 6 && b === 7 && c === 8) {
      return { top: "83.33%", left: "0", width: "100%", height: "2px", transform: "translateY(-50%)" };
    }
    if (a === 0 && b === 3 && c === 6) {
      return { top: "0", left: "16.66%", width: "2px", height: "100%", transform: "translateX(-50%)" };
    }
    if (a === 1 && b === 4 && c === 7) {
      return { top: "0", left: "50%", width: "2px", height: "100%", transform: "translateX(-50%)" };
    }
    if (a === 2 && b === 5 && c === 8) {
      return { top: "0", left: "83.33%", width: "2px", height: "100%", transform: "translateX(-50%)" };
    }
    if (a === 0 && b === 4 && c === 8) {
      return {
        top: "0",
        left: "0",
        width: "100%",
        height: "2px",
        transform: "rotate(45deg) translateY(-50%)",
        transformOrigin: "0 0",
      };
    }
    if (a === 2 && b === 4 && c === 6) {
      return {
        top: "0",
        left: "0",
        width: "100%",
        height: "2px",
        transform: "rotate(-45deg) translateY(-50%)",
        transformOrigin: "100% 0",
      };
    }
    return {};
  };

  const lineStyle = getLineStyle(winningCombination);

  return (
    <div
      className="relative w-[280px] h-[280px] rounded-xl bg-[#001e1c]"
      style={{ boxShadow: "0 0 5px rgba(106, 255, 176, 0.5)" }}
    >
      {/* Winning Line */}
      {winningCombination && (
        <div
          className="absolute bg-gradient-to-r from-green-400 via-green-600 to-green-400"
          style={{ ...lineStyle }}
        ></div>
      )}

      {/* Vertical Lines */}
      <div className="absolute top-0 left-[33.33%] w-[1px] h-full bg-gradient-to-b from-green-200 via-green-400 to-green-200" />
      <div className="absolute top-0 left-[66.66%] w-[1px] h-full bg-gradient-to-b from-green-200 via-green-400 to-green-200" />

      {/* Horizontal Lines */}
      <div className="absolute left-0 top-[33.33%] w-full h-[1px] bg-gradient-to-r from-green-200 via-green-400 to-green-200" />
      <div className="absolute left-0 top-[66.66%] w-full h-[1px] bg-gradient-to-r from-green-200 via-green-400 to-green-200" />

      {/* Grid */}
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
        {gameState.map((cell, index) => (
          <button
            key={index}
            className="flex justify-center items-center w-full h-full"
            onClick={() => onMove(index)}
            disabled={!!cell}
          >
            <span
              className={`text-5xl font-bold transition-transform duration-500 ${
                cell === "X"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-green-400 animate-scale"
                  : cell === "O"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-600 to-purple-400 animate-scale"
                  : ""
              }`}
            >
              {cell}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TicTacToeBoard);
