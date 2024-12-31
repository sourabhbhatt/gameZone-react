import React, { useState, useEffect, useCallback, memo } from "react";
import useMinesweeper from "./hooks/useMinesweeper";
import backgroundCover from "./assets/Minesweeper.png";
import gameBg from "./assets/gameBg.png";
import bomb from "./assets/bomb.png";
import box from "./assets/box.png";
import diamond from "./assets/diamond.png";
import ResultScreen from "./ResultScreen";
import GameHeader from "../../components/GameHeader";

// Sound Effects
import clickSound from "./audio/click.wav";
import explosionSound from "./audio/explosion.mpeg";
import gameOverSound from "./audio/game-over.wav";
import winSound from "./audio/win.wav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Memoized Tile Component
const Tile = memo(({ index, revealed, grid, onClick }) => {
  const getTileContent = () => {
    if (!revealed.includes(index)) return <img src={box} alt="box" />;
    if (grid[index] === "diamond") return <img src={diamond} alt="diamond" />;
    if (grid[index] === "bomb") return <img src={bomb} alt="bomb" />;
    return null;
  };

  return (
    <div
      key={index}
      className={`w-16 h-16 hover:scale-105 transition-transform ${
        revealed.includes(index) ? "opacity-100" : "opacity-75"
      }`}
      onClick={() => onClick(index)}
    >
      {getTileContent()}
    </div>
  );
});

export default function Minesweeper() {
  const { grid, revealed, revealTile, status, score, resetGame, gridSize } =
    useMinesweeper(5);
  const navigate = useNavigate();

  const soundSettings = useSelector((state) => state.app.soundSettings);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    soundEnabled = false,
    soundVolume = 50,
    musicEnabled = false,
    musicVolume = 50,
  } = soundSettings || {};

  const playSound = useCallback((sound, soundType = "music") => {
    const audio = new Audio(sound);
    audio.volume = (soundType === "music" ? musicVolume : soundVolume) / 100;
    audio.play();
  }, []);

  useEffect(() => {
    if (status !== "playing") {
      setModalOpen(true);
      if (musicEnabled) {
        if (status === "win") playSound(winSound, "music");
        else playSound(gameOverSound, "music");
      }
    }
  }, [status, playSound]);

  const handleTileClick = useCallback(
    (index) => {
      if (!revealed.includes(index)) {
        if (soundEnabled) playSound(clickSound, "sound");
        revealTile(index);
        if (grid[index] === "bomb" && !!soundEnabled) {
          playSound(explosionSound, "sound");
        }
      }
    },
    [revealTile, grid, revealed, playSound]
  );
  if (!!modalOpen)
    return (
      <ResultScreen
        isOpen={modalOpen}
        onReplay={() => resetGame()}
        isWon={status === "win"}
        onRetry={() => resetGame()}
        onMainMenu={() => navigate(-1)}
      />
    );

  return (
    <div
      className="flex flex-col min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundCover})` }}
    >
      <div className="w-full">
        <GameHeader />
      </div>

      <div className="flex flex-grow items-center justify-center">
        <div
          className="flex items-center justify-center p-6 rounded-lg"
          style={{
            backgroundImage: `url(${gameBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {grid.map((_, index) => (
              <Tile
                key={index}
                index={index}
                revealed={revealed}
                grid={grid}
                onClick={handleTileClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
