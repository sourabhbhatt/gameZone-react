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

  // State management
  const [botHand, setBotHand] = useState([]); // Bot's card
  const [playerHand, setPlayerHand] = useState([]); // Player's card
  const [winner, setWinner] = useState(null); // Winner of the game
  const [cardsRevealed, setCardsRevealed] = useState(false); // Whether cards are revealed

  // Helper function to start the game
  const startGame = useCallback(() => {
    const newDeck = shuffleDeck(createDeck()); // Create and shuffle a new deck
    setPlayerHand(dealHand(newDeck, 1)); // Deal one card to the player
    setBotHand(dealHand(newDeck, 1)); // Deal one card to the bot
    setCardsRevealed(false); // Reset revealed state
    setWinner(null); // Reset winner
  }, []);

  // Helper function to determine the winner
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
      dispatch(updateWallet(100)); // Add winnings to player's wallet
    } else if (botValue > playerValue) {
      setWinner("Bot Wins!");
    } else {
      setWinner("It's a Tie!");
    }
  }, [playerHand, botHand, dispatch]);

  // Reveal cards and determine the winner
  const revealCards = () => {
    setCardsRevealed(true);
    determineWinner();
  };

  // Automatically start the game on the first load
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
      {/* Game Header */}
      <GameHeader showCrossIcon showSettingsIcon title="Nehle Pe Dehla" />

      {/* Game Board */}
      <div className="flex flex-col items-center mt-6 space-y-6">
        {/* Bot Info and Card */}
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

        {/* Game Status */}
        {winner && (
          <div className="text-center text-lg font-semibold text-green-400">
            {winner}
          </div>
        )}

        {/* Player Info and Card */}
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

        {/* Action Buttons */}
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
