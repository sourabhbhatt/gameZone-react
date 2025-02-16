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
            className={`relative flex items-center justify-center w-26 h-9 px-3 rounded-full cursor-pointer transition-all ${
              selectedOption === option
                ? "border-[1px] border-[rgba(143,230,137,0)] feeselector-bg"
                : "border-[1px] border-[rgba(143,230,137,0)] feeselector-bg"
            }`}
            style={{
              ...(selectedOption !== option && {
                background: "#ffffff10",
                position: "relative",
                zIndex: 1
              }),
              boxShadow:
                selectedOption === option
                  ? "rgb(215 255 212 / 45%) -2px 4px 20px inset"
                  : "0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => onToggle(option)}
          >
            {selectedOption !== option && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid transparent",
                  borderRadius: "9999px",
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
            <div className="relative z-10 flex items-center">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwitchToggler;
