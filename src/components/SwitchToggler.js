import React from "react";

const SwitchToggler = ({ options, selectedOption, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      {options.map((option) => (
        <div
          key={option}
          className={`relative flex items-center justify-center w-20 h-12 rounded-full transition-all cursor-pointer
            ${
              selectedOption === option
                ? "bg-gradient-to-r from-green-500 via-green-400 to-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                : "bg-gray-800 shadow-md"
            }`}
          onClick={() => onToggle(option)}
        >
          {/* Highlight Glow for Selected Option */}
          {selectedOption === option && (
            <div className="absolute w-12 h-12 rounded-full bg-green-500 opacity-50 blur-xl"></div>
          )}
          {/* Inner Icon */}
          <span
            className={`text-2xl font-bold transition-all ${
              selectedOption === option ? "text-white" : "text-gray-400"
            }`}
          >
            {option}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SwitchToggler;
