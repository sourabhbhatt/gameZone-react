import React, { memo, useEffect, useState } from "react";
import landingBg from "./assets/landingBg.png";
import Modal from "../../components/Modal";
import GameHeader from "../../components/GameHeader";
import MinesweeperConfig from "./MinesweeperConfig.json";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import gameMusic from "./audio/game-music-loop.mp3";
import useSoundEffects from "../../hooks/useSoundEffects";
import EntryFeeSelector from "../../components/EntryFeeSelector";
import { updateWallet } from "../../redux/slices/userSlice";
import { GoInfo } from "react-icons/go";

const Index = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("X");

  const [currentFee, setCurrentFee] = useState(
    MinesweeperConfig.entryFees.find((fee) => fee.recommended)?.value || 0
  );

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
  }, [initializeSound, playSound, stopSound, musicEnabled]);

  useEffect(() => {
    updateSound("gameMusic", { volume: musicVolume / 100 });
  }, [musicVolume, updateSound]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handlePlayClick = () => {
    if (loading) return;

    setLoading(true);
    if (musicEnabled) {
      stopSound("gameMusic");
      playSound("gameStartSound");
    }

    setTimeout(() => {
      dispatch(updateWallet(walletAmount - currentFee));
      setLoading(false);
      navigate("/minesweeper-game", {
        state: { selectedOption, entryFee: currentFee },
      });
    }, 700);
  };

  return (
    <div
      className="flex flex-col items-center justify-end min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <GameHeader />

      <div className="flex-grow-[6] relative rounded-t-3xl mt-[90px]">
        <PlayAndEarnButton />
        <main className="w-full max-w-lg mt-1">
          <section className="text-center mt-2 px-8">
            <h1 className="text-2xl font-bold text-white">
              {MinesweeperConfig.gameTitle}
            </h1>
            <p className="text-sm text-gray-300 mt-5">
              Challenge your skills and strategy in this fun card game. Compete
              to win exciting rewards and enjoy the thrill of victory!
            </p>
            <div className="flex items-center justify-center mt-4 cursor-pointer">
              <span className="text-gray-300 text-sm mr-2">How to play</span>
              <GoInfo
                className="text-white text-lg hover:scale-110 transition"
                onClick={toggleModal}
              />
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-green-200 via-green-600 to-green-200 my-6" />

          <EntryFeeSelector
            fees={MinesweeperConfig.entryFees}
            defaultFee={currentFee}
            onSelectFee={setCurrentFee}
            onPlayClick={handlePlayClick}
          />
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
          borderRadius: "10px",
        }}
      >
        <ModalContent />
      </Modal>
    </div>
  );
});

const ModalContent = () => (
  <div
    className="h-[80vh] overflow-y-auto p-4 bg-gray-100 text-justify"
    style={{
      maxHeight: "80vh",
    }}
  >
    <p className="text-sm text-black mb-4 leading-relaxed">
      Welcome to the Minesweeper challenge! Your objective is to navigate the
      field and uncover all the hidden diamonds while avoiding the mines.
    </p>
    <h3 className="font-semibold text-lg text-black mt-4">Instructions</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>Select a cell to reveal whether it contains a diamond or a mine.</li>
      <li>
        Diamonds add to your score, while triggering a mine ends the game.
      </li>
      <li>Strategically uncover cells to maximize your diamond count.</li>
      <li>Mark suspected mines with flags to avoid accidental clicks.</li>
    </ul>
    <h3 className="font-semibold text-lg text-black mt-6">Tips & Tricks</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>Think ahead and uncover cells in less risky areas first.</li>
      <li>Flag cells you suspect to contain mines to keep track of them.</li>
      <li>Focus on areas with a higher likelihood of finding diamonds.</li>
    </ul>
    <h3 className="font-semibold text-lg text-black mt-6">Winning & Scoring</h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-800">
      <li>Collect as many diamonds as possible without triggering a mine.</li>
      <li>The more diamonds you find, the higher your score.</li>
      <li>Avoid mines to stay in the game and maximize your rewards.</li>
    </ul>
  </div>
);

export default Index;
