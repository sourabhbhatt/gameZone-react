import React from "react";

const Timer = ({ timeLeft, warningTimeStartsFrom }) => {
  const isWarning = timeLeft <= warningTimeStartsFrom;

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <span className="text-lg font-semibold">Your Turn</span>
      <div
        className={`mt-2 px-6 py-2 rounded-full text-lg font-bold shadow-md w-32 text-center ${
          isWarning
            ? "bg-red-100 text-red-500 border-red-500"
            : "bg-green-100 text-green-600 border-green-400"
        } border-2 transition-all duration-300 ease-in-out`}
      >
        {`0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
      </div>
    </div>
  );
};

export default React.memo(Timer);
