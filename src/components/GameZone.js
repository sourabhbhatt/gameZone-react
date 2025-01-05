// src/components/GameZone.js
import React from "react";
import GameCard from "./GameCard";
import Wrapper from "./Wrapper";

// Import placeholder images/icons for each game (Replace these with actual paths)
import ludoIcon from "../assets/typing.jpg";
import minesweeperIcon from "../assets/tic-tac-toe.jpg";
import fruitNinjaIcon from "../assets/tic-tac-toe.jpg";
import ticTacToeIcon from "../assets/tic-tac-toe.jpg";
import teenPattiIcon from "../assets/tic-tac-toe.jpg";
import nehlePeDelha from "../assets/nehlePeDelha.webp";

// Game data array for scalability and maintainability
const gameData = [
  {
    title: "Tic Tac Toe",
    description: "Enjoy the classic game of Xs and Os.",
    imageSrc: ticTacToeIcon,
    link: "/games/tic-tac-toe?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2ZWVyYSIsImN1c3RvbV9wYXlsb2FkIjp7ImR1bV91dWlkIjoiZTY4NTFjOGUtYmVkZS0xMWVmLWI5OWYtN2JjOGFlNDYzMDUzIiwiaXNfdmVyaWZpZWQiOnRydWUsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJ1c2VyX3V1aWQiOiJlNjg0NTFkYy1iZWRlLTExZWYtYjk5ZS02ZjdhNmE2M2NkOTcifSwiZXhwIjoxNzM1OTEwNzU5LCJpYXQiOjE3MzU5MDcxNTksImlzcyI6InZlZXJhLWFjY2Vzcy1jb250cm9sIiwianRpIjoiMzBiaXNuYXZrcGJjb3NrNWkwMDJpY3UxIiwibmJmIjoxNzM1OTA3MTU5fQ.QjUAs1HJgC7zc1mr-yYwmZjWatfVbTBb4MQJnBqinZI&refreshToken=oJnSL3TUvr6P29Os2WgNohV19UofMy4P-OPO2g1Uw54yfp3xHMdWuZ1h3Z_k0OXmSgF9KgcoUEANB57HZFLf-ZtJ4YBlM64SJJJvx2cCltX4_c3iDAmMKi-Bq-Mn8T8k&userId=e68451dc-bede-11ef-b99e-6f7a6a63cd97",
    bgColor: "bg-purple-500",
  },
  {
    title: "Nehle Pe Delha",
    description: "Enjoy the thrilling card game Nehle Pe Delha.",
    imageSrc: nehlePeDelha,
    link: "/games/nehle-pe-dehla?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2ZWVyYSIsImN1c3RvbV9wYXlsb2FkIjp7ImR1bV91dWlkIjoiZTY4NTFjOGUtYmVkZS0xMWVmLWI5OWYtN2JjOGFlNDYzMDUzIiwiaXNfdmVyaWZpZWQiOnRydWUsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJ1c2VyX3V1aWQiOiJlNjg0NTFkYy1iZWRlLTExZWYtYjk5ZS02ZjdhNmE2M2NkOTcifSwiZXhwIjoxNzM1OTEwNzU5LCJpYXQiOjE3MzU5MDcxNTksImlzcyI6InZlZXJhLWFjY2Vzcy1jb250cm9sIiwianRpIjoiMzBiaXNuYXZrcGJjb3NrNWkwMDJpY3UxIiwibmJmIjoxNzM1OTA3MTU5fQ.QjUAs1HJgC7zc1mr-yYwmZjWatfVbTBb4MQJnBqinZI&refreshToken=oJnSL3TUvr6P29Os2WgNohV19UofMy4P-OPO2g1Uw54yfp3xHMdWuZ1h3Z_k0OXmSgF9KgcoUEANB57HZFLf-ZtJ4YBlM64SJJJvx2cCltX4_c3iDAmMKi-Bq-Mn8T8k&userId=e68451dc-bede-11ef-b99e-6f7a6a63cd97",
    bgColor: "bg-blue-500",
  },
  {
    title: "Play Minesweeper",
    description: "Test your skills in this logic-based puzzle game.",
    imageSrc: minesweeperIcon,
    link: "/games/mine-sweeper?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2ZWVyYSIsImN1c3RvbV9wYXlsb2FkIjp7ImR1bV91dWlkIjoiZTY4NTFjOGUtYmVkZS0xMWVmLWI5OWYtN2JjOGFlNDYzMDUzIiwiaXNfdmVyaWZpZWQiOnRydWUsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJ1c2VyX3V1aWQiOiJlNjg0NTFkYy1iZWRlLTExZWYtYjk5ZS02ZjdhNmE2M2NkOTcifSwiZXhwIjoxNzM1OTEwNzU5LCJpYXQiOjE3MzU5MDcxNTksImlzcyI6InZlZXJhLWFjY2Vzcy1jb250cm9sIiwianRpIjoiMzBiaXNuYXZrcGJjb3NrNWkwMDJpY3UxIiwibmJmIjoxNzM1OTA3MTU5fQ.QjUAs1HJgC7zc1mr-yYwmZjWatfVbTBb4MQJnBqinZI&refreshToken=oJnSL3TUvr6P29Os2WgNohV19UofMy4P-OPO2g1Uw54yfp3xHMdWuZ1h3Z_k0OXmSgF9KgcoUEANB57HZFLf-ZtJ4YBlM64SJJJvx2cCltX4_c3iDAmMKi-Bq-Mn8T8k&userId=e68451dc-bede-11ef-b99e-6f7a6a63cd97",
    bgColor: "bg-green-500",
  },
  {
    title: "Teen Patti",
    description: "Explore classic card games like Teen Patti and more.",
    imageSrc: teenPattiIcon,
    link: "/teen-patti",
    bgColor: "bg-blue-500",
  },
  {
    title: "Play Ludo",
    description: "A classic board game where you race to the finish!",
    imageSrc: ludoIcon,
    link: "/ludo",
    bgColor: "bg-blue-500",
  },
  {
    title: "Play Fruit Ninja",
    description: "Swipe and slice your way through delicious fruit!",
    imageSrc: fruitNinjaIcon,
    link: "/fruit-ninja",
    bgColor: "bg-red-500",
  },
];

const GameZone = () => {
  return (
    <Wrapper>
      <div className="min-h-screen flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Veera Games
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
          {gameData.map((game, index) => (
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
    </Wrapper>
  );
};

export default React.memo(GameZone);
