import React from "react";
import { FaRobot } from "react-icons/fa";
import { images } from "../../assets/images"; // Ensure the images path is correct

const PlayerInfo = ({
  name,
  avatar,
  isCoinImage = false,
  coinAmount = null,
  amountPlacement = "bottom", // 'top', 'bottom', 'left', 'right'
  isActive,
  isBot = false,
  size = "small", // 'small', 'medium', 'large'
}) => {
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

  const amountBlock =
    !!coinAmount && coinAmount > 0 && (
      <div className="flex items-center space-x-1">
        {isCoinImage && (
          <img
            src={images.coin}
            alt="Coin"
            className="w-5 h-5 object-contain animate-spin-slow"
          />
        )}
        <span className={`font-medium text-white ${selectedSize.amount}`}>
          {coinAmount}
        </span>
      </div>
    );

  return (
    <div
      className={`flex ${
        amountPlacement === "left" || amountPlacement === "right"
          ? "flex-row items-center space-x-3"
          : "flex-col items-center space-y-3"
      }`}
    >
      {/* Amount Block - Top */}
      {amountPlacement === "top" && amountBlock}

      {/* Avatar and Name */}
      <div className="flex flex-col items-center">
        <div
          className={`${selectedSize.container} rounded-full border-2 flex justify-center items-center ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          {isBot ? (
            <FaRobot
              className={`${
                isActive ? "text-green-500" : "text-green-200"
              } ${selectedSize.icon}`}
            />
          ) : (
            <img
              src={avatar}
              alt={name}
              className={`${selectedSize.icon} rounded-full`}
            />
          )}
        </div>

        {/* Player Name */}
        <div
          className={`px-3 ${selectedSize.name} rounded-full bg-gradient-to-r from-black via-gray-800 to-black border-2 ${
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

      {/* Amount Block - Bottom */}
      {amountPlacement === "bottom" && amountBlock}

      {/* Amount Block - Left */}
      {amountPlacement === "left" && amountBlock}

      {/* Amount Block - Right */}
      {amountPlacement === "right" && amountBlock}
    </div>
  );
};

export default React.memo(PlayerInfo);
