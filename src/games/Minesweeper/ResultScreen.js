import React from "react";
import Lottie from "lottie-react";
import { images } from "../../assets/images";
import FailureBg from "./assets/Failure.png";
import SuccessBg from "./assets/Minesweeper.png";
import failureEmoji from "./assets/failureEmoji.png";
import GameHeader from "../../components/GameHeader";
import SuccessTrophy from "./assets/SuccessTrophy.png";
import confettiAnimation from "./assets/confetti.json";

const resultConfig = {
  won: {
    backgroundImage: SuccessBg,
    resultIcon: SuccessTrophy,
    resultTitle: "Field cleared",
    resultMessage:
      "Congratulations! You defused every threat and emerged victorious. The minefield bows to your brilliance!",
    coinText: "Coins Earned",
    actionButtonText: "Replay",
  },
  lost: {
    backgroundImage: FailureBg,
    resultIcon: failureEmoji,
    resultTitle: "Boom! Tough Luck.",
    resultMessage: "Boom! Tough Luck. Better luck next time!",
    coinText: "Coins Lost",
    actionButtonText: "Retry",
  },
};

const getStyle = (backgroundImage) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
});

const ResultScreen = ({
  isOpen,
  amount = 0,
  isWon = false,
  onBack = () => {},
  onMainMenu = () => {},
  onRetryOrReplay = () => {},
}) => {
  if (!isOpen) return null;

  const result = isWon ? resultConfig.won : resultConfig.lost;
  return (
    <div className="relative flex flex-col min-h-screen text-white">
      <div style={getStyle(result.backgroundImage)} />

      {isWon && (
        <div className="absolute inset-0 z-10">
          <Lottie
            animationData={confettiAnimation}
            style={{ width: "100%", height: "100%" }}
            loop={true}
          />
        </div>
      )}
      <GameHeader onBack={onBack} />
      <div className="flex flex-col flex-grow items-center justify-center text-center px-4 z-20">
        <img
          className="h-24 w-24 mb-4"
          src={result.resultIcon}
          alt={isWon ? "Success Trophy" : "Failure Emoji"}
        />

        <h2 className="text-4xl font-bold mb-4">{result.resultTitle}</h2>
        <p className="text-white text-base mb-8">{result.resultMessage}</p>

        <div className="flex items-center justify-center gap-4 w-full">
          <div className="h-[1px] w-20 bg-gradient-to-r from-gray-500 via-white to-gray-200 opacity-40"></div>
          <span className="text-white text-lg font-medium whitespace-nowrap">
            {result.coinText}
          </span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-gray-200 via-white to-gray-500 opacity-40"></div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img className="h-8 w-8" src={images.coin} alt="Coin Icon" />
          <span className="text-2xl font-bold">{amount}</span>
        </div>
      </div>

      <div className="w-full p-4 flex flex-col gap-4 items-center z-20">
        <button
          onClick={onRetryOrReplay}
          className="w-full max-w-md py-3 bg-white text-black font-bold rounded-2xl shadow-lg text-xl transition-transform transform hover:scale-105"
        >
          {result.actionButtonText}
        </button>
        <button
          onClick={onMainMenu}
          className="w-full max-w-md py-3 border border-white text-white font-medium rounded-2xl shadow-lg text-lg bg-black bg-opacity-15 transition-transform transform hover:scale-105"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
