import React, { memo } from "react";
import lobbyHeader from "./assets/lobbyHeader.png";
import PlayerInfo from "./PlayerInfo";

const PlayerInfoHeader = ({ currentBetAmount }) => {
  return (
    <div className="flex justify-center items-center w-full py-4">
      {/* Background Image Container */}
      <div
        style={{
          backgroundImage: `url(${lobbyHeader})`,
          backgroundSize: "contain", // Ensure the full image is visible
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative w-[90%] aspect-[8/2] flex items-center justify-center"
      >
        {/* Content Inside Background */}
        <div className="flex justify-between items-center w-[60%] max-w-4xl px-6 -mt-4">
          <PlayerInfo
            coinAmount={currentBetAmount}
            amountPlacement="right"
            name="You"
            avatar={require("../../assets/avatar.png")}
          />
          <PlayerInfo
            name="Bot"
            isBot={true}
            coinAmount={currentBetAmount}
            amountPlacement="left"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PlayerInfoHeader);
