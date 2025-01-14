import React from "react";

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

const CardFront = ({ value, suit, isPlayerCard }) => {
  const cardImage = getCardImage(suit, value);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg shadow-md
                  w-26 h-36 sm:w-26 sm:h-24 md:w-26 md:h-32 lg:w-26 lg:h-40 object-cover
        `}
      // style={{
      //   // width: isPlayerCard ? "clamp(80px, 15vw, 120px)" : "clamp(60px, 12vw, 100px)",
      //   // height: isPlayerCard ? "clamp(100px, 20vw, 160px)" : "clamp(80px, 18vw, 140px)",
      //   width: "clamp(60px, 12vw, 100px)",
      //   height: "clamp(80px, 18vw, 140px)",
      // }}
    >
      <img
        src={cardImage}
        alt={`${value} of ${suitMap[suit]}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default React.memo(CardFront);
