// src/components/CardGames/GameBoard.js
import React from "react";

const InfoCard = ({ title = "", value = "" }) => {
  return (
    <div>
      <span className="font-semibold">{`${title}:`}</span> ₹{value}
    </div>
  );
};

const GameBoard = ({
  children,
  walletMoney,
  bootAmount,
  maxChaal,
  maxBlind,
  maxPot,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4 space-y-4">
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg border border-yellow-500 bg-green-900">
        {children}
      </div>

      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-90 rounded-lg p-4 text-yellow-400 text-sm flex justify-between">
        <InfoCard title={"Wallet Money"} value={walletMoney} />
        <InfoCard title={"Boot Amount"} value={bootAmount} />
        <InfoCard title={"Max Chaal"} value={maxChaal} />
        <InfoCard title={"Max Blind"} value={maxBlind} />
        <InfoCard title={"Max Pot"} value={maxPot} />
      </div>
    </div>
  );
};

export default GameBoard;
