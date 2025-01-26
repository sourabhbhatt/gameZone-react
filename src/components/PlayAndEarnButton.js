import React, { memo } from "react";
import { images } from "../assets/images";

function PlayAndEarnButton({ className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img
        src={images.playAndEarn}
        alt="Play and Earn"
        className="w-[108px] h-[28px] object-contain sm:w-[120px] sm:h-[32px] md:w-[140px] md:h-[36px] lg:w-[160px] lg:h-[40px]"
      />
    </div>
  );
}

export default memo(PlayAndEarnButton);
