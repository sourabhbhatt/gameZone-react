// src/components/CardGames/TeenPatti/TeenPatti.js
import React, { useState, useEffect } from "react";
import GameBoard from "../../components/GameBoard";
import PlayerHand from "../../components/PlayerHand";
import DiscardPile from "../../components/DiscardPile";
import { createDeck, shuffleDeck, dealHand, VALUES } from "../../components/Deck";

const TeenPatti = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [walletMoney, setWalletMoney] = useState(10000);
  const [betAmount, setBetAmount] = useState(100);
  const [gameStatus, setGameStatus] = useState("Ready to play");

  // Define players and teams for the game
  const players = [
    { id: 1, name: "Player 1", profilePic: "player1.jpg", hand: [] },
    { id: 2, name: "Player 2", profilePic: "player2.jpg", hand: [] },
    { id: 3, name: "Player 3", profilePic: "player3.jpg", hand: [] },
    { id: 4, name: "Player 4", profilePic: "player4.jpg", hand: [] },
  ];

  useEffect(() => {
    // Initialize a shuffled deck on component mount
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  }, []);

  const startGame = () => {
    if (walletMoney < betAmount) {
      setGameStatus("Not enough money to place the bet.");
      return;
    }

    setGameStatus("Dealing cards...");
    setWinner(null);

    // Reset and shuffle the deck
    const newDeck = shuffleDeck([...deck]);
    setDeck(newDeck);

    // Deal cards to each player
    players.forEach((player, index) => {
      player.hand = dealHand(newDeck, 3);
    });

    // Set hands for display purposes
    setPlayerHand(players[0].hand);
    setOpponentHand(players[1].hand);

    // Calculate and display the score for winner determination
    const playerScore = calculateScore(players[0].hand);
    const opponentScore = calculateScore(players[1].hand);

    if (playerScore > opponentScore) {
      setWinner("Player Wins!");
      setWalletMoney(walletMoney + betAmount);
    } else if (opponentScore > playerScore) {
      setWinner("Opponent Wins!");
      setWalletMoney(walletMoney - betAmount);
    } else {
      setWinner("It's a Tie!");
    }

    setGameStatus("Game Over");
  };

  const calculateScore = (hand) => {
    return hand.reduce((acc, card) => acc + VALUES.indexOf(card.value), 0);
  };

  const handleBetChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setBetAmount(amount > 0 ? amount : 0);
  };

  return (
    <GameBoard
      walletMoney={walletMoney}
      bootAmount={50}
      maxChaal={500}
      maxBlind={100}
      maxPot={5000}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Top player (Opponent) */}
        <div className="flex justify-center items-center">
          <PlayerHand
            player={players[1]}
            isCurrentPlayer={false}
            onPlayCard={() => {}}
          />
        </div>

        {/* Discard pile */}
        <div className="flex justify-center items-center">
          <DiscardPile currentTrick={[]} />
        </div>

        {/* Bottom player (User) */}
        <div className="flex justify-center items-center">
          <PlayerHand
            player={players[0]}
            isCurrentPlayer={true}
            onPlayCard={() => {}}
          />
        </div>
      </div>

      {/* Game controls */}
      <div className="text-center mt-6">
        <button
          onClick={startGame}
          className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          Deal Cards
        </button>
        <input
          type="number"
          value={betAmount}
          onChange={handleBetChange}
          className="px-2 py-1 border border-gray-300 rounded text-center mx-4"
          min="0"
          placeholder="Enter Bet Amount"
        />
      </div>

      {/* Game Status */}
      {gameStatus && (
        <p className="text-lg text-yellow-300 mt-4">{gameStatus}</p>
      )}

      {/* Winner Announcement */}
      {winner && <h2 className="text-3xl font-bold text-yellow-300 mt-8">{winner}</h2>}
    </GameBoard>
  );
};

export default TeenPatti;
