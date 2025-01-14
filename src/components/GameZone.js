import React, { useMemo } from "react";
import GameCard from "./GameCard";
import Wrapper from "./Wrapper";

// Import placeholder images/icons for each game (Replace these with actual paths)
import ludoIcon from "../assets/typing.jpg";
import minesweeperIcon from "../assets/tic-tac-toe.jpg";
import fruitNinjaIcon from "../assets/tic-tac-toe.jpg";
import ticTacToeIcon from "../assets/tic-tac-toe.jpg";
import teenPattiIcon from "../assets/tic-tac-toe.jpg";
import nehlePeDelha from "../assets/nehlePeDelha.webp";

/* centralized for maintainability */
const authData = {
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ2ZWVyYSIsImN1c3RvbV9wYXlsb2FkIjp7ImR1bV91dWlkIjoiY2QzODBmZTYtZDFhYS0xMWVmLWI0ZWUtNmZiNGJjMDcwZTllIiwiaXNfdmVyaWZpZWQiOnRydWUsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJ1c2VyX3V1aWQiOiJlNjg0NTFkYy1iZWRlLTExZWYtYjk5ZS02ZjdhNmE2M2NkOTcifSwiZXhwIjoxNzM2Nzc1Mjk4LCJpYXQiOjE3MzY3NzE2OTgsImlzcyI6InZlZXJhLWFjY2Vzcy1jb250cm9sIiwianRpIjoiMzBkNDFhNGQ2M3FkbXIwa3FzMDM0azEyIiwibmJmIjoxNzM2NzcxNjk4fQ.9D5GU1o5VXKoyvbJWXaHTmo6b0F9_YKRxRO5drpeTzg`,
  refreshToken: `WiRU74HG-pInNQNwvSGtlD1ZKjZuWBK_DKmMlk_xRLe-JGEYaX8RDDIpGRRdrH4dhJqWXn4Z1GlgPoclGSI_P5xBlJ9q6LtvdlRDnHzxOGq7hFWLF5w8FLH7nY-PAHph`,
  userId: `e68451dc-bede-11ef-b99e-6f7a6a63cd97`,
};

const GameZone = () => {
  const gameData = useMemo(
    () => [
      {
        title: "Tic Tac Toe",
        description: "Enjoy the classic game of Xs and Os.",
        imageSrc: ticTacToeIcon,
        link: `/games/tic-tac-toe?token=${authData.token}&refreshToken=${authData.refreshToken}&userId=${authData.userId}`,
        bgColor: "bg-purple-500",
      },
      {
        title: "Nehle Pe Delha",
        description: "Enjoy the thrilling card game Nehle Pe Delha.",
        imageSrc: nehlePeDelha,
        link: `/games/nehle-pe-dehla?token=${authData.token}&refreshToken=${authData.refreshToken}&userId=${authData.userId}`,
        bgColor: "bg-blue-500",
      },
      {
        title: "Play Minesweeper",
        description: "Test your skills in this logic-based puzzle game.",
        imageSrc: minesweeperIcon,
        link: `/games/mine-sweeper?token=${authData.token}&refreshToken=${authData.refreshToken}&userId=${authData.userId}`,
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
    ],
    []
  );

  return (
    <Wrapper>
      <section className="min-h-screen flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Veera Games
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
          {gameData.map(
            ({ title, description, imageSrc, link, bgColor }, index) => (
              <GameCard
                key={index}
                title={title}
                description={description}
                imageSrc={imageSrc}
                link={link}
                bgColor={bgColor}
              />
            )
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default React.memo(GameZone);
