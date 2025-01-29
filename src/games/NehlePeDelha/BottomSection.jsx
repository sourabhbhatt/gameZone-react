import React from "react";
import BetDetailsSection from "./assets/BetDetailsSection.png";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import coinImage from "../../assets/coin.png"; // Use direct imports when possible
import { formatINRLocale } from "../../utils";

const BottomSection = ({
  walletAmount = 0,
  playingBetAmount = 0,
  currentBetAmount = 0,
  setCurrentBetAmount = () => {},
  revealCards = () => {},
  winner = "",
  disabled = false,
  onViewHistory = () => {},
}) => {
  const playingAmount =
    playingBetAmount < walletAmount ? playingBetAmount : walletAmount;

  // Helper function for button classes
  const getButtonClasses = (feeValue) =>
    `flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-full border-[1px] h-[34px] ${
      feeValue === currentBetAmount ? " bg-white" : " border-white"
    }`;

  return (
    <div
      className={`relative w-full max-w-lg mt-2 p-4 sm:p-6 bg-transparent 
        bg-cover bg-center bg-no-repeat rounded-t-3xl ${
          disabled ? "opacity-60 pointer-events-none [filter:brightness(0.4)]" : ""
        }`}
      style={{ backgroundImage: `url(${BetDetailsSection})` }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3 mt-3">
        <span
          className="text-white text-[12px] tracking-[2px] font-medium font-outfit"
          style={{ textTransform: "capitalize" }}
        >
          {"BET DETAILS"}
        </span>
        <span
          className="underline text-white text-[14px] font-outfit font-medium cursor-pointer"
          onClick={onViewHistory}
        >
          View bet history
        </span>
      </div>

      {/* Title Section */}
      <p className="text-[16px] font-outfit sm:text-xl font-bold text-white mb-4">
        Select amount to play
      </p>

      {/* Entry Fee Buttons */}
      <div className="flex flex-wrap gap-3">
        {NehlePeDelhaConfig.entryFees.map((fee, index) =>
          playingAmount >= fee?.value ? (
            <button
              key={index}
              onClick={() => !disabled && setCurrentBetAmount(fee.value)}
              className={getButtonClasses(fee.value)}
            >
              <img
                src={coinImage}
                alt="Coin"
                className="w-[17px] sm:w-5 h-[17px] sm:h-5 mr-2"
              />
              <span
                className={`${
                  fee?.value === currentBetAmount ? "text-black" : "text-white"
                } 
               text-[18px] font-outfit font-semibold`}
              >
                {formatINRLocale(fee?.value)}
              </span>
            </button>
          ) : null
        )}
      </div>

      {/* Separator Line */}
      <hr className="my-4 border-t border-white/30" />

      {/* Available Coins Section */}
      <div className="flex items-center mt-4">
        <p
          className="text-[12px] font-outfit sm:text-xl font-semibold text-white"
          style={{ letterSpacing: "1px", textTransform: "capitalize" }}
        >
          {`AVAILABLE COINS TO PLAY`}
        </p>
        <img
          src={coinImage}
          alt="Coin"
          className="w-[20px] sm:w-5 h-[20px] sm:h-5 mx-1"
        />
        <p className="text-[15px] font-outfit sm:text-xl font-semibold text-white">
          {formatINRLocale(playingBetAmount)}
        </p>
      </div>

      {/* Reveal Cards Button */}
      <button
        onClick={!disabled ? revealCards : undefined}
        className={`w-full h-[48px] sm:w-[80%] mt-3 px-4 py-3 rounded-[12px] transition-all ${
          disabled
            ? "bg-[#E0E0E0] text-[#040402] cursor-not-allowed"
            : "bg-[#EEEEEE] text-[#4A2574] hover:scale-105"
        } flex items-center justify-center mx-auto font-outfit font-semibold text-[16px]`}
      >
        Reveal card
      </button>
    </div>
  );
};

export default BottomSection;
