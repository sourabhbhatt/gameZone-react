import React from "react";
import { FaRobot } from "react-icons/fa";

const PlayerInfo = ({ name, avatar, isActive, choice, isBot = false }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex flex-col items-center space-x-1">
        <div
          className={`w-16 h-16 rounded-full border-2 flex justify-center items-center ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          {isBot ? (
            <FaRobot
              className={`${
                isActive ? "text-green-500" : "text-green-200"
              } text-3xl`}
            />
          ) : (
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
          )}
        </div>

        <div
          className={`px-3 mt-[-10px] rounded-full bg-gradient-to-r from-black via-gray-800 to-black border-2 ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          <span
            className={`text-xs  font-semibold ${
              isActive ? "text-green-400" : "text-gray-400"
            }`}
          >
            {name}
          </span>
        </div>
      </div>

      {!!choice && (
        <div
          className={`w-14 h-14 bg-[#001e1c] rounded-lg border-2 flex justify-center items-center ${
            isActive ? "border-green-500" : "border-gray-600"
          }`}
        >
          <span
            className={`text-2xl font-bold ${
              isActive ? "text-green-500" : "text-gray-600"
            }`}
          >
            {choice}
          </span>
        </div>
      )}
    </div>
  );
};

export default React.memo(PlayerInfo);
