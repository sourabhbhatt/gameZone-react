import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PlayerInfo from "./PlayerInfo";
import WinnerModal from "./WinnerModal";
import Timer from "../../components/Timer";
import TicTacToeBoard from "./TicTacToeBoard";
import useTicTacToe from "./hooks/useTicTacToe";
import GameHeader from "../../components/GameHeader";
import useSoundEffects from "../../hooks/useSoundEffects";
import collectPointsSound from "./audio/collectPoints.mp3";
import tictactoegameBg from "./assets/tictactoegameBg.png";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";
import GameSuccessModal from "./GameSuccessModal";

const TicTacToeGame = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [resultModalInfo, setResultModalInfo] = useState({
    visible: false,
    status: null,
    winnerDetails: null, 
  });
  const { selectedOption } = location.state || {}; 
  const {
    gameState,
    isPlayerTurn,
    status,
    winnerDetails,
    timeLeft,
    handleMove,
    getBotMove,
    winningCombination,
  } = useTicTacToe(ticTacToeGameConfig, selectedOption);
  const { initializeSound, playSound, stopSound } = useSoundEffects();

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Initialize sounds
  useEffect(() => {
    initializeSound("collectPointsSound", collectPointsSound, {
      volume: 1.0,
      loop: false,
    });
  }, [initializeSound]);

  // Play the success sound on win or game over
  useEffect(() => {
    if (status === "win" || status === "loss") {
      playSound("collectPointsSound");
    }
    return () => {
      stopSound("collectPointsSound");
    };
  }, [status, playSound, stopSound]);

  // Handle bot's move
  useEffect(() => {
    if (!isPlayerTurn && !status ) {
      const botMoveTimeout = setTimeout(() => {
        const botMove = getBotMove(); // Get bot's move
        handleMove(botMove); // Perform bot's move
      }, 1000); // Delay bot's move by 1 second
      return () => clearTimeout(botMoveTimeout); // Cleanup on component unmount or when dependencies change
    }
  }, [isPlayerTurn, status, getBotMove, handleMove]);

  // Show the winner modal and update the result modal info
  useEffect(() => {
    if (status) {
      setShowWinnerModal(status === "win" || status === "lose" ? true : false);
      const timeOut = setTimeout(() => {
        setShowWinnerModal(false);
        setResultModalInfo({
          visible: true,
          status,
          winnerDetails, // Pass winner details to the result modal
        });
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [status, winnerDetails]);

  console.log("winnerDetails", winnerDetails);

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
          winningCombination={winningCombination}
          onMove={handleMove}
        />
      </div>

      {/* Timer */}
      <Timer timeLeft={timeLeft} warningTimeStartsFrom={5} />

      {/* Game Status */}
      {showWinnerModal && (
        <WinnerModal
          winner={winnerDetails?.winner === "user" ? selectedOption : "Bot"}
          isPlayerWinner={winnerDetails?.winner === "user"}
          onClose={handleModalClose}
        />
      )}

      {!!resultModalInfo?.visible && (
        <GameSuccessModal
          status={
            winnerDetails?.winner === "user"
              ? "win"
              : winnerDetails?.winner === "bot"
              ? "lose"
              : "tie"
          }
          winnerDetails={resultModalInfo.winnerDetails}
        />
      )}
    </div>
  );
});

export default TicTacToeGame;
