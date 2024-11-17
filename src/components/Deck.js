// src/components/CardGames/Deck.js
export const SUITS = ["♠", "♥", "♦", "♣"];
export const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const createDeck = () => {
    const deck = [];
    for (let suit of SUITS) {
        for (let value of VALUES) {
            deck.push({ suit, value });
        }
    }
    return deck;
};

export const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

export const dealHand = (deck, handSize = 3) => deck.splice(0, handSize);
