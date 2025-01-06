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

import clickSound from "./audio/click.mp3";
import flip from "./audio/flip.mp3";
import collectPointsSound from "./audio/coinsEarned.mp3";
import useSoundEffects from "../../hooks/useSoundEffects";
import ExitModal from "./ExitModal";
import { useNavigate } from "react-router-dom";
import useSocketTransactions from "./hooks/useSocket";
import { useLocation } from 'react-router-dom';
import { showToastMessage } from "../../utils";



const NehlePeDelhaGame = () => {
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user?.wallet);

  const { creditBalance, debitBalance, getBalance } = useSocketTransactions();

  const location = useLocation();
  const { entryFee } = location.state || {}; // Safely access the entryFee

  const [currentBetAmount, setCurrentBetAmount] = useState(entryFee || 0);
  const [botHand, setBotHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [isWinningModalOpen, setIsWinningModalOpen] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState(""); // "You" or "Bot"
  const [isExitModal, setIsExitModal] = useState(false);

  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  const { initializeSound, playSound, updateSound } = useSoundEffects();
  const navigate = useNavigate();

  useEffect(() => {
    initializeSound("click", clickSound, { volume: soundVolume / 100 });
    initializeSound("flip", flip, { volume: musicVolume / 100 });
    initializeSound("collectPoints", collectPointsSound, {
      volume: musicVolume / 100,
    });
  }, [document.visibilityState === "visible"]);

  const startGame = useCallback(async () => {
    await getBalance()
    if (walletAmount < currentBetAmount) {
      showToastMessage("error", "Insufficient balance to place the bet.");
    }
    // dispatch(updateWallet(walletAmount - currentBetAmount));
    const newDeck = shuffleDeck(createDeck());
    setPlayerHand(dealHand(newDeck, 1));
    setBotHand(dealHand(newDeck, 1));
    setCardsRevealed(false);
    setWinner(null);
    setIsWinningModalOpen(false);
  }, [dispatch, walletAmount, currentBetAmount]);

  const determineWinner = useCallback(async () => {
    const playerCard = playerHand[0];
    const botCard = botHand[0];
    getBalance()

    if (!playerCard || !botCard) return;

    if (playerCard.rank > botCard.rank) {
      if (musicEnabled) playSound("collectPoints");
      setWinner("You Won!");
      setWinningPlayer("You");
      // dispatch(updateWallet(currentBetAmount * 2));
      updateBetHistory("Won");
      console.log(">>>>>>>")
      await creditBalance(currentBetAmount * 2);
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
    setCurrentBetAmount(0);
  }, [playerHand, botHand, dispatch, currentBetAmount]);

  const updateBetHistory = (status) => {
    const newHistory = {
      status: status,
      amount: currentBetAmount,
      betDetails: "Your bet: Matka 1 has odd number",
    };
    setBetHistory((prev) => [newHistory, ...prev]);
  };

  const revealCards = async () => {
    if (musicEnabled) playSound("flip");
    setCardsRevealed(true);
    setIsModalOpen(false);
    setTimeout(() => {
      determineWinner();
    }, 1000);
  };

  const handleExitConfirm = () => {
    navigate(-1);
  };

  // console.log('playerHand', playerHand);
  // console.log('botHand', botHand);
  // console.log('shuffleDeck(createDeck())::::', shuffleDeck(createDeck()));


  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="relative bg-[#0F0529] ">
      <div
        className="flex flex-col items-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${LobbyBg})`,
          backgroundSize: 'cover',
        }}
      >

        <GameHeader
          themeConfig={{
            bg: "#ffffff",
            switchTogglerEnabledColor: "#2E1A4D",
            switchTogglerDisabledColor: "gray",
            barColor: "#7A7A7A",
            titleColor: "#000000",
            headingColor: "#000000",
          }}
          showCrossIcon
          onBack={() => setIsExitModal(true)}
          showSettingsIcon
          title="Nehle Pe Dehla"
        />
        <PlayerInfoHeader currentBetAmount={currentBetAmount} />
        <PlayerCardSection
          botHand={botHand}
          playerHand={playerHand}
          cardsRevealed={cardsRevealed}
          currentBetAmount={currentBetAmount}
          winningPlayer={winningPlayer}
        />
        <BottomSection
          walletAmount={walletAmount}
          currentBetAmount={currentBetAmount}
          setCurrentBetAmount={setCurrentBetAmount}
          revealCards={async () => {
            if (currentBetAmount > walletAmount) {
              console.log("??", currentBetAmount, walletAmount, currentBetAmount > walletAmount);
              showToastMessage("error", "Insufficient balance to place the bet.");
              return;
            }
            await debitBalance(currentBetAmount);
            setIsModalOpen(true);
          }}
          onViewHistory={() => setIsHistoryOpen(true)}
          winner={winner}
          disabled={cardsRevealed}
        />

        <CountdownRevealModal isOpen={isModalOpen} onReveal={revealCards} />

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

        <ExitModal
          isOpen={isExitModal}
          onClose={() => setIsExitModal(false)}
          onConfirm={handleExitConfirm}
        />
      </div>
    </div>
  );
};

export default NehlePeDelhaGame;
