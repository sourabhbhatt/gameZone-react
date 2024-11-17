// src/components/GameCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ title, description, imageSrc, link, bgColor }) => {
    return (
            <Link to={link} className="w-full h-full block">
                <div className={`w-full h-full flex flex-col items-center p-4 rounded-lg shadow-md ${bgColor} hover:shadow-lg transition-shadow duration-200`}>
                    <div className="w-24 h-24 mb-4">
                        <img src={imageSrc} alt={`${title} icon`} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
                        <p className="text-sm text-gray-100">{description}</p>
                    </div>
                </div>
            </Link>
    );
};

export default GameCard;
