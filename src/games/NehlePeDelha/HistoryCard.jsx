import React from "react";
import PropTypes from "prop-types";
import winIcon from "./assets/won.png";
import lossIcon from "./assets/lose.png";
import { formatINRLocale } from "../../utils";

const HistoryCard = ({ status, amount, isLastCard = false }) => {
  const isWin = status === "Won" || status === "won";

  return (
    <div className="flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        {/* Left: Icon and Text */}
        <div className="flex items-center space-x-3">
          <img
            src={isWin ? winIcon : lossIcon}
            alt={isWin ? "Win Icon" : "Loss Icon"}
            className="w-[40px] h-[40px]"
          />
          <span className="text-[14px] font-outfit font-semibold capitalize">
            {isWin ? "Win" : "Loss"}
          </span>
        </div>

        {/* Right: Coin Icon and Amount */}
        <div className="flex items-center space-x-1 space-y-1">
          <img
            src={require("../../assets/coin.png")}
            alt="Coin"
            className="w-[20px] h-[20px]"
          />
          <span
            className={`${"text-white"} text-[14px] font-outfit font-semibold`}
          >
            {isWin
              ? `+${formatINRLocale(amount)}`
              : `-${formatINRLocale(amount)}`}
          </span>
        </div>
      </div>

      {/* Bottom Separator */}
      {!isLastCard && <div className="w-full h-[1px] bg-gray-200/20 mt-4" />}
    </div>
  );
};

HistoryCard.propTypes = {
  status: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default HistoryCard;
