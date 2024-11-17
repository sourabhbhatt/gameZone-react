import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameSettings from './GameSettings';
import './Minesweeper.css';

// Define bomb percentages based on risk level
const BOMB_PERCENTAGES = {
  low: 0.1,
  medium: 0.2,
  high: 0.3,
  hard: 0.4,
};

const createBoard = (size, bombPercentage) => {
  const totalCells = size * size;
  const numBombs = Math.floor(totalCells * bombPercentage);
  const board = Array(totalCells).fill({ isRevealed: false, isStar: false, isBomb: false });

  // Randomly place bombs
  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
    const index = Math.floor(Math.random() * totalCells);
    if (!board[index].isBomb) {
      board[index] = { ...board[index], isBomb: true };
      bombsPlaced++;
    }
  }

  // Set remaining cells as stars
  for (let i = 0; i < board.length; i++) {
    if (!board[i].isBomb) board[i] = { ...board[i], isStar: true };
  }

  return board;
};

const Minesweeper = () => {
  const [gridSize, setGridSize] = useState(4);
  const [riskLevel, setRiskLevel] = useState('low');
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Rebuild the board whenever gridSize or riskLevel changes
  useEffect(() => {
    setBoard(createBoard(gridSize, BOMB_PERCENTAGES[riskLevel]));
    setGameOver(false);
    setGameWon(false);
  }, [gridSize, riskLevel]);

  const handleCellClick = (index) => {
    if (gameOver || board[index].isRevealed) return;

    const newBoard = [...board];
    newBoard[index].isRevealed = true;

    if (newBoard[index].isBomb) {
      setGameOver(true);
    } else if (newBoard.every(cell => (cell.isStar && cell.isRevealed) || cell.isBomb)) {
      setGameWon(true);
      setGameOver(true);
    }

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(createBoard(gridSize, BOMB_PERCENTAGES[riskLevel]));
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="minesweeper">
      <h1>Minesweeper</h1>
      <GameSettings
        gridSize={gridSize}
        setGridSize={setGridSize}
        riskLevel={riskLevel}
        setRiskLevel={setRiskLevel}
      />
      <button onClick={resetGame} className="start-game-button">Start Game</button>

      <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {board.map((cell, index) => (
          <motion.div
            key={index}
            className={`cell ${cell.isRevealed || gameOver ? (cell.isStar ? 'star' : 'bomb') : ''}`}
            onClick={() => handleCellClick(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: cell.isRevealed || gameOver ? 1 : 0.8, scale: cell.isRevealed || gameOver ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: cell.isRevealed || gameOver ? 1.1 : 1.05 }}
          >
            {(cell.isRevealed || gameOver) ? (cell.isStar ? '⭐' : '💣') : ''}
          </motion.div>
        ))}
      </div>

      {gameOver && (
        <motion.div
          className="game-over"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {gameWon ? "Congratulations! You won! 🎉" : "Game Over! You hit a bomb. 💣"}
          <button onClick={resetGame}>Restart</button>
        </motion.div>
      )}
    </div>
  );
};

export default Minesweeper;
