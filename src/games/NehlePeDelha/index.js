import React, { memo, useState } from "react";
import bgCards from "./assets/cardsBg.png";
import bgBottomCard from "./assets/cardBottomBg.png";
import Modal from "../../components/Modal";
import GameHeader from "../../components/GameHeader";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { images } from "../../assets/images";

const index = memo(() => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFee, setCurrentFee] = useState(
    NehlePeDelhaConfig.entryFees.find((fee) => fee.recommended)?.value || 0
  );
  const minimumAmount = 10;
  const walletAmount = useSelector((state) => state.user?.wallet);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    setCurrentFee(value);
    // Dynamically update the background
    e.target.style.background = `linear-gradient(to right, #4A2574 ${
      ((value - 10) / (2000 - 10)) * 100
    }%, #ffffff ${((value - 10) / (2000 - 10)) * 100}%)`;
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
            <input
              type="range"
              className="custom-range w-full"
              min="10"
              max="2000"
              value={currentFee}
              onChange={handleInputChange}
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
    </div>
  );
});

export default index;
