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

  const { creditBalance, debitBalance, getBalance, getHistory } =
    useSocketTransactions();

  const location = useLocation();
  const { entryFee } = location.state || {}; // Safely access the entryFee

  const [toalAmountForTheGame, setToalAmountForTheGame] = useState(
    JSON.parse(JSON.stringify(entryFee)) || 0
  );

  const [currentBetAmount, setCurrentBetAmount] = useState(0);
  const [botHand, setBotHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [winner, setWinner] = useState(null);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [isWinningModalOpen, setIsWinningModalOpen] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState(null); // "You" or "Bot"
  const [isExitModal, setIsExitModal] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [amountForPlayAgain, setAmountForPlayAgain] = useState(0);
  const [winLossAmount, setWinLossAmount] = useState(0);
  const [UUID, setUUID] = useState(null);

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

  const determineWinner = async () => {
    let updatedBetAmount = toalAmountForTheGame;
    try {
      const playerCard = playerHand[0];
      const botCard = botHand[0];
      getBalance();
      if (!playerCard || !botCard) return;
      if (playerCard.rank > botCard.rank) {
        console.log("step 01");
        if (musicEnabled) playSound("collectPoints");
        setWinner("You Won!");
        setWinningPlayer("You");
        updatedBetAmount += currentBetAmount;
        setToalAmountForTheGame(updatedBetAmount);
        await creditBalance(currentBetAmount, UUID);
        updateBetHistory("Won");
        setWinLossAmount(currentBetAmount);
      } else if (botCard.rank > playerCard.rank) {
        setWinner("You Lost!");
        setWinningPlayer("Bot");
        updatedBetAmount = Math.max(updatedBetAmount - currentBetAmount, 0);
        setToalAmountForTheGame(updatedBetAmount);
        updateBetHistory("Loss");
        setWinLossAmount(currentBetAmount);
      } else {
        setWinner("It's a Tie!");
        setWinningPlayer(null);
        updateBetHistory("Tie");
        setWinLossAmount(0);
      }
      setIsWinningModalOpen(true);
    } catch (error) {
      console.error("Error in determineWinner:", error);
    } finally {
      setCurrentBetAmount(
        updatedBetAmount >= amountForPlayAgain ? amountForPlayAgain : 0
      );
    }
  };

  const updateBetHistory = (status) => {
    const newHistory = {
      status: status,
      amount: currentBetAmount,
      betDetails: "Your bet: Matka 1 has odd number",
    };
    // setBetHistory((prev) => [newHistory, ...prev]);
  };

  let timeoutId;
  const revealCards = async () => {
    if (isRevealing) return;
    setCardsRevealed(true);
    setIsRevealing(true);
    if (musicEnabled) playSound("flip");
    setIsModalOpen(false);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      determineWinner();
      setIsRevealing(false);
    }, 3000);
  };

  const handleExitConfirm = () => navigate(-1);

  useEffect(() => {
    startGame();
  }, []);

  async function generateUUID() {
    const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
    setUUID(uuid);
    return uuid;
  }

  const onRevealCards = async () => {
    const localUuid = await generateUUID();
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
    await debitBalance(currentBetAmount, localUuid);
    setIsModalOpen(true);
  };

  const fetchHistory = useCallback(async () => {
    const { response, error } = await getHistory();
    if (error) {
      showToastMessage("error", "Failed to fetch history.");
    } else {
      setBetHistory(
        response?.map((el) => ({
          status: el?.won ? "Won" : "Loss",
          amount: el?.betAmount,
          betDetails: el?.description,
        })) || []
      );
      setIsHistoryOpen(true);
    }
  }, [getHistory]);

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

      {/* <PlayerInfoHeader currentBetAmount={currentBetAmount} /> */}
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
        setCurrentBetAmount={(val) => {
          setCurrentBetAmount(val);
          setAmountForPlayAgain(val);
        }}
        revealCards={onRevealCards}
        onViewHistory={() => fetchHistory()}
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
        winLossAmount={winLossAmount}
        onClose={() => {
          setIsWinningModalOpen(false);
          setCardsRevealed(false);
        }}
        onPlayAgain={() => {
          setIsWinningModalOpen(false);
          setWinningPlayer(null);
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
