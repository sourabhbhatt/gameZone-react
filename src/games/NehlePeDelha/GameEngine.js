import fs from 'fs';

export class GameEngine {
  constructor(gameType) {
    this.gameLogic = null;
    this.loadGameLogic(gameType);
  }

  loadGameLogic(gameType) {
    try {
      const logicPath = `./gameRules/${gameType}.json`;
      const gameLogic = fs.readFileSync(logicPath, 'utf-8');
      this.gameLogic = JSON.parse(gameLogic);
    } catch (error) {
      throw new Error(`Failed to load game logic for ${gameType}: ${error.message}`);
    }
  }

  dealCards(players) {
    const cardsPerPlayer = this.gameLogic.rules.cardsPerPlayer;
    const deck = this.generateDeck();
    const shuffledDeck = this.shuffleDeck(deck);

    players.forEach(player => {
      player.hand = shuffledDeck.splice(0, cardsPerPlayer);
    });

    return players;
  }

  generateDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return suits.flatMap(suit => values.map(value => ({ suit, value })));
  }

  shuffleDeck(deck) {
    return deck.sort(() => Math.random() - 0.5);
  }

  determineWinner(players) {
    const rule = this.gameLogic.rules.determineWinner;

    if (rule.type === 'highCard') {
      return this.determineHighCardWinner(players, rule.tieBreaker);
    }

    // Add other rule types as needed
    throw new Error(`Unsupported rule type: ${rule.type}`);
  }

  determineHighCardWinner(players, tieBreaker) {
    const cardValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
      '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };

    const suitPriority = tieBreaker.suitPriority;

    let winner = null;

    players.forEach(player => {
      const playerCard = player.hand[0];

      // Determine if this player's card is higher
      if (
        !winner ||
        cardValues[playerCard.value] > cardValues[winner.hand[0].value] ||
        (cardValues[playerCard.value] === cardValues[winner.hand[0].value] &&
          suitPriority.indexOf(playerCard.suit) <
            suitPriority.indexOf(winner.hand[0].suit))
      ) {
        winner = player;
      }
    });

    return winner;
  }
}
