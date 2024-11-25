import React, { memo } from "react";
import { FaBitcoin } from "react-icons/fa";

function PlayAndEarnButton() {
  return (
    <div className="flex justify-center items-center">
      <button
        className="flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 
      text-white rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full">
          <FaBitcoin className="text-white text-sm" />
        </div>
        <span className="ml-2 text-sm font-bold tracking-wide">
          PLAY & EARN
        </span>
      </button>
    </div>
  );
}

export default memo(PlayAndEarnButton);
