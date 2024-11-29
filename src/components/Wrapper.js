import React, { memo } from "react";
import { motion } from "framer-motion";

const Wrapper = memo(({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#001e1c] text-white">
      {/* Background Animation Elements */}
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

      {/* Content Area */}
      <div className="relative flex flex-col flex-grow z-10">{children}</div>
    </div>
  );
});

export default Wrapper;
