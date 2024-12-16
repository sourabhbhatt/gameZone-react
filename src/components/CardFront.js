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
  const cardValue = valueMap[value]
    ? `Number=${valueMap[value]}`
    : `Number=${value}`; // Map special values or keep the number
  return require(`../assets/New deck/Suit=${suitName}, ${cardValue}.png`);
};

const CardFront = ({ value, suit, isPlayerCard }) => {
  const cardImage = getCardImage(suit, value);

  return (
    <div
      className={`w-26 h-36 flex flex-col items-center justify-center rounded-lg shadow-md`}
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
