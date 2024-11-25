// src/components/GameZone.js
import React from "react";
import GameCard from "./GameCard";

// Import placeholder images/icons for each game (Replace these with actual paths)
import ludoIcon from "../assets/typing.jpg";
import minesweeperIcon from "../assets/tic-tac-toe.jpg";
import fruitNinjaIcon from "../assets/tic-tac-toe.jpg";
import ticTacToeIcon from "../assets/tic-tac-toe.jpg";
import teenPattiIcon from "../assets/tic-tac-toe.jpg";
import nehlePeDelha from "../assets/nehlePeDelha.webp";

// Game data array for scalability and maintainability
const games = [
  {
    title: "Teen Patti",
    description: "Explore classic card games like Teen Patti and more.",
    imageSrc: teenPattiIcon,
    link: "/teen-patti", // Updated route
    bgColor: "bg-blue-500",
  },
  {
    title: "Nehle Pe Delha",
    description: "Enjoy the thrilling card game Nehle Pe Delha.",
    imageSrc: nehlePeDelha,
    link: "/nehle-pe-delha", // Updated route
    bgColor: "bg-blue-500",
  },
  {
    title: "Play Ludo",
    description: "A classic board game where you race to the finish!",
    imageSrc: ludoIcon,
    link: "/ludo", // Updated route
    bgColor: "bg-blue-500",
  },
  {
    title: "Play Minesweeper",
    description: "Test your skills in this logic-based puzzle game.",
    imageSrc: minesweeperIcon,
    link: "/minesweeper", // Updated route
    bgColor: "bg-green-500",
  },
  {
    title: "Play Fruit Ninja",
    description: "Swipe and slice your way through delicious fruit!",
    imageSrc: fruitNinjaIcon,
    link: "/fruit-ninja", // Updated route
    bgColor: "bg-red-500",
  },
  {
    title: "Tic Tac Toe",
    description: "Enjoy the classic game of Xs and Os.",
    imageSrc: ticTacToeIcon,
    link: "/tic-tac-toe", // Updated route
    bgColor: "bg-purple-500",
  },
];

const GameZone = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            imageSrc={game.imageSrc}
            link={game.link}
            bgColor={game.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default GameZone;
