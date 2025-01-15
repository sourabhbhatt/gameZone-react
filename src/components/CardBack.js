import React from "react";
import CardBackImage from "../assets/cardBack.png";

const CardBack = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={CardBackImage}
        alt="Card Back"
        className="w-26 h-36 sm:w-20 sm:h-28 md:w-24 md:h-36 lg:w-28 lg:h-40 object-cover"
      />
    </div>
  );
};

export default React.memo(CardBack);
