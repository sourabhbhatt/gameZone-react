import { useState, useEffect, useCallback } from "react";

const useTicTacToe = (ticTacToeGameConfig, selectedOption) => {
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null); // Track winning combination
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(selectedOption === "X");
  const [timeLeft, setTimeLeft] = useState(ticTacToeGameConfig.playerTimeLimit);

  const getBotMove = useCallback(() => {
    const emptyCells = gameState
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }, [gameState]);

  // Sound Effects
  const playSound = useCallback((soundPath, volume = 0.5) => {
    const sound = new Audio(soundPath);
    sound.volume = volume;
    sound.play();
  }, []);

  const playMoveSound = useCallback(() => {
    playSound(require("../audio/click.wav"));
  }, [playSound]);

  const playGameOverSound = useCallback(() => {
    playSound(require("../audio/game-over.wav"));
  }, [playSound]);

  // Check for a winner
  const checkWinner = useCallback((board) => {
    for (const combination of ticTacToeGameConfig.winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combination }; // Return winner and combination
      }
    }
    return null;
  }, [ticTacToeGameConfig.winningCombinations]);

  // Handle player or bot move
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
      const result = checkWinner(newGameState);
      if (result) {
        setWinner(result.winner);
        setWinningCombination(result.combination); // Set winning combination
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
      checkWinner,
    ]
  );

  const resetTimer = useCallback(() => {
    setTimeLeft(ticTacToeGameConfig.playerTimeLimit);
  }, [ticTacToeGameConfig.playerTimeLimit]);

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
    winningCombination, // Expose winning combination
    timeLeft,
    handleMove,
    getBotMove,
    resetTimer,
  };
};

export default useTicTacToe;
