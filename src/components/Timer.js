import React, { useEffect, useRef } from "react";
import tickingClock from "../audio/ticking-clock.mp3";
import useSoundEffects from "../hooks/useSoundEffects";

const Timer = ({ timeLeft, warningTimeStartsFrom , show}) => {
  const isWarning = timeLeft <= warningTimeStartsFrom;
  const wasWarning = useRef(false);
  const { initializeSound, playSound, stopSound } = useSoundEffects();

  useEffect(() => {
    initializeSound("tickingClock", tickingClock, { volume: 0.7 });
  }, [initializeSound]);

  useEffect(() => {
    if (isWarning && !wasWarning.current) {
      playSound("tickingClock");
    } else if (!isWarning && wasWarning.current) {
      stopSound("tickingClock");
    }
    wasWarning.current = isWarning;
  }, [isWarning, playSound, stopSound]);

  const formattedTime = `0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`;
  const timerStyles = isWarning
    ? "bg-red-100 text-red-500 border-red-500 font-bold transform scale-105"
    : "bg-green-100 text-gray-800 transform scale-100";

  return (
    <div className={`w-full flex flex-col items-center mt-3 ${show ? "" : "opacity-0"} scale-90 fixed right-0 bottom-12`}>
      <span className="text-xl font-bold mb-3 text-white">Your turn</span>
      <div
        className={`mt-2 px-4 py-0.5 rounded-full text-4xl font-regular shadow-md w-32 text-center border-2 transition-all duration-300 ease-in-out ${timerStyles}`}
      >
        {formattedTime}
      </div>
    </div>
  );
};

export default Timer;
