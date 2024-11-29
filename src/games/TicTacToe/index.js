import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the game

import GameHeader from "../../components/GameHeader";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import SwitchToggler from "../../components/SwitchToggler"; // Import the new component
import { useNotification } from "../../contexts/NotificationContext";
import { GoInfo } from "react-icons/go";
import Modal from "../../components/Modal";
import tictactoeLanding from "./assets/tictactoeLanding.png"; // Import the local image
import ticTacToeGameConfig from "./ticTacToeGameConfig.json";

const index = memo(() => {
  const navigate = useNavigate();

  const { showNotification } = useNotification();
  const [currentFee, setCurrentFee] = useState(10);
  const [selectedOption, setSelectedOption] = useState("X"); // Default selected option
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  const handlePlayClick = () => {
    navigate("/tictactoe-game", {
      state: {
        selectedOption,
        entryFee: currentFee,
      },
    });
    showNotification(
      "success",
      `Starting game with ${selectedOption} and ₹${currentFee}`,
      {
        autoClose: 2000,
      }
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${tictactoeLanding})`, // Use the imported image here
      }}
    >
      {/* Sticky Header */}
      <GameHeader walletAmount="20,500" />

      {/* Main Content */}
      <div className="w-full max-w-lg px-4 mt-12">
        <PlayAndEarnButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2" />
        <div className="text-center mt-5">
          <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
          <p className="text-sm text-gray-300 mt-2">
            Lorem ipsum dolor sit amet consectetur. Iaculis ac sed dui morbi
            vulputate faucibus elementum eu eget. Eget semper.
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
        <div
          className="w-full h-[1px] bg-gradient-to-r
          from-green-200 via-green-600 to-green-200 my-6"
        />

        {/* Entry Fee Selector */}
        <EntryFeeSelector
          fees={ticTacToeGameConfig.entryFees}
          defaultFee={currentFee}
          onSelectFee={(fee) => setCurrentFee(fee)}
          onPlayClick={handlePlayClick}
        />
      </div>

      {/* Modal for Game Rules */}
      <Modal isOpen={isModalOpen} title="Game Rules" onClose={toggleModal}>
        <div className="text-sm text-gray-300 space-y-4">
          <p>1. Select an entry fee to participate in the game.</p>
          <p>2. Click "Play" to start the game.</p>
          <p>3. The first player to align three X's or O's in a row wins.</p>
          <p>4. Enjoy the game and earn rewards!</p>
        </div>
      </Modal>
    </div>
  );
});

export default index;
