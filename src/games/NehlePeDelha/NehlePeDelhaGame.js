import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LobbyBg from "./assets/LobbyBg.png";
import BottomSection from "./BottomSection";
import PlayerInfoHeader from "./PlayerInfoHeader";
import PlayerCardSection from "./PlayerCardSection";
import GameHeader from "../../components/GameHeader";
import CountdownRevealModal from "./CountdownRevealModal";
import BetHistoryModal from "./BetHistoryModal";
import WinningModal from "./WinningModal";
import { updateWallet } from "../../redux/slices/userSlice";
import { createDeck, shuffleDeck, dealHand } from "../../components/Deck";

const NehlePeDelhaGame = () => {
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user?.wallet);

  const [currentBetAmount, setCurrentBetAmount] = useState(10);
  const [botHand, setBotHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [isWinningModalOpen, setIsWinningModalOpen] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState(""); // "You" or "Bot"

  // Function to start the game
  const startGame = useCallback(() => {
    dispatch(updateWallet(walletAmount - currentBetAmount));
    const newDeck = shuffleDeck(createDeck());
    setPlayerHand(dealHand(newDeck, 1));
    setBotHand(dealHand(newDeck, 1));
    setCardsRevealed(false);
    setWinner(null);
    setIsWinningModalOpen(false);
  }, []);

  // Function to determine the winner based on card rank
  const determineWinner = useCallback(() => {
    const playerCard = playerHand[0];
    const botCard = botHand[0];

    if (!playerCard || !botCard) return;

    if (playerCard.rank > botCard.rank) {
      setWinner("You Won!");
      setWinningPlayer("You");
      dispatch(updateWallet(currentBetAmount * 2));
      updateBetHistory("Won");
    } else if (botCard.rank > playerCard.rank) {
      setWinner("You Lost!");
      setWinningPlayer("Bot");
      updateBetHistory("Loss");
    } else {
      setWinner("It's a Tie!");
      setWinningPlayer("");
      updateBetHistory("Tie");
    }
    setIsWinningModalOpen(true);
  }, [playerHand, botHand, dispatch, currentBetAmount]);

  // Update bet history dynamically
  const updateBetHistory = (status) => {
    const newHistory = {
      status: status,
      amount: currentBetAmount,
      betDetails: "Your bet: Matka 1 has odd number",
    };
    setBetHistory((prev) => [newHistory, ...prev]);
  };

  // Reveal cards and determine winner
  const revealCards = () => {
    setCardsRevealed(true);
    setIsModalOpen(false);
    determineWinner();
  };

  // Automatically start the game on component mount
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
        onViewHistory={() => setIsHistoryOpen(true)}
        winner={winner}
        disabled={cardsRevealed}
      />

      <CountdownRevealModal
        isOpen={isModalOpen}
        onReveal={revealCards}
        onClose={() => setIsModalOpen(false)}
      />

      <BetHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        betHistory={betHistory}
      />

      <WinningModal
        isOpen={isWinningModalOpen}
        onPlayAgain={() => {
          setIsWinningModalOpen(false);
          startGame();
        }}
        winnerName={winningPlayer || "It's a Tie!"}
      />
    </div>
  );
};

export default NehlePeDelhaGame;
