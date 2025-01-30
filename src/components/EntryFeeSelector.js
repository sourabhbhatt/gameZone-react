import React, { memo, useState } from "react";
import { images } from "../assets/images";
import { formatINRLocale, showToastMessage } from "../utils";

const EntryFeeSelector = memo(
  ({ fees, defaultFee, onSelectFee, onPlayClick, balance = 0 }) => {
    const [selectedFee, setSelectedFee] = useState(defaultFee);

    const handleFeeSelect = (fee) => {
      setSelectedFee(fee.value);
      if (onSelectFee) onSelectFee(fee.value);
    };

    return (
      <div className="w-full max-w-lg mt-8 px-0">
        <h2 className="text-lg mb-6 text-center text-gray-100 font-outfit font-semibold">
          Select Entry Fee
        </h2>

        <div className="flex justify-around items-center">
          {fees.map((fee) => (
            <div
              key={fee.value}
              className={`relative flex flex-col items-center cursor-pointer mx-1 ${
                fee.value === selectedFee
                  ? "border-[1px] border-green-400 shadow-md"
                  : "border-[1px] border-gray-700 bg-[#ffffff10]"
              } text-white p-3 rounded-lg w-24 h-32 transition-all`}
              onClick={() => handleFeeSelect(fee)}
              style={{
                boxShadow:
                  fee.value === selectedFee
                    ? "0 0 20px rgba(20, 255, 0, 0.5), inset 0 0 17px rgba(30, 189, 59, 0.7)"
                    : "0 0 10px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Recommended Badge */}
              {fee.recommended && (
                <div className="absolute -top-3 px-2 py-0.5 text-[10px] bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full shadow-md font-outfit font-semibold">
                  Recommended
                </div>
              )}

              <div className="flex items-center space-x-1 mt-1">
                <img
                  src={images.coin}
                  alt="Coin"
                  className="w-4 h-4 object-contain -mr-1"
                />
                <span className="text-base font-bold font-outfit">{fee.value}</span>
              </div>

              {/* Divider */}
              <div
                className="w-[40px] h-[1px] bg-white my-1"
                style={{
                  clipPath: 'polygon(0 0, 40% 0, 100% 100%, 0 40%)',
                  opacity: 0.6,
                }}
              ></div>

              <p className="text-xs text-center text-gray-300 font-semibold font-outfit uppercase">
                {fee.description}
              </p>

              {fee.value !== 0 && (
                <div className="flex items-center space-x-1 mt-1">
                  <img
                    src={images.coin}
                    alt="Coin"
                    className="w-4 h-4 object-contain -mr-1"
                  />
                  <p className="text-base text-gray-200 text-center font-bold font-outfit">
                    {fee.winUpto}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full px-6">
          <button
            className="flex items-center justify-center w-full px-6 py-2.5 bg-gradient-to-b from-green-500 to-green-800 text-white 
            rounded-2xl mt-16 text-base font-bold shadow-md hover:from-green-600 hover:to-green-700 transition-all space-x-2"
            style={{
              background: "linear-gradient(to bottom, rgba(66, 159, 99, 0.7), rgba(66, 159, 99, 1))",
            }}
            onClick={() => {
              if (balance < selectedFee) {
                showToastMessage("error", "Insufficient balance");
                return;
              }
              onPlayClick(selectedFee);
            }}
          >
            <span className="font-outfit font-semibold">Play With</span>
            <img
              src={images.coin}
              alt="Coin"
              className="w-5 h-5 object-contain animate-spin-slow" // Added spin animation
            />
            <span className="text-xl font-extrabold font-outfit">
              {formatINRLocale(selectedFee)}
            </span>
          </button>
        </div>
      </div>
    );
  }
);

export default EntryFeeSelector;
