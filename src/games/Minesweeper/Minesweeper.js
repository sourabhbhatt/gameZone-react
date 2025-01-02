import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useMinesweeper from "./hooks/useMinesweeper";
import ResultScreen from "./ResultScreen";
import GameHeader from "../../components/GameHeader";
import backgroundCover from "./assets/Minesweeper.png";
import gameBg from "./assets/gameBg.png";
import bomb from "./assets/bomb.png";
import box from "./assets/box.png";
import diamond from "./assets/diamond.png";
import clickSound from "./audio/click.wav";
import explosionSound from "./audio/explosion.mpeg";
import gameOverSound from "./audio/game-over.wav";
import winSound from "./audio/win.wav";
import ExitModal from "./ExitModal";

const Tile = memo(({ index, revealed, grid, onClick }) => {
  const tileContent = () => {
    if (!revealed.includes(index)) return <img src={box} alt="box" />;
    if (grid[index] === "diamond") return <img src={diamond} alt="diamond" />;
    if (grid[index] === "bomb") return <img src={bomb} alt="bomb" />;
  };

  return (
    <div
      className={`w-16 h-16 hover:scale-105 transition-transform ${
        revealed.includes(index) ? "opacity-100" : "opacity-75"
      }`}
      onClick={() => onClick(index)}
    >
      {tileContent()}
    </div>
  );
});

export default function Minesweeper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { entryFee } = location.state || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const soundSettings = useSelector((state) => state.app.soundSettings) || {};
  const {
    soundEnabled = false,
    soundVolume = 50,
    musicEnabled = false,
    musicVolume = 50,
  } = soundSettings;

  const { grid, revealed, revealTile, status, resetGame, gridSize } =
    useMinesweeper(5, entryFee);

  const playSound = useCallback(
    (sound, type = "music") => {
      const audio = new Audio(sound);
      audio.volume = (type === "music" ? musicVolume : soundVolume) / 100;
      audio.play();
    },
    [musicVolume, soundVolume]
  );

  const handleGameOverSound = useCallback(() => {
    if (musicEnabled) {
      playSound(status === "win" ? winSound : gameOverSound, "music");
    }
  }, [musicEnabled, status, playSound]);

  const handleTileClick = useCallback(
    (index) => {
      if (revealed.includes(index) || status !== "playing") return;

      if (soundEnabled) playSound(clickSound, "sound");
      revealTile(index);

      if (grid[index] === "bomb" && soundEnabled) {
        playSound(explosionSound, "sound");
      }
    },
    [revealed, grid, status, soundEnabled, playSound, revealTile]
  );

  useEffect(() => {
    if (status !== "playing") {
      setModalOpen(true);
      handleGameOverSound();
    } else setModalOpen(false);
  }, [status, handleGameOverSound]);

  if (modalOpen) {
    return (
      <ResultScreen
        amount={entryFee}
        isOpen={modalOpen}
        isWon={status === "win"}
        onBack={() => navigate(-1)}
        onMainMenu={() => navigate(-1)}
        onRetryOrReplay={() => resetGame()}
      />
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundCover})`,
        // objectFit: "contain",
        // backgroundSize:"contain"
      }}
    >
      <GameHeader
        themeConfig={{
          bg: "#5C59F1",
          switchTogglerEnabledColor: "gray",
          switchTogglerDisabledColor: "gray",
          barColor: "#A4B2FF",
          titleColor: "#ffffff",
          headingColor: "#ffffff",
        }}
        onBack={() => setIsExitModalOpen(true)}
      />

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
      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => navigate(-1)}
      />
    </div>
  );
}
