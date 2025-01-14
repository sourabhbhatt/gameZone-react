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
import { useLocation } from "react-router-dom";
import { showToastMessage } from "../../utils";

const NehlePeDelhaGame = () => {
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user?.wallet);

  const { creditBalance, debitBalance, getBalance } = useSocketTransactions();

  const location = useLocation();
  const { entryFee } = location.state || {}; // Safely access the entryFee

  const [toalAmountForTheGame, setToalAmountForTheGame] = useState(
    JSON.parse(JSON.stringify(entryFee)) || 0
  );

  const [currentBetAmount, setCurrentBetAmount] = useState(
    JSON.parse(JSON.stringify(entryFee)) || 0
  );
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
  const [isRevealing, setIsRevealing] = useState(false);

  const isOnline = useSelector((state) => state.app.connectionStatus.isOnline);
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
    await getBalance();
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

  console.log("currentBetAmount", currentBetAmount);

  const determineWinner = async () => {
    console.log("determineWinner called");

    const playerCard = playerHand[0];
    const botCard = botHand[0];
    getBalance();
    if (!playerCard || !botCard) return;
    if (playerCard.rank > botCard.rank) {
      console.log("step 01");
      if (musicEnabled) playSound("collectPoints");
      setWinner("You Won!");
      setWinningPlayer("You");
      setToalAmountForTheGame((prev) => {
        console.log("prev amount", prev, currentBetAmount);
        return prev + currentBetAmount;
      });
      await creditBalance(currentBetAmount);
      updateBetHistory("Won");
    } else if (botCard.rank > playerCard.rank) {
      console.log("step 02");
      setWinner("You Lost!");
      setWinningPlayer("Bot");
      setToalAmountForTheGame((prev) => {
        if (prev > 0) return prev - currentBetAmount;
        return 0;
      });
      updateBetHistory("Loss");
    } else {
      setWinner("It's a Tie!");
      setWinningPlayer("");
      updateBetHistory("Tie");
    }
    setIsWinningModalOpen(true);
    setCurrentBetAmount(0);
  };

  const updateBetHistory = (status) => {
    const newHistory = {
      status: status,
      amount: currentBetAmount,
      betDetails: "Your bet: Matka 1 has odd number",
    };
    setBetHistory((prev) => [newHistory, ...prev]);
  };

  let timeoutId;

  const revealCards = async () => {
    if (isRevealing) return; // Prevent multiple calls
    setIsRevealing(true);

    if (musicEnabled) playSound("flip");
    setCardsRevealed(true);
    setIsModalOpen(false);

    clearTimeout(timeoutId); // Clear previous timeout
    timeoutId = setTimeout(() => {
      determineWinner();
      setIsRevealing(false); // Allow future calls
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

  const onRevealCards = async () => {
    if (!isOnline) {
      showToastMessage(
        "error",
        "You are offline. Please check your internet connection."
      );
      return;
    }
    if (toalAmountForTheGame < currentBetAmount && currentBetAmount !== 0) {
      showToastMessage(
        "error",
        "Insufficient funds! Please ensure your betting amount meets the required minimum for the game."
      );
      return;
    }

    if (currentBetAmount > walletAmount) {
      showToastMessage("error", "Insufficient balance to place the bet.");
      return;
    }
    await debitBalance(currentBetAmount);
    setIsModalOpen(true);
  };

  return (
    <div
      className="relative bg-[#0F0529] flex flex-col items-center justify-between 
    h-[100vh] overflow-y-auto text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${LobbyBg})`, backgroundSize: "cover" }}
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
        playingBetAmount={toalAmountForTheGame}
        currentBetAmount={currentBetAmount}
        setCurrentBetAmount={setCurrentBetAmount}
        revealCards={onRevealCards}
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
        onClose={() => setIsExitModal(true)}
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
  );
};

export default NehlePeDelhaGame;
