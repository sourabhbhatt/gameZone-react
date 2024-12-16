import React, { memo } from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import winningAnimation from "./assets/tictactoeSuccessAnimation.json";

const WinningModal = ({ isOpen, onPlayAgain, winnerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center p-8 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          🎉 {winnerName} {winnerName === "You" ? "Won" : "Wins"}! 🎉
        </h2>
        <Lottie
          animationData={winningAnimation}
          loop
          autoplay
          className="w-48 h-48"
        />
        <button
          onClick={onPlayAgain}
          className="mt-6 px-6 py-2 bg-purple-600 text-white text-lg font-semibold rounded-full hover:bg-purple-700 transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

WinningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  winnerName: PropTypes.string.isRequired,
};

export default memo(WinningModal);
