import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#001e1c] text-white">
      {/* Animated 404 Header */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-green-400"
      >
        404
      </motion.h1>

      {/* Subtitle with Fade In Animation */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-2xl font-bold mt-4"
      >
        Oops! Page Not Found
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-sm text-gray-400 mt-2 text-center px-4"
      >
        The page you're looking for might have been removed, renamed, or is
        temporarily unavailable.
      </motion.p>

      {/* Go Home Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          type: "spring",
          stiffness: 200,
        }}
        onClick={handleGoHome}
        className="mt-10 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg rounded-full font-semibold hover:scale-105 transition-transform"
      >
        Back to Home
      </motion.button>

      {/* Animated Background Elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-20 w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-30"
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 opacity-30"
      ></motion.div>
    </div>
  );
};

export default NotFound;
