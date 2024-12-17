import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../../redux/slices/userSlice";
import useSoundEffects from "../../../hooks/useSoundEffects";

import clickSound from "../audio/click.mp3";
import gameOverSound from "../audio/game-over.mp3";
import successSound from "../audio/success.mp3";
import collectPointsSound from "../audio/collectPoints.mp3";

const useTicTacToe = (config, selectedOption, entryFee) => {
  const dispatch = useDispatch();

  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player always starts
  const [timeLeft, setTimeLeft] = useState(config.playerTimeLimit);
  const [status, setStatus] = useState(null);
  const [winnerDetails, setWinnerDetails] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);

  const isOnline = useSelector((state) => state.app.connectionStatus.isOnline);
  const walletAmount = useSelector((state) => state.user?.wallet);
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  const { initializeSound, playSound, updateSound } = useSoundEffects();

  // Initialize and update sounds dynamically
  useEffect(() => {
    initializeSound("click", clickSound, { volume: soundVolume / 100 });
    initializeSound("gameOver", gameOverSound, { volume: musicVolume / 100 });
    initializeSound("success", successSound, { volume: musicVolume / 100 });
    initializeSound("collectPoints", collectPointsSound, {
      volume: musicVolume / 100,
    });
  }, [initializeSound]);

  useEffect(() => {
    // Update sound volumes in real-time
    updateSound("click", { volume: soundVolume / 100 });
    updateSound("gameOver", { volume: musicVolume / 100 });
    updateSound("success", { volume: musicVolume / 100 });
    updateSound("collectPoints", { volume: musicVolume / 100 });
  }, [soundVolume, musicVolume, updateSound]);

  const resetTimer = useCallback(() => {
    setTimeLeft(config.playerTimeLimit);
  }, [config.playerTimeLimit]);

  const determineWinner = useCallback(
    (board) => {
      for (const combination of config.winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { winner: board[a], combination };
        }
      }
      return null;
    },
    [config.winningCombinations]
  );

  const updateWalletAmount = useCallback(
    (amount) => {
      dispatch(updateWallet(walletAmount + amount));
    },
    [dispatch, walletAmount]
  );

  const handleGameEnd = useCallback(
    (result) => {
      if (result) {
        setWinningCombination(result.combination);
        if (result.winner === selectedOption) {
          setStatus("win");
          setWinnerDetails({ winner: "user", symbol: selectedOption });
          updateWalletAmount(entryFee);
          if (musicEnabled) {
            playSound("success");
            setTimeout(() => playSound("collectPoints"), 500);
          }
        } else {
          setStatus("loss");
          setWinnerDetails({ winner: "bot", symbol: result.winner });
          updateWalletAmount(-entryFee);
          if (musicEnabled) playSound("gameOver");
        }
      } else if (!gameState.includes(null)) {
        setStatus("tie");
        setWinnerDetails({ winner: "tie" });
        if (musicEnabled) playSound("gameOver");
      }
    },
    [
      gameState,
      selectedOption,
      entryFee,
      updateWalletAmount,
      playSound,
      musicEnabled,
    ]
  );

  const getBotMove = useCallback(() => {
    const botSymbol = selectedOption === "X" ? "O" : "X";
    let bestMove = null;
    let bestScore = -Infinity;

    gameState.forEach((cell, index) => {
      if (cell === null) {
        const newBoard = [...gameState];
        newBoard[index] = botSymbol;
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = index;
        }
      }
    });

    return bestMove;
  }, [gameState, selectedOption]);

  const minimax = useCallback(
    (board, depth, isMaximizing) => {
      const result = determineWinner(board);
      if (result) {
        if (result.winner === selectedOption) return -10 + depth;
        if (result.winner === (selectedOption === "X" ? "O" : "X"))
          return 10 - depth;
      }
      if (!board.includes(null)) return 0;

      const botSymbol = selectedOption === "X" ? "O" : "X";
      if (isMaximizing) {
        let maxScore = -Infinity;
        board.forEach((cell, index) => {
          if (cell === null) {
            board[index] = botSymbol;
            maxScore = Math.max(maxScore, minimax(board, depth + 1, false));
            board[index] = null;
          }
        });
        return maxScore;
      } else {
        let minScore = Infinity;
        board.forEach((cell, index) => {
          if (cell === null) {
            board[index] = selectedOption;
            minScore = Math.min(minScore, minimax(board, depth + 1, true));
            board[index] = null;
          }
        });
        return minScore;
      }
    },
    [determineWinner, selectedOption]
  );

  const handleMove = useCallback(
    (index) => {
      if (gameState[index] || status) return; // Block move if offline

      const newGameState = [...gameState];
      newGameState[index] = isPlayerTurn ? selectedOption : "O";
      setGameState(newGameState);
      if (soundEnabled) playSound("click");

      const result = determineWinner(newGameState);
      handleGameEnd(result);

      if (!result) {
        setIsPlayerTurn((prev) => !prev);
        resetTimer();
      }
    },
    [
      gameState,
      isPlayerTurn,
      selectedOption,
      status,
      determineWinner,
      handleGameEnd,
      playSound,
      resetTimer,
    ]
  );

  useEffect(() => {
    if (timeLeft > 0 && !status) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !status) {
      handleMove(getBotMove());
    }
  }, [timeLeft, status, handleMove, getBotMove]);

  return {
    gameState,
    isPlayerTurn,
    status,
    winnerDetails,
    winningCombination,
    timeLeft,
    handleMove,
    getBotMove,
    resetTimer,
  };
};

export default useTicTacToe;
