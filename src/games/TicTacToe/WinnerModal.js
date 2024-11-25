import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const WinnerModal = ({ isPlayerWinner, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative flex flex-col items-center justify-center w-[80%] h-[70%] rounded-xl bg-[#000000b3] border-2 border-gradient-to-br from-green-200 via-green-400 to-green-200 shadow-lg text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-white">
          {isPlayerWinner ? "You Won 🏆" : "Bot Wins 🤖"}
        </h1>

        {/* Animated Trophy */}
        <motion.div
          className="w-28 h-28 rounded-full flex justify-center items-center bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{
            type: "spring",
            duration: 0.8,
            bounce: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.span
            className="text-6xl font-extrabold text-white"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🏆
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <p className="mt-6 w-[80%] text-center text-lg font-semibold text-gray-300">
          {isPlayerWinner
            ? "Congratulations! You played like a pro!"
            : "Better luck next time!"}
        </p>

        {/* Play Again Button */}
        <button
          onClick={onClose}
          className="absolute bottom-8 px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition"
        >
          Play Again
        </button>
      </motion.div>
    </div>
  );
};

export default React.memo(WinnerModal);
