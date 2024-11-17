import React, { useState } from "react";
import GameBoard from "../../components/GameBoard";
import PlayerHand from "../../components/PlayerHand";
import { useSelector, useDispatch } from "react-redux";
import { updateWallet } from "../../redux/slices/userSlice";
import { createDeck, shuffleDeck, dealHand, VALUES } from "../../components/Deck";

const NehlePeDelha = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.user.wallet);
    const userDetails = useSelector((state) => state.user.userDetails);
    
    const [deck, setDeck] = useState(shuffleDeck(createDeck()));
    const [botHand, setBotHand] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [winner, setWinner] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        if (wallet < 50) {
            alert("Not enough money to start the game!");
            return;
        }

        // Deduct money from the player's wallet
        dispatch(updateWallet(-50));

        // Shuffle deck and deal one card to each player
        const newDeck = shuffleDeck(createDeck());
        setDeck(newDeck);
        setPlayerHand(dealHand(newDeck, 1));
        setBotHand(dealHand(newDeck, 1));
        setGameStarted(true);
        setWinner(null);
    };

    const determineWinner = () => {
        const playerCard = playerHand[0];
        const botCard = botHand[0];

        const playerValue = VALUES.indexOf(playerCard.value);
        const botValue = VALUES.indexOf(botCard.value);

        if (playerValue > botValue) {
            setWinner("Player Wins!");
            dispatch(updateWallet(100)); // Add winnings
        } else if (botValue > playerValue) {
            setWinner("Bot Wins!");
        } else {
            setWinner("It's a Tie!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
            <GameBoard walletMoney={wallet}>
                {/* Display Player and Bot */}
                <div className="grid grid-cols-2 gap-8 items-center">
                    {/* Player */}
                    <PlayerHand
                        player={{
                            id: userDetails.id,
                            name: userDetails.name,
                            profilePic: userDetails.profilePic,
                            hand: playerHand,
                        }}
                        isCurrentPlayer={gameStarted}
                        onPlayCard={determineWinner}
                    />

                    {/* Bot */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-bold mb-2">Bot</h2>
                        <div className="w-[60px] h-[90px] bg-gray-400 border border-gray-600 rounded-lg shadow-md flex justify-center items-center">
                            <span className="text-gray-500 text-sm">Folded</span>
                        </div>
                    </div>
                </div>
            </GameBoard>

            {/* Start Game Button */}
            {!gameStarted && (
                <button
                    onClick={startGame}
                    className="mt-8 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                >
                    Start Game
                </button>
            )}

            {/* Winner Announcement */}
            {winner && (
                <div className="mt-6 text-lg font-bold text-green-600">{winner}</div>
            )}
        </div>
    );
};

export default NehlePeDelha;
