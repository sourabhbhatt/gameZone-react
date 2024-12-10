import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateWallet } from "../../redux/slices/userSlice";
import nehlePeDelhaLanding from "./assets/nehlePeDelhaLanding.png";
import {
  createDeck,
  shuffleDeck,
  dealHand,
  VALUES,
} from "../../components/Deck";
import PlayerInfo from "./PlayerInfo";
import CardFront from "../../components/CardFront";
import CardBack from "../../components/CardBack";
import GameHeader from "../../components/GameHeader";

const NehlePeDelhaGame = () => {
  const dispatch = useDispatch();

  const [botHand, setBotHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);

  const startGame = useCallback(() => {
    const newDeck = shuffleDeck(createDeck());
    setPlayerHand(dealHand(newDeck, 1));
    setBotHand(dealHand(newDeck, 1));
    setCardsRevealed(false);
    setWinner(null);
  }, []);

  const determineWinner = useCallback(() => {
    const playerCard = playerHand[0];
    const botCard = botHand[0];

    if (!playerCard || !botCard) return;

    const playerValue = VALUES.indexOf(playerCard.value);
    const botValue = VALUES.indexOf(botCard.value);
    console.log("playerValue", playerValue);
    console.log("botValue", botValue);

    if (playerValue > botValue) {
      setWinner("Player Wins!");
      dispatch(updateWallet(100));
    } else if (botValue > playerValue) {
      setWinner("Bot Wins!");
    } else {
      setWinner("It's a Tie!");
    }
  }, [playerHand, botHand, dispatch]);

  const revealCards = () => {
    setCardsRevealed(true);
    determineWinner();
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${nehlePeDelhaLanding})`,
      }}
    >
      <GameHeader showCrossIcon showSettingsIcon title="Nehle Pe Dehla" />

      <div className="flex flex-col items-center mt-6 space-y-6">
        <PlayerInfo name="Bot" isBot={true} />
        {cardsRevealed ? (
          <CardFront
            value={botHand[0]?.value}
            suit={botHand[0]?.suit}
            isPlayerCard={false}
          />
        ) : (
          <CardBack />
        )}

        {winner && (
          <div className="text-center text-lg font-semibold text-green-400">
            {winner}
          </div>
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
        <PlayerInfo name="You" avatar={require("../../assets/avatar.png")} />

        {!cardsRevealed ? (
          <button
            onClick={revealCards}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
          >
            Reveal Cards
          </button>
        ) : (
          <button
            onClick={startGame}
            className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default NehlePeDelhaGame;
