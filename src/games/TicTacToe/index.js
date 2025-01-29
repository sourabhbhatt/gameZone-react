import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoInfo } from "react-icons/go";

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import GameHeader from "../../components/GameHeader";
import SwitchToggler from "../../components/SwitchToggler";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";

import useSoundEffects from "../../hooks/useSoundEffects";
import { updateWallet } from "../../redux/slices/userSlice";

import useTicTacToe from "./hooks/useTicTacToe";

import gameMusic from "./audio/game-music-loop.mp3";
import gameStartSound from "./audio/game-start.mp3";
import tictactoeLanding from "./assets/tictactoeLanding.png";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";

import bottombg from "../../assets/bottom-bg.png";

import styled from "styled-components";
import useFullHeight from "../../hooks/useFullheight";

const GlowingTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: bold;
  // font-family: "Outfit", sans-serif;
  line-height: 1.2;
  color: white;
  text-align: center;
  padding-right: 1rem;
  text-shadow: 
               -1px -1px 1px #429F63,  
                0 0 8px rgba(66, 159, 99, 0.9);
 color: white; /* The base color of the text */
  text-shadow: 
    -1px -1px 0 #429F63, /* Green outline - Top-left */
     1px -1px 0 #429F63, /* Green outline - Top-right */
    -1px  1px 0 #429F63, /* Green outline - Bottom-left */
     1px  1px 0 #429F63, /* Green outline - Bottom-right */
     0 0 16px white;    
}
  // animation: glow 1.5s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.6),
                   0 0 3px rgba(255, 255, 255, 0.6),
                   0 0 5px rgba(255, 255, 255, 0.4),
                   -2px -2px 0 #429F63,  
                    2px -2px 0 #429F63,
                   -2px  2px 0 #429F63,
                    2px  2px 0 #429F63,
                   0 0 5px rgba(66, 159, 99, 0.2);
    }
    to {
      text-shadow: 0 0 2px rgba(255, 255, 255, 0.7),
                   0 0 6px rgba(255, 255, 255, 0.7),
                   0 0 10px rgba(255, 255, 255, 0.5),
                   -2px -2px 0 #429F63,  
                    2px -2px 0 #429F63,
                   -2px  2px 0 #429F63,
                    2px  2px 0 #429F63,
                   0 0 10px rgba(66, 159, 99, 0.4);
    }
  }
`;


const TicTacToeLanding = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { initializeSound, playSound, stopSound, updateSound } =
    useSoundEffects();
  const walletAmount = useSelector((state) => state.user?.wallet);

  const { getBalance, resetGame } = useTicTacToe();

  const [loading, setLoading] = useState(false);
  const [currentFee, setCurrentFee] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("X");
  const soundSettings = useSelector((state) => state.app.soundSettings) || {};
  const { musicEnabled = false, musicVolume = 50 } = soundSettings;

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, {
      volume: musicVolume / 100,
      loop: true,
    });
    initializeSound("gameStartSound", gameStartSound, {
      volume: musicVolume / 100,
    });
  }, [document.visibilityState === "visible"]);

  useEffect(() => {
    if (musicEnabled) playSound("gameMusic");
    else stopSound("gameMusic");
    return () => stopSound("gameMusic"); // Cleanup on unmount
  }, [musicEnabled]);

  useEffect(() => {
    updateSound("gameMusic", { volume: musicVolume / 100 });
  }, [musicVolume, updateSound]);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    resetGame(selectedOption);
  }, [selectedOption]);
  const handlePlayClick = () => {
    setLoading(true);
    if (musicEnabled) {
      stopSound("gameMusic");
      playSound("gameStartSound");
    }
    setTimeout(() => {
      dispatch(updateWallet(walletAmount - currentFee));
      setLoading(false);
      navigate("/tictactoe-game", {
        state: { selectedOption, entryFee: currentFee },
      });
    }, 700);
  };

  useFullHeight();

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-top sm:bg-center md:bg-cover md:bg-center bg-no-repeat h-screen max-h-screen text-white full-screen-container overflow-hidden"
      style={{
        backgroundImage: `url(${tictactoeLanding})`,
        height: "100vh",
      }}
    >
      {loading && <Loader size={60} speed={0.8} />}
<<<<<<< HEAD
      <header className="w-full">
        <GameHeader
          title=""
          showBackButton={true}
          className="bg-transparent"
          onBackClick={() => {
            // playClickSound();
            navigate(-1);
          }}
        />
      </header>

      <main className="w-full max-w-lg px-4 flex-1 flex flex-col justify-between py-2">
        <section className="text-center">
          <div className="flex justify-center">
            <PlayAndEarnButton />
          </div>
          <GlowingTitle className="mt-2">Tic Tac Toe</GlowingTitle>

          <p className="text-xs text-gray-300 mt-1 font-outfit max-w-xs mx-auto">
=======
      <GameHeader
        isGameScreen={false}
        isBackButton={false}
        themeConfig={{
          bg: "#ffffff",
          switchTogglerEnabledColor: "#34eb49",
          switchTogglerDisabledColor: "gray",
          barColor: "#7A7A7A",
          titleColor: "#000000",
          headingColor: "#000000",
        }}
      />
      <main className="w-full max-w-lg px-4 mt-12">
        <PlayAndEarnButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2" />
        <section className="text-center mt-5">
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <p className="text-sm text-gray-300 mt-2">
>>>>>>> release-v1-sourabh
            Experience the timeless classic Tic Tac Toe! Challenge yourself or
            your friends to align three X's or O's in a row and claim victory!
          </p>
        </section>

        <section className="flex-1 flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <SwitchToggler
              options={["O", "X"]}
              selectedOption={selectedOption}
              onToggle={setSelectedOption}
            />

            <EntryFeeSelector
              fees={ticTacToeGameConfig.entryFees}
              defaultFee={currentFee}
              onSelectFee={setCurrentFee}
              onPlayClick={handlePlayClick}
              balance={walletAmount}
            />
          </div>
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        title="How to play"
        bgImage={bottombg}
        onClose={toggleModal}
        modalStyles={{
          className: "modal-bottom-sheet",
          style: {
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: "transparent",
            color: "white",
            width: "100%",
            maxWidth: "none",
            borderRadius: "20px 20px 0 0",
            padding: "20px",
            transform: "translateY(0)",
            transition: "transform 0.3s ease-out",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.15)",
            maxHeight: "70vh",
          },
        }}
        titleStyles={{
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
        closeButtonStyles={{
          color: "white",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
        contentStyles={{
          color: "white",
          fontSize: "1rem",
          fontWeight: "normal",
          lineHeight: "1.5",
          overflowY: "auto",
          maxHeight: "70vh",
        }}
      >
        <ModalContent />
      </Modal>
    </div>
  );
});

const ModalContent = () => (
  <div className="text-white">
    <p className="text-sm text-white mb-4 leading-relaxed">
      Align three of your symbols in a row—horizontally, vertically, or
      diagonally—before the bot.
    </p>
    <h3 className="font-semibold text-lg text-white mt-4">Instructions</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-white">
      <li>You play as X (or O), and the bot takes the other symbol.</li>
      <li>Tap on any empty square to place your symbol.</li>
      <li>The bot will then make its move automatically.</li>
    </ul>
    <h3 className="font-semibold text-lg text-white mt-6">Winning & Draw</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-white">
      <li>Win by making a row of three symbols.</li>
      <li>If all squares are filled without a winner, it’s a draw.</li>
    </ul>
  </div>
);

export default TicTacToeLanding;
