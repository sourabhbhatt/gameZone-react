import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PlayerInfo from "./PlayerInfo";
import WinnerModal from "./WinnerModal";
import Timer from "../../components/Timer";
import TicTacToeBoard from "../../components/TicTacToeBoard";
import GameHeader from "../../components/GameHeader";
import GameSuccessModal from "./GameSuccessModal";

import useTicTacToe from "./hooks/useTicTacToe";

import tictactoegameBg from "../../assets/tictactoeBgGame.png";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";
import sleep from "../../utils/sleep";
import badgetictactoe from "../../assets/badgetictactoe.png";
import useFullHeight from "../../hooks/useFullheight";

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
    currentPlayer,
    isClickBlocked
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
      const showModal = async () => {
        let modalTimeout;
        if (status && ["win", "lose", "tie"].includes(status)) {
          await sleep(3000); // wait for 3 seconds

          setShowWinnerModal(true);
          modalTimeout = setTimeout(() => {
            setShowWinnerModal(false);
            setResultModalInfo({
              visible: true,
              status,
              winnerDetails,
            });
          }, 1000);
          setShowWinnerModal(true);
          modalTimeout = setTimeout(() => {
            setShowWinnerModal(false);
            setResultModalInfo({
              visible: true,
              status,
              winnerDetails,
            });
          }, 1000);
        }
      };
      showModal();
    }

    return () => {
      if (modalTimeout) clearTimeout(modalTimeout);
    };
  }, [status, winnerDetails]);

  useFullHeight();
  return (
    <div
      className="flex flex-col h-screen max-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${tictactoegameBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <GameHeader
        title=""
        showBackButton={true}
        className="bg-transparent"
      />

      <div className="flex-1 flex flex-col items-center justify-between overflow-hidden py-4">
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center w-full max-w-md px-4">
            <PlayerInfo
              type="user"
              choice={selectedOption}
              isActive={currentPlayer === "user"}
              avatar={require("../../assets/avatar.png")}
            />
            <span className="text-md font-bold text-white mt-[27%]">vs</span>
            <PlayerInfo
              type="bot"
              choice={selectedOption === "X" ? "O" : "X"}
              isActive={currentPlayer === "bot"}
              isBot={true}
              avatar={require("../../assets/bot.png")}
            />
          </div>
          <img src={badgetictactoe} alt="Badge" className="w-16 mt-2" />
        </div>

        <div className="flex flex-col items-start justify-start flex-1 min-h-0 scale-90">
          <TicTacToeBoard 
            gameState={gameState} 
            winningCombination={winningCombination} 
            onMove={(index) => {
              if (!isClickBlocked) handleMove(index);
            }}
          />
        </div>

        <div className="w-full flex justify-center mb-4">
          <Timer 
            timeLeft={timeLeft} 
            warningTimeStartsFrom={5} 
            show={isPlayerTurn && !["win", "lose", "tie"].includes(status)} 
          />
        </div>
      </div>

      {showWinnerModal && (
        <WinnerModal
          winnerDetails={winnerDetails}
          isPlayerWinner={winnerDetails?.winner === "user"} />
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
