import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bgCards from "./assets/cardsBg.png";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import gameMusic from "./audio/gameMusic.mp3";
import useUrlParams from "../../hooks/useUrlParams";
import GameHeader from "../../components/GameHeader";
import useSocketTransactions from "./hooks/useSocket";
import useSoundEffects from "../../hooks/useSoundEffects";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import GameLandingBottom from "./GameLandingBottom";

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
    e.target.style.background = `linear-gradient(to right, #C09BFF ${percentage}%, #ffffff ${percentage}%)`;
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
            bg: "#4A2574",
            gradientBg: ["#4A2574", "#B277F5"],
            switchTogglerEnabledColor: "#B277F5",
            switchTogglerDisabledColor: "#ffffff",
            barColor: "#C09BFF",
            titleColor: "#ffffff",
            headingColor: "#ffffff",
            thumbEnabledColor: "#ffffff",
            thumbDisabledColor: "#B277F3",
          }}
        />
      </div>

      {/* Bottom Section */}
      <GameLandingBottom
        currentFee={currentFee}
        walletAmount={walletAmount}
        minimumAmount={minimumAmount}
        handleInputChange={handleInputChange}
        toggleModal={toggleModal}
        startGame={startGame}
      />
      {/* Bottom Section End*/}
      <Modal
        isOpen={isModalOpen}
        title="How to play"
        onClose={toggleModal}
        modalStyles={{
          className: "modal-bottom-sheet bg-gradient-to-b from-[#4A2574] to-[#B277F5]",
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
  <div className="overflow-y-auto pt-3 pb-5 text-left tracking-normal ">
    <h3 className="text-[12px] font-regular font-outfit text-white tracking-widest uppercase mb-4">
      Instructions
    </h3>
    <ul className="list-disc pl-5 space-y-4 text-[14px] font-regular font-outfit text-white leading-relaxed">
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
