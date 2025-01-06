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
import { use } from "react";

const TicTacToeLanding = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { initializeSound, playSound, stopSound, updateSound } = useSoundEffects();
  const walletAmount = useSelector((state) => state.user?.wallet);

  const { getBalance, resetGame } = useTicTacToe();

  const [loading, setLoading] = useState(false);
  const [currentFee, setCurrentFee] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("X");
  const soundSettings = useSelector((state) => state.app.soundSettings) || {};
  const { musicEnabled = false, musicVolume = 50, } = soundSettings;

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, { volume: musicVolume / 100, loop: true, });
    initializeSound("gameStartSound", gameStartSound, { volume: musicVolume / 100 });
  }, [document.visibilityState === "visible"]);

  useEffect(() => {
    if (musicEnabled) playSound("gameMusic");
    else stopSound("gameMusic");
    return () => stopSound("gameMusic"); // Cleanup on unmount
  }, [musicEnabled])

  useEffect(() => {
    updateSound("gameMusic", { volume: musicVolume / 100 });
  }, [musicVolume, updateSound]);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    getBalance();
  }, [])

  useEffect(() => {
    resetGame(selectedOption)
  }, [selectedOption])
  const handlePlayClick = () => {
    setLoading(true)
    if (musicEnabled) {
      stopSound("gameMusic");
      playSound("gameStartSound");
    }
    setTimeout(() => {
      dispatch(updateWallet(walletAmount - currentFee));
      setLoading(false)
      navigate("/tictactoe-game", {
        state: { selectedOption, entryFee: currentFee },
      });
    }, 700);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-top sm:bg-center md:bg-cover md:bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${tictactoeLanding})` }}
    >
      {loading && <Loader size={60} speed={0.8} />}
      <GameHeader
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
            Experience the timeless classic Tic Tac Toe! Challenge yourself or
            your friends to align three X's or O's in a row and claim victory!
          </p>
        </section>
        <div className="flex items-center justify-center mt-4 cursor-pointer">
          <span className="text-gray-300 text-sm mr-2">How to play</span>
          <GoInfo
            className="text-white text-lg hover:scale-110 transition"
            onClick={toggleModal}
          />
        </div>
        <SwitchToggler
          options={["O", "X"]}
          selectedOption={selectedOption}
          onToggle={setSelectedOption}
        />
        <div className="w-full h-[1px] bg-gradient-to-r from-green-200 via-green-600 to-green-200 my-6" />
        <EntryFeeSelector
          fees={ticTacToeGameConfig.entryFees}
          defaultFee={currentFee}
          onSelectFee={setCurrentFee}
          onPlayClick={handlePlayClick}
        />
      </main>
      <Modal
        isOpen={isModalOpen}
        title="How to play"
        onClose={toggleModal}
        modalStyles={{
          className: "modal-bottom-sheet",
          style: {
            backgroundColor: "#f8f9fa",
            width: "100%",
            maxWidth: "none",
            borderRadius: "20px 20px 0 0",
            padding: "1.5rem",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <ModalContent />
      </Modal>
    </div>
  );
});

const ModalContent = () => (
  <div className="text-gray-100">
    <p className="text-sm text-black mb-4 leading-relaxed">
      Align three of your symbols in a row—horizontally, vertically, or
      diagonally—before the bot.
    </p>
    <h3 className="font-semibold text-lg text-black mt-4">Instructions</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>You play as X (or O), and the bot takes the other symbol.</li>
      <li>Tap on any empty square to place your symbol.</li>
      <li>The bot will then make its move automatically.</li>
    </ul>
    <h3 className="font-semibold text-lg text-black mt-6">Winning & Draw</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>Win by making a row of three symbols.</li>
      <li>If all squares are filled without a winner, it’s a draw.</li>
    </ul>
  </div>
);

export default TicTacToeLanding;
