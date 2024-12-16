import React from "react";
import bgBottomCard from "./assets/cardBottomBg.png";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";

const BottomSection = ({
  currentBetAmount,
  setCurrentBetAmount,
  revealCards,
  winner,
  disabled,
  onViewHistory = () => {},
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgBottomCard})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className={`relative w-full max-w-xl mt-6 p-6 bg-[#210F40] rounded-t-3xl ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-medium capitalize">
          {winner || "Place your bet!"}
        </span>
        <span
          className="underline text-white font-medium cursor-pointer"
          onClick={onViewHistory}
        >
          View bet history
        </span>
      </div>
      <p className="text-lg font-bold text-white mb-4">Select amount to play</p>
      <div className="flex flex-wrap gap-3">
        {NehlePeDelhaConfig.entryFees.map((fee, index) => (
          <button
            key={index}
            onClick={() => !disabled && setCurrentBetAmount(fee.value)}
            className={`flex items-center justify-center px-4 py-2 bg-white rounded-full shadow-md ${
              fee.value === currentBetAmount
                ? "border-2 border-green-500"
                : "border border-gray-300"
            }`}
          >
            <img
              src={require("../../assets/coin.png")}
              alt="Coin"
              className="w-5 h-5 mr-2"
            />
            <span className="text-black font-medium">{fee.value}</span>
          </button>
        ))}
      </div>
      <button
        onClick={!disabled ? revealCards : undefined}
        className={`w-[80%] mt-6 mx-auto px-6 py-3 rounded-3xl shadow-md transition-all ${
          disabled
            ? "bg-[#E0E0E0] text-[#040402]  cursor-not-allowed"
            : "bg-[#EEEEEE] text-[#040404]  hover:scale-105"
        } flex items-center justify-center`}
      >
        Reveal Cards
      </button>
    </div>
  );
};

export default BottomSection;
