import React, { memo } from "react";
import { images } from "../assets/images";

function PlayAndEarnButton({ className = "" }) {
  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center">
      <button
        className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 
      text-white rounded-full text-sm font-semibold shadow-md border-2 border-[#ffffff50]"
      >
        <img
          src={images.coin}
          alt="Coin"
          className="w-5 h-5 object-contain animate-spin-slow"
        />
        <span className="ml-2 text-sm font-bold tracking-wide font-outfit">
          PLAY & EARN
        </span>
      </button>
=======
    <div className={`flex justify-center items-center ${className}`}>
      <img
        src={images.playAndEarn}
        alt="Play and Earn"
        className="w-[108px] h-[28px] object-contain sm:w-[120px] sm:h-[32px] md:w-[140px] md:h-[36px] lg:w-[160px] lg:h-[40px]"
      />
>>>>>>> release-v1-sourabh
    </div>
  );
}

export default memo(PlayAndEarnButton);
