import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameHeader from "../../components/GameHeader";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import SwitchToggler from "../../components/SwitchToggler";
import { useNotification } from "../../contexts/NotificationContext";
import { GoInfo } from "react-icons/go";
import Modal from "../../components/Modal";
import tictactoeLanding from "./assets/tictactoeLanding.png";
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../redux/slices/userSlice";
import useSoundEffects from "../../hooks/useSoundEffects";
import gameMusic from "./audio/game-music-loop.mp3";
import gameStartSound from "./audio/game-start.mp3";

const TicTacToeLanding = memo(() => {
  const dispatch = useDispatch();
  const { initializeSound, playSound, stopSound, updateSound } =
    useSoundEffects();
  const walletAmount = useSelector((state) => state.user?.wallet);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [currentFee, setCurrentFee] = useState(10);
  const [selectedOption, setSelectedOption] = useState("X");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayClick = () => {
    stopSound("gameMusic");
    playSound("gameStartSound");
    setTimeout(() => {
      dispatch(updateWallet(walletAmount - currentFee));
      navigate("/tictactoe-game", {
        state: { selectedOption, entryFee: currentFee },
      });
    }, 700);
  };

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, { volume: 0.5, loop: true });
    initializeSound("gameStartSound", gameStartSound, { volume: 1.0 });
    playSound("gameMusic");
  }, [initializeSound]);

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${tictactoeLanding})` }}
    >
      {/* Header */}
      <GameHeader walletAmount="20,500" />

      {/* Main Content */}
      <div className="w-full max-w-lg px-4 mt-12">
        <PlayAndEarnButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2" />
        <div className="text-center mt-5">
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <p className="text-sm text-gray-300 mt-2">
            Experience the timeless classic Tic Tac Toe! Challenge yourself or
            your friends to align three X's or O's in a row and claim victory!
          </p>
        </div>

        {/* How to Play Section */}
        <div className="flex items-center justify-center mt-4 cursor-pointer">
          <span className="text-gray-300 text-sm mr-2">How to play</span>
          <GoInfo
            className="text-white text-lg hover:scale-110 transition"
            onClick={toggleModal}
          />
        </div>

        {/* Toggle Options */}
        <SwitchToggler
          options={["O", "X"]}
          selectedOption={selectedOption}
          onToggle={setSelectedOption}
        />

        {/* Gradient Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-green-200 via-green-600 to-green-200 my-6" />

        {/* Entry Fee Selector */}
        <EntryFeeSelector
          fees={ticTacToeGameConfig.entryFees}
          defaultFee={currentFee}
          onSelectFee={(fee) => setCurrentFee(fee)}
          onPlayClick={handlePlayClick}
        />
      </div>

      {/* Modal for Game Rules */}
      <Modal
        isOpen={isModalOpen}
        title="How to play"
        onClose={toggleModal}
        modalStyles={{
          backgroundColor: "#f8f9fa",
          width: "70%",
          maxWidth: "500px",
          padding: "2rem",
          style: { borderRadius: "10px" },
        }}
      >
        <div className="text-gray-100">
          {/* Game Description */}
          <p className="text-sm text-black mb-4 leading-relaxed">
            Align three of your symbols in a row—horizontally, vertically, or
            diagonally—before the bot.
          </p>

          {/* Instructions Section */}
          <h3 className="font-semibold text-lg text-black mt-4">
            Instructions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
            <li>You play as X (or O), and the bot takes the other symbol.</li>
            <li>Tap on any empty square to place your symbol.</li>
            <li>The bot will then make its move automatically.</li>
          </ul>

          {/* Winning & Draw Section */}
          <h3 className="font-semibold text-lg text-black mt-6">
            Winning & Draw
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
            <li>Win by making a row of three symbols.</li>
            <li>If all squares are filled without a winner, it’s a draw.</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
});

export default TicTacToeLanding;
