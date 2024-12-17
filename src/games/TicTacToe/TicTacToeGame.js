import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PlayerInfo from "./PlayerInfo";
import WinnerModal from "./WinnerModal";
import Timer from "../../components/Timer";
import TicTacToeBoard from "./TicTacToeBoard";
import GameHeader from "../../components/GameHeader";
import GameSuccessModal from "./GameSuccessModal";

import useTicTacToe from "./hooks/useTicTacToe";

import tictactoegameBg from "./assets/tictactoegameBg.png";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";

const TicTacToeGame = memo(() => {
  const location = useLocation();

  const { selectedOption, entryFee } = location.state || {};
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [resultModalInfo, setResultModalInfo] = useState({
    visible: false,
    status: null,
    winnerDetails: null,
  });

  const {
    gameState,
    isPlayerTurn,
    status,
    winnerDetails,
    timeLeft,
    handleMove,
    joinGame,
    winningCombination,
    resetGame,
    currentPlayer
  } = useTicTacToe(ticTacToeGameConfig, selectedOption, entryFee);

  useEffect(() => {
    joinGame();
  }, [joinGame]);

  useEffect(() => {
    if (!isPlayerTurn && !status) {
      const botMoveTimeout = setTimeout(() => {
        handleMove(-1); // Backend will handle bot moves
      }, 1000);
      return () => clearTimeout(botMoveTimeout);
    }
  }, [isPlayerTurn, status, handleMove]);

  useEffect(() => {
    let modalTimeout;
    if (status) {
      if (["win", "lose"].includes(status)) {
        setShowWinnerModal(true);
        modalTimeout = setTimeout(() => {
          setShowWinnerModal(false);
          setResultModalInfo({
            visible: true,
            status,
            winnerDetails,
          });
        }, 1000);
      // } else {
      //   setResultModalInfo({
      //     visible: true,
      //     status,
      //     winnerDetails,
      //   });
      }
    }

    return () => {
      if (modalTimeout) clearTimeout(modalTimeout);
    };
  }, [status, winnerDetails]);

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-[#001e1c]"
      style={{ backgroundImage: `url(${tictactoegameBg})` }}
    >
      <GameHeader showCrossIcon showSettingsIcon title="Tic Tac Toe" resetGame={resetGame} />

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
            isBot
            isActive={!isPlayerTurn}
            choice={selectedOption === "X" ? "O" : "X"}
          />
        </div>
      </div>

      <div className="mt-6">
        <TicTacToeBoard
          gameState={gameState}
          winningCombination={winningCombination}
          onMove={handleMove}
        />
      </div>

      {currentPlayer === selectedOption && <Timer timeLeft={timeLeft} warningTimeStartsFrom={5} />}

      {showWinnerModal && (
        <WinnerModal isPlayerWinner={winnerDetails?.winner === "user"} />
      )}

      {resultModalInfo.visible && (
        <GameSuccessModal
          status={
            winnerDetails?.winner === "user"
              ? "win"
              : winnerDetails?.winner === "bot"
              ? "lose"
              : "tie"
          }
          winnerDetails={resultModalInfo.winnerDetails}
          resetGame={resetGame}
        />
      )}
    </div>
  );
});

export default TicTacToeGame;
