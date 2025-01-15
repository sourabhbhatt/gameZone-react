import React from "react";
import PropTypes from "prop-types";

const HistoryCard = ({ status, amount, betDetails }) => {
  const isWin = status === "Won" || status === "won";

  return (
    <div
      className={`p-4 rounded-[6px] shadow-md relative ${
        isWin
          ? "bg-gradient-to-r from-green-100 to-green-50"
          : "bg-gradient-to-r from-red-100 to-red-50"
      }`}
    >
      {/* Status Badge */}
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-[20px] text-sm font-outfit capitalize font-semibold border ${
            isWin
              ? "text-green-500 border-[#209C20] bg-green-50"
              : "text-red-500 border-[#9C2022] bg-red-50"
          }`}
          aria-label={isWin ? "Win status" : "Loss status"} // Accessibility improvement
        >
          {status}
        </span>
      </div>

      {/* Amount Section */}
      <div className="flex items-center mt-3">
        <span className="font-medium font-outfit text-[#040404] mr-1">
          {isWin ? "You have earned" : "You have lost"}
        </span>
        <img
          src={require("../../assets/coin.png")}
          alt="Coin"
          className="w-5 h-5 mr-2"
        />
        <span
          className={`${
            isWin ? "text-green-500" : "text-red-500"
          } font-bold font-outfit`}
        >
          {amount}
        </span>
      </div>
    </div>
  );
};

HistoryCard.propTypes = {
  status: PropTypes.string,
  amount: PropTypes.number.isRequired,
  betDetails: PropTypes.string.isRequired,
};

export default HistoryCard;
