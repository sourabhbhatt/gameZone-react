import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GameHeader from "../../components/GameHeader";
import TicTacToeBoard from "./TicTacToeBoard";
import PlayerInfo from "./PlayerInfo";
import Timer from "../../components/Timer";
import useTicTacToe from "./hooks/useTicTacToe";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";
import WinnerModal from "./WinnerModal";
import tictactoegameBg from "./assets/tictactoegameBg.png";
import SettingsModal from "../../components/SettingsModal";

const TicTacToeGame = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Modal visibility
  const { selectedOption } = location.state || {}; // User's selection from state

  const { gameState, isPlayerTurn, winner, timeLeft, handleMove, getBotMove } =
    useTicTacToe(ticTacToeGameConfig, selectedOption);

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Handle bot's move
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const botMoveTimeout = setTimeout(() => {
        const botMove = getBotMove(); // Get bot's move
        handleMove(botMove); // Perform bot's move
      }, 1000); // Delay bot's move by 1 second
      return () => clearTimeout(botMoveTimeout); // Cleanup on component unmount or when dependencies change
    }
  }, [isPlayerTurn, winner, getBotMove, handleMove]);

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-[#001e1c]"
      style={{
        backgroundImage: `url(${tictactoegameBg})`, // Use the imported image here
      }}
    >
      {/* Header Section */}
      <GameHeader
        showCrossIcon={true}
        showSettingsIcon={true}
        title={"Tic Tac Toe"}
        onBack={() => setIsSettingsOpen(false)}
        onMenuClick={() => setIsSettingsOpen(true)}
      />

      {/* Players Section */}
      <div className="flex flex-col items-center space-y-4 mt-4">
        <div className="flex justify-center items-center space-x-8">
          <PlayerInfo
            name="You"
            avatar={require("../../assets/avatar.png")}
            isActive={isPlayerTurn}
            choice={selectedOption}
          />
          <span className="text-2xl font-bold text-white">VS</span>
          <PlayerInfo
            name="Bot"
            isBot={true}
            isActive={!isPlayerTurn}
            choice={selectedOption === "X" ? "O" : "X"}
          />
        </div>
      </div>

      {/* Game Board */}
      <div className="mt-6">
        <TicTacToeBoard
          gameState={gameState}
          winningCombination={ticTacToeGameConfig.winningCombinations}
          onMove={handleMove}
        />
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} warningTimeStartsFrom={5} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Game Status */}
      {winner && (
        <WinnerModal
          winner={winner}
          isPlayerWinner={winner === selectedOption}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
});

export default TicTacToeGame;
