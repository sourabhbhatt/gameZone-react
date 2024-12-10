import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { GoInfo } from "react-icons/go";

import GameHeader from "../../components/GameHeader";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import Modal from "../../components/Modal";
import { useNotification } from "../../contexts/NotificationContext";

import nehlePeDelhaLanding from "./assets/nehlePeDelhaLanding.png";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import useSoundEffects from "../../hooks/useSoundEffects";

import gameMusic from "./audio/game-music-loop.mp3";
import gameStartSound from "./audio/game-start.mp3";

const NehlePeDelha = memo(() => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { initializeSound, playSound, stopSound } = useSoundEffects();
 
  const [currentFee, setCurrentFee] = useState(
    NehlePeDelhaConfig.entryFees.find((fee) => fee.recommended)?.value || 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, { volume: 0.5, loop: true });
    initializeSound("gameStartSound", gameStartSound, { volume: 1.0 });
    playSound("gameMusic");
    return () => stopSound("gameMusic"); 
  }, [initializeSound, playSound, stopSound]);


  const handlePlayClick = () => {
    navigate("/nehlepedelha-game", {
      state: {
        entryFee: currentFee,
      },
    });
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const ModalContent = () => (
    <div className="overflow-y-auto max-h-[60vh] px-4 text-gray-100">
      {/* Game Overview */}
      <p className="text-sm text-black mb-4 leading-relaxed">
        In Nehle Pe Dehla, you and the bot reveal cards one by one. The player
        with the higher card value wins the round. It’s a simple yet thrilling
        card game of luck and strategy!
      </p>

      {/* Instructions */}
      <h3 className="font-semibold text-lg text-black mt-4">Instructions</h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
        <li>
          You and the bot are dealt one card each at the start of the round.
        </li>
        <li>
          Your card remains hidden until you press the "Reveal Card" button.
        </li>
        <li>The bot’s card is revealed at the same time as yours.</li>
        <li>The player with the higher card value wins the round.</li>
        <li>If the cards have the same value, it’s a tie for the round.</li>
      </ul>

      {/* Winning & Coins */}
      <h3 className="font-semibold text-lg text-black mt-6">
        Winning & Rewards
      </h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
        <li>
          Win a round to earn the entry fee amount multiplied by the reward
          multiplier.
        </li>
        <li>If the bot wins, your entry fee is forfeited.</li>
        <li>
          If it’s a tie, the entry fee is refunded, and the round is replayed.
        </li>
      </ul>

      {/* Additional Rules */}
      <h3 className="font-semibold text-lg text-black mt-6">
        Additional Rules
      </h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
        <li>
          Suits have no additional value; only card values determine the winner.
        </li>
        <li>
          Card values are ranked as A (highest), K, Q, J, and numbers from 10 to
          2 (lowest).
        </li>
        <li>The game continues until you stop playing or run out of coins.</li>
      </ul>
    </div>
  );

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${nehlePeDelhaLanding})`,
      }}
    >
      {/* Game Header */}
      <GameHeader />

      {/* Main Content */}
      <div className="w-full max-w-lg px-4 mt-12">
        {/* Play & Earn Button */}
        <PlayAndEarnButton className="absolute bottom-4 left-1/2 transform -translate-x-1/2" />

        {/* Game Title & Description */}
        <div className="text-center mt-5">
          <h1 className="text-3xl font-bold font-outfit">
            {NehlePeDelhaConfig.gameTitle}
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Challenge your skills and strategy in this fun card game. Compete to
            win exciting rewards and enjoy the thrill of victory!
          </p>
        </div>

        {/* How to Play Link */}
        <div className="flex items-center justify-center mt-4 cursor-pointer">
          <span className="text-gray-300 text-sm mr-2">How to play</span>
          <GoInfo
            className="text-white text-lg hover:scale-110 transition"
            onClick={toggleModal}
          />
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200 my-6" />

        {/* Entry Fee Selector */}
        <EntryFeeSelector
          fees={NehlePeDelhaConfig.entryFees}
          defaultFee={currentFee}
          onSelectFee={setCurrentFee}
          onPlayClick={handlePlayClick}
        />
      </div>

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
        <ModalContent />
      </Modal>
    </div>
  );
});

export default NehlePeDelha;
