import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ title, description, imageSrc, link, bgColor }) => {
  return (
    <Link to={link}>
      <div
        className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${bgColor} hover:bg-opacity-80`}
      >
        <img
          src={imageSrc}
          alt={`${title} game icon`}
          className="w-20 h-20 rounded-lg mb-3"
        />
        <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
        <p className="text-xs text-white text-center">{description}</p>
      </div>
    </Link>
  );
};

// Default Props for GameCard
GameCard.defaultProps = {
  title: "Game",
  description: "Enjoy this fun game.",
  imageSrc: "",
  link: "/",
  bgColor: "bg-gray-500",
};

export default React.memo(GameCard);
