import React from "react";
import bgBottomCard from "./assets/cardBottomBg.png";
import RangeSlider from "../../components/RangeSlider";
import { images } from "../../assets/images";
import { formatINRLocale, showToastMessage } from "../../utils";
import PlayAndEarnButton from "../../components/PlayAndEarnButton";
import NehlePeDelhaConfig from "./NehlePeDelhaConfig.json";

const GameLandingBottom = ({
  currentFee,
  walletAmount,
  minimumAmount,
  handleInputChange = () => {},
  toggleModal = () => {},
  startGame = () => {},
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgBottomCard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-[33.625rem] w-full bg-purple-900 rounded-t-3xl px-2 py-8 -mt-[4.2rem]"
    >
      <div className="flex flex-col justify-end h-full text-white">
        <PlayAndEarnButton />
        <section className="text-center mt-2">
          <h3 className="text-[23px] font-bold text-[#ffffff] font-outfit">
            {NehlePeDelhaConfig.gameTitle}
          </h3>
          <p className="text-[12px] font-outfit text-[#FFFFFF] mt-4 mx-[35px]">
            {`Challenge your skills and strategy in this fun card game. Compete to win exciting rewards and enjoy the thrill of victory!`}
          </p>
        </section>
        <div className="p-2 mt-4 justify-end">
          <p className="text-[16px] font-bold font-outfit">
            {`Select amount to play`}
          </p>
          <div className="font-bold text-[24px] font-outfit underline text-white my-2 mb-3 ">
            {formatINRLocale(currentFee)}
          </div>
          <RangeSlider
            min={String(minimumAmount)}
            max={String(walletAmount)}
            value={currentFee}
            onChange={handleInputChange}
            walletAmount={walletAmount}
            thumbColor={"#C09BFF"}
          />
          <div className="flex justify-between font-outfit text-[14px] font-regular items-center mb-4 mt-[10px] mx-[8px]">
            <span>{formatINRLocale(minimumAmount)}</span>
            <span>{formatINRLocale(walletAmount)}</span>
          </div>

          <div
            className="text-white/60 mt-2 cursor-pointer underline font-outfit text-[14px] font-regular"
            onClick={toggleModal}
          >
            {`How to play?`}
          </div>
          <div className="w-full h-[1px] bg-white/50 my-6 " />
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
            <span className="text-[16px] sm:text-lg font-outfit font-medium">
              Play With
            </span>
            <img
              src={images.coin}
              alt="Coin"
              className="w-4 sm:w-5 h-4 sm:h-5 object-contain animate-spin-slow"
            />
            <span className="text-[16px] font-outfit font-semibold">
              {`${formatINRLocale(currentFee)}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLandingBottom;
