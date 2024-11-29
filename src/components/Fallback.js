import React, { memo } from "react";
import { motion } from "framer-motion";

const Fallback = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#001e1c] text-white">
      {/* Loading Animation */}
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-t-green-500 border-b-green-500 animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-6 text-lg font-semibold"
      >
        Loading the game...
      </motion.p>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-sm text-gray-400 mt-2"
      >
        Please wait while we prepare your game experience.
      </motion.p>

      {/* Background Animation */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      ></motion.div>
    </div>
  );
});

export default Fallback;
