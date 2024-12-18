import React from "react";
import PlayerInfo from "./PlayerInfo";
import CardFront from "../../components/CardFront";
import CardBack from "../../components/CardBack";

const PlayerCardSection = ({
  botHand,
  playerHand,
  cardsRevealed,
  currentBetAmount,
  winnerDetails,
}) => {
  const isWinnerPlayer = false //winnerDetails === "You";
  const isWinnerBot = true//winnerDetails === "Bot";
  return (
    <div className="flex flex-col items-center mt-6 space-y-6">
      <PlayerInfo
        name="Bot"
        isBot={true}
        isCoinImage={true}
        coinAmount={currentBetAmount}
        amountPlacement="right"
        isWinnerBot={isWinnerBot}
      />
      {cardsRevealed ? (
        <CardFront
          value={botHand[0]?.value}
          suit={botHand[0]?.suit}
          isPlayerCard={false}
        />
      ) : (
        <CardBack />
      )}
      {cardsRevealed ? (
        <CardFront
          value={playerHand[0]?.value}
          suit={playerHand[0]?.suit}
          isPlayerCard={true}
        />
      ) : (
        <CardBack />
      )}
      <PlayerInfo
        isCoinImage={true}
        coinAmount={currentBetAmount}
        amountPlacement="right"
        name="You"
        avatar={require("../../assets/avatar.png")}
        isWinnerPlayer={isWinnerPlayer}
      />
    </div>
  );
};

export default PlayerCardSection;
