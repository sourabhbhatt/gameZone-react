import React from "react";
import cross from "../assets/Cross.png";
import zero from "../assets/Zero.png";

const SwitchToggler = ({ options, selectedOption, onToggle }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <h2 className="text-lg font-semibold text-gray-300">Choose any one</h2>

      <div className="flex items-center justify-center space-x-4">
        {options.map((option) => (
          <div
            key={option}
            className={`relative flex items-center justify-center w-26 h-9 px-3 rounded-full cursor-pointer transition-all feeselector-border
              ${
                selectedOption === option
                  ? "feeselector-bg "
                  : "bg-gradient-to-b from-black via-[#0f1b0f] to-gray-800"
              }`}
            style={{
              boxShadow:
                selectedOption === option
                  ? "0 0 15px rgba(20, 255, 0, 0.3)"
                  : "0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => onToggle(option)}
          >
            {/* Circle with Black Dot */}
            <div
              className={`flex items-center justify-center w-4 h-4 rounded-full relative transition-all ${
                selectedOption === option
                  ? "bg-white animate-pulse"
                  : "bg-gray-200"
              }`}
            >
              {selectedOption === option ? (
                <div className="w-1 h-1 rounded-full bg-black"></div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              )}

              {/* White Shadow at the Top */}
              {selectedOption === option && (
                <div className="absolute top-[-4px] w-5 h-2 rounded-full bg-white opacity-50 blur-md"></div>
              )}
            </div>

            <img 
              src={option === "X" ? cross : zero} 
              alt={option}
              className={`ml-3 w-8 h-8 transition-all ${
                selectedOption === option 
                  ? "opacity-100" 
                  : "opacity-50"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwitchToggler;
