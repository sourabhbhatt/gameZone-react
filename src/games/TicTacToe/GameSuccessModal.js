import React from "react";
import winScreen from "./assets/winScreen.png";
import GameHeader from "../../components/GameHeader";
import { images } from "../../assets/images";
import PlayerInfo from "./PlayerInfo";
import { BiRefresh } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const headingInfo = {
  win: {
    title: "Slay! You Just Schooled the Bot",
    icon: "🏆",
    description: "Congratulations! You outsmarted the bot.",
  },
  lose: {
    title: "Oops! The Bot Took the Dub",
    icon: "😔",
    description: "Play again and claim your win!",
  },
  tie: {
    title: "Stalemate! It’s a Tie",
    icon: "🤝",
    description: "You matched the bot move for move.",
  },
};

const GameSuccessModal = ({
  earnedCoins = 0,
  playerScore = 4,
  botScore = 2,
  personalBest = "12:0",
  status = "win",
}) => {
  const { title, icon, description } = headingInfo[status] || headingInfo.win;
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 bg-[#001e1c] bg-opacity-90 text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${winScreen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <GameHeader showCrossIcon={true} menuButton={false} />

      <div className="text-center mt-1">
        <h2 className="w-[70%] mx-auto text-4xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 glow-text">
          {title}
          <span className="text-yellow-400 text-3xl">{icon}</span>
        </h2>
        <p className="w-[60%] mx-auto text-gray-300 mt-5">{description}</p>
      </div>

      <div className="relative flex items-center justify-center mt-4">
        <h3 className="relative z-10 px-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
          COINS EARNED
        </h3>
      </div>

      <div className="flex justify-center items-center mt-2 relative z-10">
        <img
          src={images.coin}
          alt="Coin"
          className="w-10 h-10 mx-5 bg-gray-400 p-2 rounded-full"
        />
        <p className="text-3xl font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-green-400 glow-text">
          {earnedCoins}
        </p>
      </div>

      {/* Overall Score */}
      <div className="text-center mt-5 relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-700 blur-lg"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-700 blur-lg"></div>
        <h3 className="text-lg font-semibold text-gray-300 relative z-10">
          OVERALL SCORE
        </h3>
        <div className="flex justify-center items-center mt-6 space-x-8 relative z-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{playerScore}</span>
            <PlayerInfo
              name="You"
              avatar={require("../../assets/avatar.png")}
            />
          </div>
          <span className="text-2xl font-bold text-white">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white">{botScore}</span>
            <PlayerInfo name="Bot" isBot={true} />
          </div>
        </div>
      </div>

      {/* Personal Best */}
      <p className="mt-7 text-sm text-gray-400 px-4 py-2 border border-gray-600 rounded-full bg-gradient-to-br from-gray-800 to-gray-900">
        Your personal best is <span className="font-bold">{personalBest}</span>
      </p>

      <button
        className="w-[90%] flex justify-center items-center mt-10 px-8 py-4 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white 
        text-lg font-bold shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] transition-all
       hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        onClick={() => navigate(-1)}
      >
        <span className="flex items-center space-x-2">
          <BiRefresh className="h-6 w-6" />
          <span>Play Again</span>
        </span>
      </button>
    </div>
  );
};

export default React.memo(GameSuccessModal);
