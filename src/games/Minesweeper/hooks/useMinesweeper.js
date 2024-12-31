import { useState, useEffect } from "react";

export default function useMinesweeper(gridSize = 5) {
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [status, setStatus] = useState("playing"); // playing, win, lose
  const [score, setScore] = useState(0);

  const totalDiamonds = Math.floor(gridSize * gridSize * 0.8); // 80% diamonds
  const totalBombs = gridSize * gridSize - totalDiamonds; // Remaining are bombs

  // Initialize the grid with diamonds and bombs
  useEffect(() => {
    const newGrid = Array(gridSize * gridSize).fill(null);

    // Place diamonds
    let diamondsPlaced = 0;
    while (diamondsPlaced < totalDiamonds) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[randomIndex]) {
        newGrid[randomIndex] = "diamond";
        diamondsPlaced++;
      }
    }

    // Place bombs
    let bombsPlaced = 0;
    while (bombsPlaced < totalBombs) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[randomIndex]) {
        newGrid[randomIndex] = "bomb";
        bombsPlaced++;
      }
    }

    setGrid(newGrid);
  }, [gridSize]);

  const revealTile = (index) => {
    if (revealed.includes(index) || status !== "playing") return;

    const newRevealed = [...revealed, index];
    setRevealed(newRevealed);

    if (grid[index] === "diamond") {
      setScore(score + 1);
      if (newRevealed.length === gridSize * gridSize - totalBombs) {
        setStatus("win"); // All diamonds collected without hitting bombs
      }
    } else if (grid[index] === "bomb") {
      setStatus("lose");
    }
  };

  const resetGame = () => {
    const newGrid = Array(gridSize * gridSize).fill(null);

    // Place diamonds
    let diamondsPlaced = 0;
    while (diamondsPlaced < totalDiamonds) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[randomIndex]) {
        newGrid[randomIndex] = "diamond";
        diamondsPlaced++;
      }
    }

    // Place bombs
    let bombsPlaced = 0;
    while (bombsPlaced < totalBombs) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[randomIndex]) {
        newGrid[randomIndex] = "bomb";
        bombsPlaced++;
      }
    }

    setGrid(newGrid);
    setRevealed([]);
    setStatus("playing");
    setScore(0);
  };

  return { grid, revealed, revealTile, status, score, resetGame, gridSize };
}
