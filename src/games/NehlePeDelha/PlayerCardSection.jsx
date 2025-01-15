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
  const [isWinnerBot, setIsWinnerBot] = useState(null);
  const [isWinnerPlayer, setIsWinnerPlayer] = useState(null);

  useEffect(() => {
    if (cardsRevealed) {
      const playerCardTimer = setTimeout(() => setRevealPlayerCard(true), 500);
      const botCardTimer = setTimeout(() => setRevealBotCard(true), 1500);

      return () => {
        clearTimeout(playerCardTimer);
        clearTimeout(botCardTimer);
      };
    } else {
      setRevealPlayerCard(false);
      setRevealBotCard(false);
    }
  }, [cardsRevealed]);

  useEffect(() => {
    setIsWinnerBot(winningPlayer === "Bot" );
    setIsWinnerPlayer(winningPlayer === "You" );
  }, [winningPlayer]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Bot Player Info */}
      <PlayerInfo
        name="Bot"
        isBot={true}
        isCoinImage={false}
        coinAmount={currentBetAmount}
        amountPlacement={null}
        isWinner={isWinnerBot}
        isLooser={isWinnerPlayer}
      />

      {/* Bot Card */}
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

      {/* Player Card */}
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

      {/* Player Info */}
      <PlayerInfo
        name="You"
        avatar={require("../../assets/avatar.png")}
        isCoinImage={true}
        coinAmount={currentBetAmount}
        amountPlacement="bottom"
        isWinner={isWinnerPlayer}
        isLooser={isWinnerBot}
      />
    </div>
  );
};

export default PlayerCardSection;
