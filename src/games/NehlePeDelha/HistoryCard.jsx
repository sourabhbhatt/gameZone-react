import React from "react";
import PropTypes from "prop-types";

const HistoryCard = ({ status, amount, betDetails }) => {
  const isWin = status === "Won";

  return (
    <div
      className={`p-4 rounded-2xl shadow-md relative ${
        isWin
          ? "bg-gradient-to-r from-green-100 to-green-50"
          : "bg-gradient-to-r from-red-100 to-red-50"
      }`}
    >
      {/* Notches */}
      {/* <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full border border-gray-300"
      />
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white rounded-full border border-gray-300"
      /> */}

      {/* Status Badge */}
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isWin ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Amount Section */}
      <div className="flex items-center mt-3">
        <span className="font-semibold text-[#040404] mr-1">
          {isWin ? "You have earned" : "You have lost"}
        </span>
        <img
          src={require("../../assets/coin.png")} // Update path to match your project
          alt="Coin"
          className="w-5 h-5 mr-2"
        />
        <span className="text-green-500 font-bold">{amount}</span>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[0.5px] bg-[#040404] my-4" />

      {/* Bet Details */}
      <p className="mt-1 text-md text-gray-700">{betDetails}</p>
    </div>
  );
};

HistoryCard.propTypes = {
  status: PropTypes.oneOf(["Won", "Loss"]).isRequired,
  amount: PropTypes.number.isRequired,
  betDetails: PropTypes.string.isRequired,
};

export default HistoryCard;
