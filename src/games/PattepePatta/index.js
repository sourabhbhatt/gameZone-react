import React, { useState } from "react";
import Loader from "../../components/Loader";
import GameHeader from "../../components/GameHeader";
import landingBg from "./assets/landingBg.png";
import landingCover from "./assets/landingCover.png";
import bottomSheetBg from "./assets/bottomSheetBg.png";
import playAndEarnBtn from "./assets/playAndEarnBtn.png";
import RangeSlider from "./RangeSlider";
import { useSelector } from "react-redux";

export default function Index() {
  const walletAmount = useSelector((state) => state.user?.wallet);

  const [loading, setLoading] = useState(false);
  const [currentFee, setCurrentFee] = useState(0);
  const [minimumAmount, setMinimumAmount] = useState(10);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${landingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Loader */}
      {loading && <Loader color={"#ffffff"} size={60} speed={0.8} />}

      {/* Header Section */}
      <div
        style={{ backgroundImage: `url(${landingCover})` }}
        className="h-[50vh] sm:h-[40vh] bg-cover bg-center relative"
      >
        <GameHeader
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

      {/* Bottom Section with sticky and contain background */}
      <div
        style={{
          // backgroundColor:'red',
          backgroundImage: `url(${bottomSheetBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
        className="flex-grow relative rounded-t-3xl -mt-12 sm:-mt-12 flex items-start justify-center overflow-y-auto"
      >
        <main className="w-full max-w-sm sm:max-w-lg mt-7 sm:mt-10 px-4 sm:px-8">
          <div className="flex justify-center">
            <img
              src={playAndEarnBtn}
              alt="Play and Earn"
              className="w-[50%] sm:w-[60%] max-w-[300px]"
              loading="lazy"
            />
          </div>

          {/* Game Title and Description */}
          <section className="text-center mt-4 sm:mt-6">
            <h1 className="text-lg sm:text-2xl font-bold text-white">
              {`PATTE PE PATTA`}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 sm:mt-4 leading-relaxed">
              est your skills and luck in the ultimate card challenge.
              Strategize, bet smart, and outplay your opponent to claim victory.
              The stakes are high—are you ready to win big?{" "}
            </p>
            <h1 className="text-sm sm:text-xl font-regular text-[#3CEDFF] mt-2 underline">
              {`How to play?`}
            </h1>
          </section>

          {/* Range Slider Section */}
          <div className="text-white p-4 sm:p-6 rounded-xl mt-4 sm:mt-6 bg-[#1A0B34] shadow-lg">
            <p className="text-base sm:text-lg font-bold">
              Select amount to play
            </p>
            <div className="font-bold text-lg underline text-white mt-2 mb-3">
              {currentFee}
            </div>
            <RangeSlider />
            <div className="flex justify-between items-center text-xs sm:text-sm mt-2 mb-4">
              <span>{minimumAmount}</span>
              <span>{walletAmount}</span>
            </div>

            <div className="w-full h-[1px] bg-white my-4 sm:my-6" />

            {/* Play Button */}
            <button className="w-full mt-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-900 text-white rounded-xl sm:rounded-3xl shadow-md hover:scale-105 transition-all flex items-center justify-center space-x-2">
              <span className="text-sm sm:text-lg font-medium">Play With</span>
              <span className="text-sm sm:text-lg font-medium">{"400"}</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
