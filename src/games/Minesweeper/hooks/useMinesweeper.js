import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { updateWallet } from "../../../redux/slices/userSlice";

export default function useMinesweeper(gridSize = 3, currentFee = 0) {
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user?.wallet);
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [status, setStatus] = useState("playing");
  const [score, setScore] = useState(0);

  const totalDiamonds = Math.floor(gridSize * gridSize * 0.8);
  const totalBombs = gridSize * gridSize - totalDiamonds;

  const generateGrid = useCallback(() => {
    const newGrid = Array(gridSize * gridSize).fill(null);
    const placeItems = (type, count) => {
      let placed = 0;
      while (placed < count) {
        const randomIndex = Math.floor(Math.random() * newGrid.length);
        if (!newGrid[randomIndex]) {
          newGrid[randomIndex] = type;
          placed++;
        }
      }
    };
    placeItems("diamond", totalDiamonds);
    placeItems("bomb", totalBombs);
    return newGrid;
  }, [gridSize, totalDiamonds, totalBombs]);

  const startGame = useCallback(() => {
    setGrid(generateGrid());
    setRevealed([]);
    setStatus("playing");
    setScore(0);
    dispatch(updateWallet(walletAmount - currentFee));
  }, [generateGrid, currentFee, dispatch]);

  const revealTile = useCallback(
    (index) => {
      if (revealed.includes(index) || status !== "playing") return;

      const newRevealed = [...revealed, index];
      setRevealed(newRevealed);

      if (grid[index] === "diamond") {
        const newScore = score + 1;
        setScore(newScore);
        if (newRevealed.length === gridSize * gridSize - totalBombs) {
          setStatus("win");
        }
      } else if (grid[index] === "bomb") {
        setStatus("lose");
      }
    },
    [revealed, status, grid, score, gridSize, totalBombs]
  );

  useEffect(() => {
    startGame();
  }, [gridSize, startGame]);

  return {
    grid,
    revealed,
    revealTile,
    status,
    score,
    resetGame: startGame,
    gridSize,
  };
}
