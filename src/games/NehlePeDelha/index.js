import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the game

import GameHeader from "../../components/GameHeader";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import SwitchToggler from "../../components/SwitchToggler"; // Import the new component
import { useNotification } from "../../contexts/NotificationContext";
import { GoInfo } from "react-icons/go";
import Modal from "../../components/Modal";
import nehlePeDelhaLanding from "./assets/nehlePeDelhaLanding.png"; // Import the local image

const NehlePeDelha = memo(() => {
  const navigate = useNavigate();

  const { showNotification } = useNotification();
  const [currentFee, setCurrentFee] = useState(20);
  const [selectedOption, setSelectedOption] = useState("A"); // Default selected option
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  const entryFees = [
    { value: 0, description: "Free Game" },
    { value: 20, description: "Win upto", winUpto: 100, recommended: true },
    { value: 50, description: "Win upto", winUpto: 200 },
  ];

  const handlePlayClick = () => {
    navigate("/nehlepedelha-game", {
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
        backgroundImage: `url(${nehlePeDelhaLanding})`, // Use the imported image here
      }}
    >
      {/* Sticky Header */}
      <GameHeader
        walletAmount="30,000"
        onBack={() =>
          showNotification("info", "Back button clicked", { autoClose: 2000 })
        }
        onMenuClick={() =>
          showNotification("info", "Menu clicked", { autoClose: 2000 })
        }
      />

      {/* Main Content */}
      <div className="w-full max-w-lg px-4 mt-12">
        <PlayAndEarnButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2" />
        <div className="text-center mt-5">
          <h1 className="text-3xl font-bold">Nehle Pe Dehla</h1>
          <p className="text-sm text-gray-300 mt-2">
            Challenge your skills and strategy in this fun card game. Compete to
            win exciting rewards and enjoy the thrill of victory!
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

        <h4 className="text-center mt-2" >Select your team</h4>
        {/* Toggle Options */}
        <SwitchToggler
          options={["A", "B"]}
          selectedOption={selectedOption}
          onToggle={setSelectedOption}
        />

        {/* Gradient Divider */}
        <div
          className="w-full h-[1px] bg-gradient-to-r
          from-blue-200 via-blue-600 to-blue-200 my-6"
        />

        {/* Entry Fee Selector */}
        <EntryFeeSelector
          fees={entryFees}
          defaultFee={currentFee}
          onSelectFee={(fee) => setCurrentFee(fee)}
          onPlayClick={handlePlayClick}
        />
      </div>

      {/* Modal for Game Rules */}
      <Modal isOpen={isModalOpen} title="Game Rules" onClose={toggleModal}>
        <div className="text-sm text-gray-300 space-y-4">
          <p>1. Select your team to start the game.</p>
          <p>2. Choose an entry fee to participate in the game.</p>
          <p>3. Play strategically to win points for your team.</p>
          <p>4. The team with the highest points wins. Good luck!</p>
        </div>
      </Modal>
    </div>
  );
});

export default NehlePeDelha;
