import React from "react";

const CardFront = ({ value, suit, isPlayerCard }) => {
  return (
    <div
      className={`w-24 h-36 flex flex-col items-center justify-center rounded-lg shadow-md bg-white ${
        isPlayerCard ? "border-4 border-green-400" : "border-4 border-red-400"
      }`}
    >
      <span
        className={`text-2xl font-bold ${
          suit === "♥" || suit === "♦" ? "text-red-500" : "text-black"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-xl ${
          suit === "♥" || suit === "♦" ? "text-red-500" : "text-black"
        }`}
      >
        {suit}
      </span>
    </div>
  );
};

export default React.memo(CardFront);
