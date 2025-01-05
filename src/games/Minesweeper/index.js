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
import useMinesweeper from "./hooks/useMinesweeper";
import useUrlParams from "../../hooks/useUrlParams";

const Index = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getBalance, debitBalance } = useMinesweeper();
  const { setParams } = useUrlParams();

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    setParams({
    })
  }, [])


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
  }, []);
  // }, [initializeSound, playSound, stopSound, musicEnabled]);

  useEffect(() => {
    updateSound("gameMusic", { volume: musicVolume / 100 });
  }, [musicVolume, updateSound]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handlePlayClick = async () => {
    await debitBalance(currentFee).then((data) => {
      console.log("Debit successful", data);
    });
    if (loading) return;
    setLoading(true);
    if (musicEnabled) stopSound("gameMusic");
    dispatch(updateWallet(walletAmount - currentFee));
    setLoading(false);
    navigate("/minesweeper-game", { state: { entryFee: currentFee } });
  };

  return (
    <div
      className="flex flex-col items-center justify-end min-h-screen text-white bg-cover bg-center bg-no-repeat w-full bg-red-500"
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: 'cover',
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
      />

      <div className="flex-grow-[6] relative rounded-t-3xl mt-[30vh]">
        <PlayAndEarnButton />
        <main className="w-full max-w-lg mt-1">
          <section className="text-center mt-2 px-8">
            <h1 className="text-2xl font-bold text-white">
              {MinesweeperConfig.gameTitle}
            </h1>
            <p className="text-sm text-gray-300 mt-5">
              Uncover safe squares, avoid hidden mines – that’s all you need to
              master the thrilling challenge of Minesweeper!{" "}
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
            balance={walletAmount}
          />
        </main>
      </div>

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
  <div className="overflow-y-auto p-4 text-justify tracking-normal">
    <p className="text-base text-black mb-4">
      Find all the diamonds while avoiding the mines.
    </p>
    <h3 className="font-semibold text-sm text-black mt-4 uppercase">
      Instructions
    </h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-black">
      <li>Tap on a tile to reveal it.</li>
      <li>Each tile will either show a diamond or a mine.</li>
      <li>Keep tapping to uncover all the diamonds without hitting a mine.</li>
    </ul>

    <h3 className="font-semibold text-sm text-black mt-6 uppercase">
      Winning & Losing
    </h3>
    <ul className="list-disc list-inside space-y-2 text-sm text-black">
      <li>Win by revealing all the diamonds.</li>
      <li>If you reveal a mine, the game is over.</li>
    </ul>
  </div>
);

export default Index;
