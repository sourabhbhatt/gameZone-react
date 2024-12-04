import React, { useEffect, useRef } from "react";
import tickingClock from "../audio/ticking-clock.mp3";
import useSoundEffects from "../hooks/useSoundEffects";

const Timer = ({ timeLeft, warningTimeStartsFrom }) => {
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
    ? "bg-red-100 text-red-500 border-red-500"
    : "bg-green-100 text-green-600 border-green-400";

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <span className="text-lg font-semibold">Your Turn</span>
      <div
        className={`mt-2 px-6 py-2 rounded-full text-lg font-bold shadow-md w-32 text-center border-2 transition-all duration-300 ease-in-out ${timerStyles}`}
      >
        {formattedTime}
      </div>
    </div>
  );
};

export default React.memo(Timer);
