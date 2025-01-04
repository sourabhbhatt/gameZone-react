import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../../redux/slices/userSlice";
import useSoundEffects from "../../../hooks/useSoundEffects";

import clickSound from "../audio/click.mp3";
import gameOverSound from "../audio/game-over.mp3";
import successSound from "../audio/success.mp3";
import collectPointsSound from "../audio/collectPoints.mp3";

const socket = io("https://api.gaming.veerastage.com"); // Update with your backend URL

const useTicTacToe = (config, selectedOption, entryFee) => {
  const dispatch = useDispatch();

  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [timeLeft, setTimeLeft] = useState(config?.playerTimeLimit || 15);
  const [status, setStatus] = useState(null);
  const [winnerDetails, setWinnerDetails] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);
  const [currentPlayer , setCurrentPlayer] = useState(selectedOption);

  const walletAmount = useSelector((state) => state.user?.wallet);

  const { initializeSound, playSound } = useSoundEffects();

  const resetGame = useCallback((data) => {

    console.log("resetGame called", data);
    socket.emit("resetGame", {player: selectedOption || data});
  }, []);


  const getGameSatus = useCallback((winner, playerSymbol) => {

    console.log(winner, playerSymbol);

    if (!winner) {
      return null;
    }

    if (winner === playerSymbol) {
      return "win";
    } else if (winner === "tie") {
      return "tie";
    }

    return "lose";

  }, []);


  useEffect(() => {
    initializeSound("click", clickSound, { volume: 0.5 });
    initializeSound("gameOver", gameOverSound, { volume: 0.7 });
    initializeSound("success", successSound, { volume: 0.7 });
    initializeSound("collectPoints", collectPointsSound, { volume: 0.7 });
  }, [initializeSound]);

  useEffect(() => {
    socket.on("balance", balance => {
      console.log(balance)
      dispatch(updateWallet(balance?.data || 0));
    });

    socket.on("gameUpdate", (updatedGameState) => {
      console.log(updatedGameState);
      setGameState(updatedGameState.board);
      setIsPlayerTurn(updatedGameState.currentPlayer === selectedOption);
      setStatus(getGameSatus(updatedGameState.winner, updatedGameState.playerSymbol));
      setWinnerDetails(updatedGameState.winnerDetails);
      setWinningCombination(updatedGameState.winningCombination);
      setCurrentPlayer(updatedGameState.currentPlayer)

      if (updatedGameState.currentPlayer === selectedOption) {
  
        setTimeLeft(15);
      } 

      
    });

    return () => {
      socket.off("gameUpdate");
    };
  }, [selectedOption]);



  const handleMove = useCallback(
    (index) => {
      if (gameState[index] || status) return;

      socket.emit("makeMove", { index });
      playSound("click");
    },
    [gameState, status, playSound]
  );

  const joinGame = useCallback(() => {
    socket.emit(
      "joinGame",
      { playerName: "Player", entryFee, player: selectedOption, botMode: true },
      (response) => {

        console.log(response);
        // if (response.success) {
        //   dispatch(updateWallet(walletAmount - entryFee));
        // } else {
        //   console.error("Failed to join game:", response.message);
        // }
      }
    );
  }, [entryFee, walletAmount, dispatch]);

  const handleTimeOut = useCallback(() => {
    if (isPlayerTurn) {
      socket.emit("timeout");
    }
  }, [isPlayerTurn]);

  const getBalance = useCallback(() => {
    socket.emit("getBalance", (response) => {
      console.log(response);
      dispatch(updateWallet(response?.balance?.data || 0));
      
    });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !status) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !status) {
      handleTimeOut();
    }
  }, [timeLeft, status, handleTimeOut]);

  return {
    gameState,
    isPlayerTurn,
    currentPlayer,
    status,
    winnerDetails,
    winningCombination,
    timeLeft,
    handleMove,
    joinGame,
    resetGame,
    getBalance
  };
};

export default useTicTacToe;
