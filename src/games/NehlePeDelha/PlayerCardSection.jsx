import React, { useEffect, useState } from "react";
import PlayerInfo from "./PlayerInfo";
import CardFront from "../../components/CardFront";
import CardBack from "../../components/CardBack";

const PlayerCardSection = ({
  botHand,
  playerHand,
  cardsRevealed,
  currentBetAmount,
  winningPlayer = null,
}) => {
  const [revealBotCard, setRevealBotCard] = useState(false);
  const [revealPlayerCard, setRevealPlayerCard] = useState(false);

  useEffect(() => {
    if (cardsRevealed) {
      setRevealPlayerCard(true);
      const timer = setTimeout(() => {
        setRevealBotCard(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRevealBotCard(false);
      setRevealPlayerCard(false);
    }
  }, [cardsRevealed]);

  return (
    <div className="flex flex-col items-center  space-y-6">
      <PlayerInfo
        name="Bot"
        isBot={true}
        isCoinImage={false}
        coinAmount={currentBetAmount}
        amountPlacement={null}
        isWinner={winningPlayer === "Bot"}
        isLooser={winningPlayer === "You"}
      />
      {revealBotCard ? (
        <CardFront
          animation={"fade"}
          value={botHand[0]?.value}
          suit={botHand[0]?.suit}
          isPlayerCard={false}
        />
      ) : (
        <CardBack />
      )}
      {revealPlayerCard ? (
        <CardFront
          animation={"fade"}
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
        amountPlacement="bottom"
        name="You"
        avatar={require("../../assets/avatar.png")}
        isLooser={winningPlayer === "Bot"}
        isWinner={winningPlayer === "You"}
      />
    </div>
  );
};

export default PlayerCardSection;
