import Lottie from "lottie-react";
import PropTypes from "prop-types";
import React, { memo, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import trophy from "./assets/Trophy.png";
import winningAnimation from "./assets/nehlePeDehlaAnimation.json";

const trophyAnimation = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 8,
    },
  },
};

const WinningModal = ({
  isOpen,
  onPlayAgain = () => {},
  winnerName,
  onClose = () => {},
  winLossAmount = 0,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const renderWinLossMessage = useMemo(() => {
    if (winnerName === "You") {
      return `Coins Earned ₹${winLossAmount}!`;
    } else if (winnerName === "Bot") {
      return `You lost ₹${Math.abs(winLossAmount)}.`;
    }
    return "No amount was won or lost.";
  }, [winnerName, winLossAmount]);

  if (!isOpen) return null;

  const renderContent = () => {
    if (winnerName === "You") {
      return (
        <>
          <h2 className="text-[40px] font-bold font-outfit text-white text-center">
            🎉 You Won
          </h2>
          <p className="text-[20px] font-semibold font-outfit text-white text-center">
            {renderWinLossMessage}
          </p>
          <motion.img
            src={trophy}
            alt="Trophy"
            initial="hidden"
            animate="visible"
            variants={trophyAnimation}
            className="w-[166px] h-[156px] object-contain"
          />
        </>
      );
    }
    return (
      <>
        <h2 className="text-[40px] font-bold font-outfit text-white  text-center">
          {winnerName === "Bot" ? "Bot Wins!" : "It's a Tie!"}
        </h2>
        <p className="text-[20px] font-semibold font-outfit text-white text-center">
          {renderWinLossMessage}
        </p>
        <Lottie
          animationData={winningAnimation}
          loop
          autoplay
          className="w-[166px] h-[156px]"
        />
      </>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex flex-col items-center justify-center p-8 w-[90%] max-w-md rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

WinningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onPlayAgain: PropTypes.func,
  winnerName: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  winLossAmount: PropTypes.number,
};

export default memo(WinningModal);
