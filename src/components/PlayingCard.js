// src/components/CardGames/PlayingCard.js
import React from 'react';

const PlayingCard = ({ suit, value, isAdCard = false, disabled = false }) => {
    const isRed = suit === "♥" || suit === "♦";
    const cardClass = isRed ? "text-red-600" : "text-black";

    if (isAdCard) {
        return (
            <div
                className={`relative h-[90px] w-[60px] bg-gray-200 rounded-lg shadow-lg border border-gray-300 overflow-hidden ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <div className="absolute inset-1 border-4 border-gray-400 rounded-md"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-1 overflow-hidden">
                    <span
                        className="text-gray-500 leading-none text-xs"
                        style={{
                            fontSize: "clamp(6px, 1.5vw, 8px)",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        Your Ad Here
                    </span>
                    <span
                        className="text-gray-500 leading-none text-[8px] mt-1"
                        style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            fontSize: "clamp(6px, 1.3vw, 6px)",
                        }}
                    >
                        Click to learn more
                    </span>
                </div>
            </div>
        );
    }

    if (!suit) {
        return (
            <div
                className={`relative h-[90px] w-[60px] bg-gray-200 rounded-lg shadow-lg border border-gray-300 overflow-hidden ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <div className="absolute inset-1 border-4 border-gray-400 rounded-md"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex justify-center items-center">
                            <span
                                className="text-xl text-gray-500 opacity-30 transform rotate-45 relative strike-through"
                                style={{
                                    fontFamily: "serif",
                                    letterSpacing: "0.1em",
                                    textDecoration: "line-through",
                                }}
                            >
                                S
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Regular Card with suit and value
    return (
        <div
            className={`relative h-[90px] w-[60px] bg-white rounded-lg shadow-md border border-gray-300 flex flex-col justify-between items-center p-1 text-sm font-bold transition-transform duration-200 ${cardClass} ${
                disabled
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:border-yellow-400 hover:translate-y-[-5px]"
            }`}
        >
            {/* Top-left value and suit in column */}
            <div className="absolute top-[2px] left-[2px] flex flex-col items-start text-xs">
                <span>{value}</span>
                <span>{suit}</span>
            </div>

            {/* Center suit with low opacity */}
            <span className="absolute inset-0 flex justify-center items-center text-4xl opacity-10">
                {suit}
            </span>

            {/* Bottom-right value and suit (flipped for realism) in column */}
            <div className="absolute bottom-[2px] right-[2px] flex flex-col items-end text-xs transform rotate-180">
                <span>{value}</span>
                <span>{suit}</span>
            </div>
        </div>
    );
};

export default PlayingCard;
