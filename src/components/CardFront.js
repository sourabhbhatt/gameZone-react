import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

// Map suits to their names in the image paths
const suitMap = {
  "♣": "Clubs",
  "♦": "Diamonds",
  "♥": "Hearts",
  "♠": "Spades",
};

// Map deck values to asset values
const valueMap = {
  A: "Ace",
  K: "King",
  Q: "Queen",
  J: "Jack",
};

// Dynamically import images
const getCardImage = (suit, value) => {
  const suitName = suitMap[suit];
  const cardValue = valueMap?.[value]
    ? `Number=${valueMap[value]}`
    : `Number=${value}`; // Map special values or keep the number
  return require(`../assets/New deck/Suit=${suitName}, ${cardValue}.png`);
};

const CardFront = ({
  value,
  suit,
  animation = "none", // Animation type: 'flip', 'slide', etc.
}) => {
  const cardImage = getCardImage(suit, value);

  // Define animation variants
  const animationVariants = {
    none: {}, // No animation
    flip: {
      initial: { rotateY: 180 },
      animate: { rotateY: 0 },
      transition: { duration: 0.6 },
    },
    slide: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.6 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
  };

  const selectedAnimation = animationVariants[animation] || animationVariants.none;

  return (
    <motion.div
      initial={selectedAnimation.initial}
      animate={selectedAnimation.animate}
      transition={selectedAnimation.transition}
      className={`flex flex-col items-center justify-center rounded-lg shadow-md
                  w-26 h-36 sm:w-26 sm:h-24 md:w-26 md:h-32 lg:w-26 lg:h-40 object-cover
        `}
    >
      <img
        src={cardImage}
        alt={`${value} of ${suitMap[suit]}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </motion.div>
  );
};

export default React.memo(CardFront);
