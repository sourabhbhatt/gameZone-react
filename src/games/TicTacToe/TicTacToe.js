// src/TicTacToe/TicTacToe.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [isXNext, setIsXNext] = useState(true); // Track which player's turn
  const [winner, setWinner] = useState(null); // Track the winner
  const [winningCells, setWinningCells] = useState([]); // Track winning cells for strikethrough

  useEffect(() => {
    if (!isXNext && !winner) {
      const botMoveDelay = setTimeout(() => {
        const botMove = makeBotMove(board);
        if (botMove !== -1) {
          const newBoard = [...board];
          newBoard[botMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
          const winningResult = calculateWinner(newBoard);
          if (winningResult) {
            setWinner(winningResult.winner);
            setWinningCells(winningResult.line);
          }
        }
      }, 500); // Reduced delay for bot response (0.5 seconds)

      return () => clearTimeout(botMoveDelay); // Clean up timeout on component unmount
    }
  }, [isXNext, board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return; // Ignore clicks on occupied cells, game over, or bot's turn

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    // Check for a winner after the move
    const winningResult = calculateWinner(newBoard);
    if (winningResult) {
      setWinner(winningResult.winner);
      setWinningCells(winningResult.line);
    }
  };

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let line of winningCombinations) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line }; // Return winner and winning line
      }
    }
    return null;
  };

  const makeBotMove = (board) => {
    const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
    if (emptyCells.length === 0) return -1; // No move possible if board is full

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className={`cell ${winningCells.includes(index) ? 'winning-cell' : ''}`} // Apply winning-cell class if part of the winning combination
            onClick={() => handleClick(index)}
            disabled={!!cell || winner || !isXNext}
          >
            <AnimatePresence>
              {cell && (
                <motion.span
                  key={cell + index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cell === 'X' ? 'x-marker' : 'o-marker'} // Add class to style X and O
                >
                  {cell}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}

        {/* Strikethrough line overlay */}
        {/* {winner && (
          <div className={`strikethrough-line ${getStrikethroughClass(winningCells)}`} />
        )} */}
      </div>
      {winner && <p className="winner">Winner: {winner}</p>}
      {!winner && board.every(cell => cell) && <p className="winner">It’s a Draw!</p>}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

// Helper function to determine the strikethrough line class
const getStrikethroughClass = (winningCells) => {
  if (winningCells.includes(0) && winningCells.includes(1) && winningCells.includes(2)) return 'horizontal-top';
  if (winningCells.includes(3) && winningCells.includes(4) && winningCells.includes(5)) return 'horizontal-middle';
  if (winningCells.includes(6) && winningCells.includes(7) && winningCells.includes(8)) return 'horizontal-bottom';
  if (winningCells.includes(0) && winningCells.includes(3) && winningCells.includes(6)) return 'vertical-left';
  if (winningCells.includes(1) && winningCells.includes(4) && winningCells.includes(7)) return 'vertical-center';
  if (winningCells.includes(2) && winningCells.includes(5) && winningCells.includes(8)) return 'vertical-right';
  if (winningCells.includes(0) && winningCells.includes(4) && winningCells.includes(8)) return 'diagonal-top-left';
  if (winningCells.includes(2) && winningCells.includes(4) && winningCells.includes(6)) return 'diagonal-top-right';
  return '';
};

export default TicTacToe;
