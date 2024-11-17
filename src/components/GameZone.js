// src/components/GameZone.js
import React from 'react';
import GameCard from './GameCard';

// Import placeholder images/icons for each game (Replace these with actual paths)
import ludoIcon from '../assets/typing.jpg';
import minesweeperIcon from '../assets/tic-tac-toe.jpg';
import fruitNinjaIcon from '../assets/tic-tac-toe.jpg';
import ticTacToeIcon from '../assets/tic-tac-toe.jpg';
import teenPattiIcon from '../assets/tic-tac-toe.jpg';
import nehlePeDelha from '../assets/nehlePeDelha.webp';

const GameZone = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
                <GameCard
                    title="Teen patti"
                    description="Explore classic card games like Teen Patti and more."
                    imageSrc={teenPattiIcon}
                    link="/TeenPatti"
                    bgColor="bg-blue-500"
                />
                <GameCard
                    title="Nehle Pe Delha"
                    description="Nehle Pe Delha..." 
                    imageSrc={nehlePeDelha}
                    link="/NehlePeDelha"
                    bgColor="bg-blue-500"
                />
                <GameCard
                    title="Play Ludo"
                    description="A classic board game where you race to the finish!"
                    imageSrc={ludoIcon}
                    link="/ludo"
                    bgColor="bg-blue-500"
                />
                <GameCard
                    title="Play Minesweeper"
                    description="Test your skills in this logic-based puzzle game."
                    imageSrc={minesweeperIcon}
                    link="/minesweeper"
                    bgColor="bg-green-500"
                />
                <GameCard
                    title="Play Fruit Ninja"
                    description="Swipe and slice your way through delicious fruit!"
                    imageSrc={fruitNinjaIcon}
                    link="/fruit-ninja"
                    bgColor="bg-red-500"
                />
                <GameCard
                    title="Tic Tac Toe"
                    description="Enjoy the classic game of Xs and Os."
                    imageSrc={ticTacToeIcon}
                    link="/TicTacToe"
                    bgColor="bg-purple-500"
                />
            </div>
        </div>
    );
};

export default GameZone;
