import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import winAnimation from "./assets/tictactoeSuccessAnimation.json";

const WinnerModal = ({ isPlayerWinner }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative flex flex-col items-center justify-center w-full h-full text-white"
      >
        {/* Title */}
        <motion.h1
          className="text-3xl font-extrabold mb-10 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {isPlayerWinner ? "You won🏆 🎉" : "Better Luck Next Time 🤖"}
        </motion.h1>

        <Lottie
          animationData={isPlayerWinner ? winAnimation : null} // Different animations for win/lose
          style={{ width: 200, height: 200 }}
          loop={true}
        />
      </motion.div>
    </div>
  );
};

export default React.memo(WinnerModal);
