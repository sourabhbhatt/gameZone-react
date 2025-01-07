import React from "react";
import bgBottomCard from "./assets/cardBottomBg.png";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";

const BottomSection = ({
  walletAmount,
  playingBetAmount,
  currentBetAmount,
  setCurrentBetAmount,
  revealCards,
  winner,
  disabled,
  onViewHistory = () => { },
}) => {

  const playingAmount = playingBetAmount < walletAmount ? playingBetAmount : walletAmount

  return (
    <div
      className={`relative w-full max-w-lg mt-6 p-4 sm:p-6 bg-[#210F40] 
        bg-cover bg-center bg-no-repeat rounded-t-3xl ${disabled ? "opacity-50 pointer-events-none" : ""
        }`}
      style={{
        backgroundImage: `url(${bgBottomCard})`,
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-medium capitalize">
          {winner || "Place your bet!"}
        </span>
        <span
          className="underline text-white font-medium cursor-pointer"
          onClick={onViewHistory}
        >
          {`View bet history`}
        </span>
      </div>
      <p className="text-lg sm:text-xl font-bold text-white mb-4">
        {`Select amount to play`}
      </p>
      <div className="flex flex-wrap gap-3">
        {NehlePeDelhaConfig.entryFees.map((fee, index) => {
          if (playingAmount >= fee?.value) {
            return (
              <button
                key={index}
                onClick={() => !disabled && setCurrentBetAmount(fee.value)}
                className={`flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-full shadow-md ${fee.value === currentBetAmount
                  ? "border-2 border-green-500"
                  : "border border-gray-300"
                  }`}
              >
                <img
                  src={require("../../assets/coin.png")}
                  alt="Coin"
                  className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
                />
                <span className="text-black text-sm sm:text-base font-medium">
                  {fee.value}
                </span>
              </button>
            )
          }
        })}
      </div>
      <button
        onClick={!disabled ? revealCards : undefined}
        className={`w-full sm:w-[80%] mt-6 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-3xl shadow-md transition-all ${disabled
          ? "bg-[#E0E0E0] text-[#040402] cursor-not-allowed"
          : "bg-[#EEEEEE] text-[#040404] hover:scale-105"
          } flex items-center justify-center mx-auto`}
      >
        Reveal Cards
      </button>
    </div>
  );
};

export default BottomSection;
