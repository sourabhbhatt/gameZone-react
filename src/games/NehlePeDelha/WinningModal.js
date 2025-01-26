import Lottie from "lottie-react";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { motion } from "framer-motion";
import trophy from "./assets/Trophy.png";
import { FaTimes } from "react-icons/fa";
import winningAnimation from "./assets/nehlePeDehlaAnimation.json";

const WinningModal = ({
  isOpen,
  onPlayAgain = () => {},
  winnerName,
  onClose = () => {},
  winLossAmount = 0,
}) => {
  if (!isOpen) return null;

  const trophyAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 8,
        duration: 0.5,
      },
    },
  };

  const renderWinLossMessage = () => {
    if (winnerName === "You") {
      return `Coins Earned ₹${winLossAmount}!`;
    } else if (winnerName === "Bot") {
      return `You lost ₹${Math.abs(winLossAmount)}.`;
    } else {
      return "No amount was won or lost.";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-black p-1 rounded-md bg-gray-200/60 transition-all z-50"
        aria-label="Close"
      >
        <FaTimes />
      </button>
      <div className="flex flex-col items-center justify-center p-8 w-[90%] max-w-md  rounded-lg">
        {winnerName === "You" && (
          <>
            <h2 className="text-[40px] font-bold font-outfit text-gray-800 mb-4 text-center">
              🎉 You Won
            </h2>
            <motion.img
              src={trophy}
              alt="Trophy"
              initial="hidden"
              animate="visible"
              variants={trophyAnimation}
              className="w-48 h-48 object-contain"
            />
          </>
        )}

        {winnerName === "Bot" && (
          <>
            <h2 className="text-[40px] font-outfit font-bold text-gray-800 mb-4 text-center">
              Bot Wins!
            </h2>
            <Lottie
              animationData={winningAnimation}
              loop
              autoplay
              className="w-48 h-48"
            />
          </>
        )}

        {winnerName === "It's a Tie!" && (
          <>
            <h2 className="text-[40px] font-outfit font-bold text-gray-800  text-center">
              It's a Tie!
            </h2>
            <Lottie
              animationData={winningAnimation}
              loop
              autoplay
              className="w-48 h-48"
            />
          </>
        )}

        {/* Win/Loss Amount Message */}
        <p className="text-[20px] font-semibold font-outfit text-gray-700 mt-4 text-center">
          {renderWinLossMessage()}
        </p>

        <button
          onClick={onPlayAgain}
          className="mt-6 px-6 py-2 bg-purple-600 font-outfit text-white text-lg font-semibold rounded-full hover:bg-purple-700 transition-all"
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
  onClose: PropTypes.func.isRequired,
  winLossAmount: PropTypes.number,
};

export default memo(WinningModal);
