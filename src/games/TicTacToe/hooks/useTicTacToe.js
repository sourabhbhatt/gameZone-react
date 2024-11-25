import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const useTicTacToe = (ticTacToeGameConfig, selectedOption) => {
  const [winner, setWinner] = useState(null);
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(selectedOption === "X");
  const [timeLeft, setTimeLeft] = useState(ticTacToeGameConfig.playerTimeLimit);
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  const getBotMove = useCallback(() => {
    const emptyCells = gameState
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [gameState]);

  // Sound Effects
  const playSound = useCallback((soundPath, volume = 0.5) => {
    const sound = new Audio(soundPath);
    sound.volume = soundVolume ? soundVolume / 100 : volume;
    sound.play();
  }, []);

  const playMoveSound = useCallback(() => {
    playSound(require("../audio/click.wav"));
  }, [playSound]);

  const playGameOverSound = useCallback(() => {
    playSound(require("../audio/game-over.wav"));
  }, [playSound]);

  const handleMove = useCallback(
    (index) => {
      if (gameState[index] || winner) return; // Prevent invalid moves
      const newGameState = [...gameState];
      newGameState[index] = isPlayerTurn
        ? selectedOption
        : selectedOption === "X"
        ? "O"
        : "X";
      setGameState(newGameState);
      playMoveSound();
      const checkWin = checkWinner(newGameState);
      if (checkWin) {
        setWinner(checkWin);
        playGameOverSound();
      } else {
        setIsPlayerTurn(!isPlayerTurn);
        resetTimer();
      }
    },
    [
      gameState,
      isPlayerTurn,
      selectedOption,
      winner,
      playMoveSound,
      playGameOverSound,
    ]
  );

  const checkWinner = useCallback((board) => {
    for (const combination of ticTacToeGameConfig.winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(ticTacToeGameConfig.playerTimeLimit);
  }, []);

  const handleTimeOut = useCallback(() => {
    if (!isPlayerTurn) return; // Only execute if it's the player's turn
    const botMove = getBotMove();
    handleMove(botMove); // Bot plays if time runs out
  }, [getBotMove, handleMove, isPlayerTurn]);

  useEffect(() => {
    if (timeLeft > 0 && !winner) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !winner) {
      handleTimeOut(); // Trigger timeout logic when the timer hits zero
    }
  }, [timeLeft, winner, handleTimeOut]);

  return {
    gameState,
    isPlayerTurn,
    winner,
    timeLeft,
    handleMove,
    getBotMove,
    resetTimer,
  };
};

export default useTicTacToe;
