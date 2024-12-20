import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { images } from "../../assets/images";

const PlayerInfo = ({
  name,
  avatar,
  isCoinImage = false,
  coinAmount = null,
  amountPlacement = "bottom", // 'top', 'bottom', 'left', 'right'
  isActive,
  isBot = false,
  size = "small", // 'small', 'medium', 'large'
  isWinner = false,
  isLooser = false,
}) => {
  const [displayCoins, setDisplayCoins] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState(coinAmount);

  useEffect(() => {
    if (isWinner || isLooser) {
      setDisplayCoins(true);
      const timeout = setTimeout(() => setDisplayCoins(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isWinner, isLooser]);

  useEffect(() => {
    if (isWinner) {
      setTimeout(() => setAnimatedCoins(coinAmount * 2), 2000);
    }
    if (isLooser) {
      setTimeout(() => setAnimatedCoins(0), 2000);
    }
  }, [isWinner, isLooser]);

  const sizes = {
    small: {
      container: "w-10 h-10",
      icon: "w-8 h-8 text-xl",
      amount: "text-sm",
      name: "text-xs mt-[-6px] px-1.5",
    },
    medium: {
      container: "w-16 h-16",
      icon: "w-12 h-12 text-3xl",
      amount: "text-lg",
      name: "text-sm mt-[-8px]",
    },
    large: {
      container: "w-20 h-20",
      icon: "w-16 h-16 text-4xl",
      amount: "text-xl",
      name: "text-base mt-[-10px]",
    },
  };

  const selectedSize = sizes[size];

  const coinAnimationVariants = {
    winning: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.5 },
    },
    vanishing: {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 0, scale: 0 },
      exit: { opacity: 0 },
    },
  };

  const renderCoins = (animationType) => {
    if (animationType === "winning") {
      return Array.from({ length: 10 }).map((_, index) => (
        <motion.img
          key={index}
          src={images.coin}
          alt="Coin"
          className="w-5 h-5 object-contain absolute"
          initial={{ x: Math.random() * 100 - 50, y: -10, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      ));
    }

    return Array.from({ length: 10 }).map((_, index) => (
      <motion.img
        key={index}
        src={images.coin}
        alt="Coin"
        className="w-5 h-5 object-contain absolute"
        variants={coinAnimationVariants.vanishing}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1, delay: index * 0.1 }}
      />
    ));
  };

  const amountBlock = (
    <div className="flex flex-row items-center space-x-2 relative">
      {displayCoins && (
        <div className="absolute inset-0 flex justify-center items-center">
          <AnimatePresence>
            {isWinner && renderCoins("winning")}
            {isLooser && renderCoins("vanishing")}
          </AnimatePresence>
        </div>
      )}
      {isCoinImage && (
        <img
          src={images.coin}
          alt="Coin"
          className="w-5 h-5 object-contain animate-spin-slow relative z-10"
        />
      )}
      <motion.span
        className={`font-medium text-white ${selectedSize.amount}`}
        initial={{ scale: 1 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 0.5 }}
      >
        {animatedCoins}
      </motion.span>
    </div>
  );

  return (
    <div
      className={`flex ${
        amountPlacement === "left" || amountPlacement === "right"
          ? "flex-row items-center space-x-2"
          : "flex-col items-center space-y-3"
      }`}
    >
      {amountPlacement === "top" && amountBlock}
      {amountPlacement === "left" && amountBlock}
      <div className="flex flex-col items-center">
        <div
          className={`${
            selectedSize.container
          } rounded-full border-2 flex justify-center items-center ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          {isBot ? (
            <FaRobot
              className={`${isActive ? "text-green-500" : "text-green-200"} ${
                selectedSize.icon
              }`}
            />
          ) : (
            <img
              src={avatar}
              alt={name}
              className={`${selectedSize.icon} rounded-full`}
            />
          )}
        </div>
        <div
          className={`px-3 ${
            selectedSize.name
          } rounded-full bg-gradient-to-r from-black via-gray-800 to-black border-2 ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          <span
            className={`font-semibold ${
              isActive ? "text-green-400" : "text-gray-400"
            }`}
          >
            {name}
          </span>
        </div>
      </div>
      {amountPlacement === "right" && amountBlock}
      {amountPlacement === "bottom" && amountBlock}
    </div>
  );
};

export default React.memo(PlayerInfo);
