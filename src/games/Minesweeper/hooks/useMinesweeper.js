import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { updateWallet } from "../../../redux/slices/userSlice";
import { io } from "socket.io-client";

import extractQueryParams from "../../../utils/extractQueryParams";
import useUrlParams from "../../../hooks/useUrlParams";

const socket = io("https://api.gaming.veerastage.com");

export default function useMinesweeper(gridSize = 3, currentFee = 0, id) {
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user?.wallet);
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [status, setStatus] = useState("playing");
  const [score, setScore] = useState(0);

  const {getUrlParams} = useUrlParams();
  const queryParams = getUrlParams();
  console.log("Query params:", queryParams);

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


  }, [generateGrid, currentFee, dispatch, walletAmount]);



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

          // Emit a credit event for winning
          socket.emit("credit", {
            points: currentFee * 2,
            event_name: "Game Win",
            display_text: "Winning reward",
            params: queryParams,
            resolve: (response) => {
              console.log("Credit response:", response);
              if (response.success) {
                // Update the wallet state in Redux
                dispatch(updateWallet(walletAmount + currentFee * 2));
              } else {
                console.error("Credit failed");
              }
            },
          });
        }
      } else if (grid[index] === "bomb") {
        setStatus("lose");
      }
    },
    [revealed, status, grid, score, gridSize, totalBombs, currentFee, dispatch, walletAmount]
  );

  useEffect(() => {
    startGame();


  }, [gridSize, startGame]);


  const getBalance = () => {
    socket.emit("getBalance", { queryParams }, (response) => {
      dispatch(updateWallet(response?.balance?.data || 0));

    });
  }

  const debitBalance = async (entryFee) => {
    socket.emit("debit", {
      points: entryFee,
      ledgerText: "Game entry fee",
      id: "direct",
      params: queryParams,
      resolve: (response) => {
        console.log("Debit response:", response);
        if (response.success) {
          // Update the wallet state in Redux
          dispatch(updateWallet(walletAmount - currentFee));
        } else {
          console.error("Debit failed");
        }
        return true
      },
    });
    return false
  }

  const creditBalance = async (balance) => {
    socket.emit("credit", {
      points: balance,
      event_name: "Game Win",
      display_text: "Winning reward",
      params: queryParams,
      resolve: (response) => {
        console.log("Credit response:", response);
        if (response.success) {
          // Update the wallet state in Redux
          dispatch(updateWallet(walletAmount + currentFee));
        } else {
          console.error("Credit failed");
        }
      },
    });
  }

  // useEffect(() => {
  //   getBalance();
  // }, []);

  return {
    grid,
    revealed,
    revealTile,
    status,
    score,
    resetGame: startGame,
    gridSize,
    getBalance,
    debitBalance
  };
}
