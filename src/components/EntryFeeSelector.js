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
                  ? "border-[1px] border-[rgba(143,230,137,1)]"
                  : ""
              } text-white p-3 rounded-lg w-24 h-32 transition-all`}
              onClick={() => handleFeeSelect(fee)}
              style={{
                ...(fee.value !== selectedFee && {
                  background: "#ffffff10",
                  position: "relative",
                  zIndex: 1
                }),
                boxShadow:
                  fee.value === selectedFee
                    ? "inset 0 0 12px rgba(143, 230, 137, 0.8)"
                    : "",
              }}
            >
              {fee.value !== selectedFee && (
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    borderImageSource: "radial-gradient(100% 100% at 49.84% 0%, #FFFFFF 0%, rgba(205, 205, 205, 0) 49.01%, rgba(153, 153, 153, 0.23) 100%)",
                    borderImageSlice: "1",
                    borderImageRepeat: "stretch",
                    WebkitMask: 
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: 0
                  }}
                />
              )}
              <div className="relative z-10">
                {/* Recommended Badge */}
                {fee.recommended && (
                  <div 
                    className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-2 py-0.5 text-[10px] text-white rounded-full shadow-md font-outfit font-semibold"
                    style={{
                      background: "linear-gradient(90deg, rgb(23 143 45) 0%, rgb(7, 91, 51) 100%)",
                      boxShadow: "rgb(208 255 204 / 80%) 1px 5px 7px inset"
                    }}
                  >
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
            </div>
          ))}
        </div>

        <div className="relative mt-[80px]">
          <div className="absolute h-[1px] bg-white opacity-70 -top-8" style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}></div>
          <button
            onClick={onPlayClick}
            className="relative w-full py-3 px-6 rounded-xl font-outfit font-semibold text-white z-10"
            style={{
              background: "linear-gradient(180deg, #65F2B7 0%, #1D6D36 100%)",
              boxShadow: "rgb(215 255 212 / 45%) -2px 4px 20px inset"
            }}
          >
           <div className="flex items-center justify-center space-x-2">
           <span className="font-outfit font-semibold">Play With</span>
            <img
              src={images.coin}
              alt="Coin"
              className="w-5 h-5 object-contain animate-spin-slow" // Added spin animation
            />
            <span className="text-xl font-extrabold font-outfit">
              {formatINRLocale(selectedFee)}
            </span>
           </div>
          </button>
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              border: "1px solid transparent",
              borderRadius: "8px",
              borderImageSource: "radial-gradient(100% 100% at 49.84% 0%, #FFFFFF 0%, rgba(205, 205, 205, 0) 49.01%, rgba(153, 153, 153, 0.23) 100%)",
              borderImageSlice: "1",
              borderImageRepeat: "stretch",
              WebkitMask: 
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 0
            }}
          />
        </div>
      </div>
    );
  }
);

export default EntryFeeSelector;
