import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import LobbyBg from "./assets/LobbyBg.png";
import BottomSection from "./BottomSection";
import PlayerInfoHeader from "./PlayerInfoHeader";
import PlayerCardSection from "./PlayerCardSection";
import GameHeader from "../../components/GameHeader";
import CountdownRevealModal from "./CountdownRevealModal";
import { updateWallet } from "../../redux/slices/userSlice";
import {
  createDeck,
  shuffleDeck,
  dealHand,
  VALUES,
} from "../../components/Deck";

const NehlePeDelhaGame = () => {
  const dispatch = useDispatch();
  const [currentBetAmount, setCurrentBetAmount] = useState(10);
  const [botHand, setBotHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
    determineWinner();
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${LobbyBg})` }}
    >
      <GameHeader showCrossIcon showSettingsIcon title="Nehle Pe Dehla" />
      <PlayerInfoHeader currentBetAmount={currentBetAmount} />
      <PlayerCardSection
        botHand={botHand}
        playerHand={playerHand}
        cardsRevealed={cardsRevealed}
        currentBetAmount={currentBetAmount}
      />
      <BottomSection
        currentBetAmount={currentBetAmount}
        setCurrentBetAmount={setCurrentBetAmount}
        revealCards={() => setIsModalOpen(true)}
        winner={winner}
        disabled={cardsRevealed}
      />

      <CountdownRevealModal
        isOpen={isModalOpen}
        onReveal={revealCards}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default NehlePeDelhaGame;
