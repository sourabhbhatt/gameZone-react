import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgCards from "./assets/cardsBg.png";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { images } from "../../assets/images";
import Loader from "../../components/Loader";
import gameMusic from "./audio/gameMusic.mp3";
import { showToastMessage } from "../../utils";
import useUrlParams from "../../hooks/useUrlParams";
import bgBottomCard from "./assets/cardBottomBg.png";
import GameHeader from "../../components/GameHeader";
import useSocketTransactions from "./hooks/useSocket";
import RangeSlider from "../../components/RangeSlider";
import useSoundEffects from "../../hooks/useSoundEffects";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";

const index = memo(() => {
  const navigate = useNavigate();
  const walletAmount = useSelector((state) => state.user?.wallet);
  const { initializeSound, playSound, stopSound, updateSound } =
    useSoundEffects();

  const recommendedFee =
    NehlePeDelhaConfig.entryFees.find((fee) => fee.recommended)?.value || 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFee, setCurrentFee] = useState(
    walletAmount >= recommendedFee && walletAmount > 0 ? recommendedFee : 0
  );
  const { getBalance, debitBalance, creditBalance } =
    useSocketTransactions(currentFee);

  const soundSettings = useSelector((state) => state.app.soundSettings);
  const { musicEnabled = false, musicVolume = 50 } = soundSettings || {};
  const minimumAmount = parseInt(walletAmount) > 10 ? 10 : 0;

  const { setParams } = useUrlParams();

  useEffect(() => {
    initializeSound("gameMusic", gameMusic, {
      volume: musicVolume / 100,
      loop: true,
    });
  }, [document.visibilityState === "visible"]);

  useEffect(() => {
    if (musicEnabled) playSound("gameMusic");
    else stopSound("gameMusic");
    return () => stopSound("gameMusic");
  }, [musicEnabled]);

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

  const startGame = async () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/nehlepedelha-game", {
        state: { entryFee: currentFee },
      });
    }, 700);
  };

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    setParams({});
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {loading && <Loader color={"#ffffff"} size={60} speed={0.8} />}
      <div
        className="relative h-[458px] w-full bg-black/10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgCards})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <GameHeader
          className="relative z-10"
          isBackButton={false}
          themeConfig={{
            bg: "#ffffff",
            switchTogglerEnabledColor: "#2E1A4D",
            switchTogglerDisabledColor: "gray",
            barColor: "#7A7A7A",
            titleColor: "#000000",
            headingColor: "#000000",
          }}
        />
      </div>

      <div
        style={{
          backgroundImage: `url(${bgBottomCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative h-[35.625rem] w-full bg-purple-900 rounded-t-3xl px-2 py-8 text-white -mt-[4.2rem] md:-mt-[3.125rem] lg:-mt-[2.5rem]"
      >
        <PlayAndEarnButton />
        <section className="text-center mt-4">
          <h3 className="text-[23px] font-bold text-[#ffffff] font-outfit">
            {NehlePeDelhaConfig.gameTitle}
          </h3>
          <p className="text-[12px] font-outfit text-[#FFFFFF] mt-2">
            {`Challenge your skills and strategy in this fun card game. Compete to
            win exciting rewards and enjoy the thrill of victory!`}
          </p>
        </section>
        <div className="p-2 mt-4 justify-end">
          <p className="text-[18px] font-bold font-outfit">
            {`Select amount to play`}
          </p>
          <div className="font-bold text-lg underline text-white/80 mt-2 mb-3 ">
            {currentFee}
          </div>
          <RangeSlider
            min={String(minimumAmount)}
            max={String(walletAmount)}
            value={currentFee}
            onChange={handleInputChange}
            walletAmount={walletAmount}
          />
          <div className="flex justify-between items-center text-[18px]  mb-4">
            <span>{minimumAmount}</span>
            <span>{walletAmount}</span>
          </div>

          <div
            className="text-white/60 mt-2 cursor-pointer underline"
            onClick={toggleModal}
          >
            {`How to play?`}
          </div>
          <div className="w-full h-[1px] bg-white/50 my-4 sm:my-6" />
          <button
            onClick={() => {
              if (walletAmount < currentFee) {
                showToastMessage("error", "Not enough balance");
                return;
              }
              startGame();
            }}
            className="w-full h-[48px] mt-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-900 text-white rounded-[12px] sm:rounded-3xl shadow-md hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <span className="text-[18px] sm:text-lg font-medium">
              Play With
            </span>
            <img
              src={images.coin}
              alt="Coin"
              className="w-4 sm:w-5 h-4 sm:h-5 object-contain animate-spin-slow"
            />
            <span className="text-[18px] font-semibold">{currentFee}</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="How to play"
        onClose={toggleModal}
        modalStyles={{
          className:
            "modal-bottom-sheet bg-gradient-to-b from-purple-500 to-purple-700",
          style: {
            backgroundColor: "#f8f9fa",
            width: "100%",
            maxWidth: "none",
            borderRadius: "20px 20px 0 0",
            padding: "1rem",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.15)",
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
      >
        <ModalContent />
      </Modal>
    </div>
  );
});

const ModalContent = () => (
  <div className="overflow-y-auto pt-4 text-left tracking-normal ">
    <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-4">
      Instructions
    </h3>
    <ul className="list-disc pl-5 space-y-4 text-sm text-white leading-relaxed">
      <li>You and the bot will each receive one card.</li>
      <li>
        Place your bet on whether your card will be bigger than the bot's card.
      </li>
      <li>
        After the betting, both cards will be revealed. If your card is bigger,
        you win the round and earn real money.
      </li>
      <li>If the bot's card is bigger, you lose the bet.</li>
    </ul>
  </div>
);

export default index;
