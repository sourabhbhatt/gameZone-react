import React from "react";
import PlayerInfo from "./PlayerInfo";
import lobbyHeader from "./assets/lobbyHeader.png";

const PlayerInfoHeader = ({ currentBetAmount }) => {
  return (
    <div className="flex justify-center items-center w-full py-4">
      <div
        style={{
          backgroundImage: `url(${lobbyHeader})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative w-full bg-no-repeat bg-center bg-contain aspect-[8/2] flex items-center justify-center"
      >
        <div className="flex justify-between items-center w-[80%] 
         sm:w-[60%] max-w-4xl px-4 sm:px-6 -mt-4 sm:-mt-6">
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

export default PlayerInfoHeader;
