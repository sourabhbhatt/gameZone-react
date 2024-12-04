import React, { memo } from "react";
import { motion } from "framer-motion";

const Loader = memo(({ size = 50, color = "green", speed = 1 }) => {
  const dotStyle = {
    width: size * 0.2,
    height: size * 0.2,
    backgroundColor: color,
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50"
      aria-hidden="true"
    >
      <motion.div
        className="relative flex items-center space-x-2"
        style={{ width: size, height: size }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={dotStyle}
            animate={{
              y: [0, -size * 0.3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: speed,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
});

export default Loader;
