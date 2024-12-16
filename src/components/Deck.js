// src/components/CardGames/Deck.js
export const SUITS = ["♠", "♥", "♦", "♣"];

// Key-Value pairs for card values, where A (Ace) is the highest card
export const VALUES = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14, // Ace is the highest
};

// Create a deck of cards
export const createDeck = () => {
  const deck = [];
  for (let suit of SUITS) {
    for (let value in VALUES) {
      deck.push({ suit, value, rank: VALUES[value] });
    }
  }
  return deck;
};

// Shuffle the deck of cards
export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Deal a hand of cards
export const dealHand = (deck, handSize = 3) => deck.splice(0, handSize);
