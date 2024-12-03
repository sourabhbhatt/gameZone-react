import { useState, useEffect, useCallback } from "react";
import useSoundEffects from "../../../hooks/useSoundEffects";
import clickSound from "../audio/click.mp3";
import gameOverSound from "../audio/game-over.mp3";
import successSound from "../audio/success.mp3";

const useTicTacToe = (ticTacToeGameConfig, selectedOption) => {
  const [status, setStatus] = useState(null); // Track game status: win, loss, tie
  const [winnerDetails, setWinnerDetails] = useState(null); // Detailed info about the winner
  const [winningCombination, setWinningCombination] = useState(null); // Track winning combination
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(selectedOption === "X");
  const [timeLeft, setTimeLeft] = useState(ticTacToeGameConfig.playerTimeLimit);

  const { initializeSound, playSound } = useSoundEffects();

  useEffect(() => {
    initializeSound("click", clickSound, { volume: 0.5 });
    initializeSound("gameOver", gameOverSound, { volume: 0.7 });
    initializeSound("success", successSound, { volume: 0.7 });
  }, [initializeSound]);

  const resetTimer = useCallback(() => {
    setTimeLeft(ticTacToeGameConfig.playerTimeLimit);
  }, [ticTacToeGameConfig.playerTimeLimit]);

  const checkWinner = useCallback(
    (board) => {
      for (const combination of ticTacToeGameConfig.winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { winner: board[a], combination }; // Return winner and combination
        }
      }
      return null;
    },
    [ticTacToeGameConfig.winningCombinations]
  );

  const handleGameEnd = useCallback(
    (result) => {
      if (result) {
        setWinningCombination(result.combination);
        if (result.winner === selectedOption) {
          setStatus("win");
          setWinnerDetails({ winner: "user", symbol: selectedOption }); // User wins
          playSound("success");
        } else {
          setStatus("loss");
          setWinnerDetails({ winner: "bot", symbol: result.winner }); // Bot wins
          playSound("gameOver");
        }
      } else if (!gameState.includes(null)) {
        setStatus("tie");
        setWinnerDetails({ winner: "tie" }); // Game is tied
        playSound("gameOver");
      }
    },
    [gameState, playSound, selectedOption]
  );

  const minimax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result) {
      if (result.winner === selectedOption) return -10 + depth; // User win
      if (result.winner === (selectedOption === "X" ? "O" : "X"))
        return 10 - depth; // Bot win
    }
    if (!board.includes(null)) return 0; // Tie

    const botSymbol = selectedOption === "X" ? "O" : "X";

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = botSymbol;
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          maxScore = Math.max(maxScore, score);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = selectedOption;
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          minScore = Math.min(minScore, score);
        }
      }
      return minScore;
    }
  };

  const getBotMove = useCallback(() => {
    const botSymbol = selectedOption === "X" ? "O" : "X";
    let bestMove = null;
    let bestScore = -Infinity;

    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        const newBoard = [...gameState];
        newBoard[i] = botSymbol;
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }, [gameState, selectedOption, minimax]);

  const handleMove = useCallback(
    (index) => {
      if (gameState[index] || status) return; // Prevent invalid moves
      const newGameState = [...gameState];
      newGameState[index] = isPlayerTurn
        ? selectedOption
        : selectedOption === "X"
        ? "O"
        : "X";
      setGameState(newGameState);
      playSound("click");

      const result = checkWinner(newGameState);
      handleGameEnd(result);

      if (!result) {
        setIsPlayerTurn(!isPlayerTurn);
        resetTimer();
      }
    },
    [
      gameState,
      isPlayerTurn,
      selectedOption,
      status,
      checkWinner,
      playSound,
      resetTimer,
      handleGameEnd,
    ]
  );

  const handleTimeOut = useCallback(() => {
    if (!isPlayerTurn) return;
    const botMove = getBotMove();
    handleMove(botMove);
  }, [getBotMove, handleMove, isPlayerTurn]);

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
