import React from "react";
import CardBackImage from "../assets/cardBack.png";

const CardBack = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={CardBackImage}
        alt="Card Back"
        className="w-[76.8px] h-[120px] max-w-[20vw] max-h-[30vh] object-cover"
      />
    </div>
  );
};

export default React.memo(CardBack);
