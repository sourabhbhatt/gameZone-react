import React, { memo, useEffect, useState } from "react";
import bgCards from "./assets/cardsBg.png";
import bgBottomCard from "./assets/cardBottomBg.png";
import Modal from "../../components/Modal";
import GameHeader from "../../components/GameHeader";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { images } from "../../assets/images";
import RangeSlider from "../../components/RangeSlider";
import gameMusic from "./audio/gameMusic.mp3";
import useSoundEffects from "../../hooks/useSoundEffects";

const index = memo(() => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFee, setCurrentFee] = useState(
    NehlePeDelhaConfig.entryFees.find((fee) => fee.recommended)?.value || 0
  );
  const minimumAmount = 10;
  const walletAmount = useSelector((state) => state.user?.wallet);
  const { initializeSound, playSound, stopSound, updateSound } =
    useSoundEffects();
  const soundSettings = useSelector((state) => state.app.soundSettings);
  const { musicEnabled = false, musicVolume = 50 } = soundSettings || {};

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, {
      volume: musicVolume / 100,
      loop: true,
    });
    if (musicEnabled) playSound("gameMusic");
    else stopSound("gameMusic");

    return () => stopSound("gameMusic"); // Cleanup on unmount
  }, [initializeSound, playSound, stopSound]);

  useEffect(() => {
    updateSound("gameMusic", { volume: musicVolume / 100 });
  }, [musicVolume, updateSound]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    setCurrentFee(value);
    // Dynamically update the background
    const percentage =
      ((value - minimumAmount) / (walletAmount - minimumAmount)) * 100;
    e.target.style.background = `linear-gradient(to right, #4A2574 ${percentage}%, #ffffff ${percentage}%)`;
  };

  const startGame = () => {
    navigate("/nehlepedelha-game", {
      state: {
        entryFee: currentFee,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        style={{ backgroundImage: `url(${bgCards})` }}
        className="h-[40vh]  bg-cover bg-center relative"
      >
        <GameHeader />
      </div>

      <div
        style={{
          backgroundImage: `url(${bgBottomCard})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex-grow-[6] relative rounded-t-3xl -mt-12"
      >
        <main className="w-full max-w-lg mt-10">
          <PlayAndEarnButton />
          <section className="text-center mt-2 px-8">
            <h1 className="text-2xl font-bold text-white">
              {NehlePeDelhaConfig.gameTitle}
            </h1>
            <p className="text-sm text-gray-300 mt-5">
              Challenge your skills and strategy in this fun card game. Compete
              to win exciting rewards and enjoy the thrill of victory!{" "}
            </p>
          </section>
          <div className="text-white p-6 rounded-xl mt-3">
            <p className=" text-lg font-bold ">Select amount to play</p>
            <div className="font-bold text-xl underline text-white mt-2 mb-3">
              {currentFee}
            </div>
            <RangeSlider
              min={String(minimumAmount)}
              max={String(walletAmount)}
              value={currentFee}
              onChange={handleInputChange}
              //  disabled={betLock || autoBetPlaced}
              //  customClasses='your-slider-class-name'
              //  secondaryBgColor='var( - secondary-color)'
            />
            <div className="flex justify-between items-center text-sm mb-4">
              <span>{minimumAmount}</span>
              <span>{walletAmount}</span>
            </div>

            <div
              className="text-white mt-4 cursor-pointer underline"
              onClick={toggleModal}
            >
              How to play?
            </div>
            <div className="w-full h-[1.5px] bg-white my-6" />
            <button
              onClick={startGame}
              className="w-full mt-1 px-6 py-3 bg-purple-900 text-white rounded-3xl shadow-md hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span className="text-lg font-medium">Play With</span>
              <img
                src={images.coin}
                alt="Coin"
                className="w-5 h-5 object-contain animate-spin-slow"
              />
              <span className="text-lg font-medium">{currentFee}</span>
            </button>
          </div>
        </main>
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

const ModalContent = () => (
  <div
    className="h-[80vh] overflow-y-auto p-4 bg-gray-100"
    style={{
      maxHeight: "80vh",
    }}
  >
    <p className="text-sm text-black mb-4 leading-relaxed">
      Compete with your opponent to win the round by holding the highest card.
      It's a simple and fun game of chance!
    </p>
    <h3 className="font-semibold text-lg text-black mt-4">Instructions</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>The game is played between 2 players.</li>
      <li>Each player is dealt 1 card per round.</li>
      <li>The player with the higher card wins the round.</li>
      <li>
        If both players get cards of the same rank, it’s a tie for that round.
      </li>
    </ul>
    <h3 className="font-semibold text-lg text-black mt-6">Winning & Scoring</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>Each round's winner earns a point.</li>
      <li>
        The game continues for a set number of rounds or until one player
        reaches the target score.
      </li>
      <li>
        The player with the most points at the end of the game is the winner.
      </li>
    </ul>
  </div>
);

export default index;
