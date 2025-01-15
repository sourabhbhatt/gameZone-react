import React, { useState } from "react";

const RangeSlider = ({ min = 10, max = 2000, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value || min);

  // Calculate the percentage position of the handle
  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  // Handle the slider movement
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Slider Track */}
      <div className="relative w-full h-4 bg-[#1B2A40] rounded-full">
        <div
          className="absolute h-full bg-[#3CEDFF] rounded-full"
          style={{ width: `${getPercentage(sliderValue)}%` }}
        ></div>
      </div>

      {/* Slider Input */}
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleSliderChange}
        className="absolute top-0 w-full h-4 opacity-0 cursor-pointer"
      />

      {/* Handle */}
      <div
        className="absolute w-6 h-8 bg-[#3CEDFF] shadow-md"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)",
          left: `${getPercentage(sliderValue)}%`,
          transform: "translate(-50%, -50%)",
          top: "15%",
        }}
      ></div>

      {/* Min and Max Labels */}
      <div className="flex justify-between w-full mt-2">
        <span className="text-[#3CEDFF] text-sm font-bold">{min}</span>
        <span className="text-[#3CEDFF] text-sm font-bold">{max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
