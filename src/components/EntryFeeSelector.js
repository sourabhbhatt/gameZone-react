import React, { memo, useState } from "react";
import { images } from "../assets/images";

const EntryFeeSelector = memo(
  ({ fees, defaultFee, onSelectFee, onPlayClick }) => {
    const [selectedFee, setSelectedFee] = useState(defaultFee);

    const handleFeeSelect = (fee) => {
      setSelectedFee(fee.value);
      if (onSelectFee) onSelectFee(fee.value);
    };

    return (
      <div className="w-full max-w-lg mt-8 px-4">
        <h2 className="text-lg font-semibold mb-6 text-center text-gray-100">
          Select Entry Fee
        </h2>

        <div className="flex justify-around items-center">
          {fees.map((fee) => (
            <div
              key={fee.value}
              className={`relative flex flex-col items-center cursor-pointer bg-black-400 ${
                fee.value === selectedFee
                  ? "border-[2px] border-gradient-to-r from-green-400 via-green-800 to-green-500 shadow-[0_0_12px_rgba(34,197,94,0.9)]"
                  : "border-[1px] border-gray-700"
              } text-white p-4 rounded-lg shadow-md w-28 h-36 transition-all`}
              onClick={() => handleFeeSelect(fee)}
            >
              {/* Recommended Badge */}
              {fee.recommended && (
                <div className="absolute -top-3 px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div className="flex items-center space-x-2">
                <img
                  src={images.coin}
                  alt="Coin"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-lg font-bold">{fee.value}</span>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-green-200 via-green-600 to-green-200 my-2"></div>

              <p className="text-sm text-gray-300 font-semibold">
                {fee.description}
              </p>

              {fee.value !== 0 && (
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src={images.coin}
                    alt="Coin"
                    className="w-5 h-5 object-contain"
                  />
                  <p className="text-lg text-gray-200 font-bold">
                    {fee.winUpto}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full px-6 mt-6">
          <button
            className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white 
      rounded-full text-lg font-bold shadow-md hover:from-green-600 hover:to-green-700 transition-all space-x-2"
            onClick={() => onPlayClick(selectedFee)}
          >
            <span>Play With</span>
            <img
              src={images.coin}
              alt="Coin"
              className="w-5 h-5 object-contain animate-spin-slow" // Added spin animation
            />
            <span className="text-xl font-extrabold">{selectedFee}</span>
          </button>
        </div>
      </div>
    );
  }
);

export default EntryFeeSelector;
