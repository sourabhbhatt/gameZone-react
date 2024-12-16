import React, { memo, useCallback, useState } from "react";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaTimes, FaEllipsisV, FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import { images } from "../assets/images";

const GameHeader = memo(
  ({
    title,
    onBack,
    onMenuClick,
    menuButton = true,
    showCrossIcon = false,
    showSettingsIcon = false,
    bgColor = null,
    bgImage = null,
  }) => {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Modal visibility
    const amountOnWallet = useSelector((state) => state.user?.wallet);

    const onBackPress = useCallback(() => {
      if (onBack) onBack();
      else navigate(-1);
    }, [navigate, onBack]);

    const onMenuPress = useCallback(() => {
      if (onMenuClick) onMenuClick();
      else setIsSettingsOpen((p) => !p);
    }, [onMenuClick, setIsSettingsOpen]);

    // Dynamic Background Style
    const backgroundStyle = bgImage
      ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
      : bgColor
      ? { backgroundColor: bgColor }
      : {};

    return (
      <div
        className="flex items-center justify-between w-full px-4 py-3"
        style={backgroundStyle}
      >
        {/* Back Button */}
        <button
          onClick={onBackPress}
          className="text-2xl text-white flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-full"
        >
          {showCrossIcon ? <FaTimes /> : <FaAngleLeft />}
        </button>

        {/* Title */}
        {title ? (
          <h1 className="flex-1 text-center text-lg font-bold text-white">
            {title}
          </h1>
        ) : (
          <div className="flex-1"></div> // Keeps layout balanced when no title
        )}

        {/* Wallet and Menu Section */}
        <div className="flex items-center space-x-3">
          {!title && amountOnWallet && (
            <div className="flex items-center px-3 py-1 bg-white bg-opacity-10 rounded-full">
              <img
                src={images.coin}
                alt="Coin"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-2 text-lg font-bold text-white">
                {amountOnWallet}
              </span>
            </div>
          )}
          {!!menuButton && (
            <button
              onClick={onMenuPress}
              className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-full text-white text-2xl"
            >
              {showSettingsIcon ? <FaCog /> : <FaEllipsisV />}
            </button>
          )}
        </div>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    );
  }
);

export default GameHeader;
