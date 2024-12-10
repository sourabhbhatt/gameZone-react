import React from "react";
import CardBackImage from "../assets/cardBack.png";

const CardBack = ({}) => {
  return (
    <div>
      <img src={CardBackImage} alt="Card Back" className="w-24 h-36" />
    </div>
  );
};

export default React.memo(CardBack);
