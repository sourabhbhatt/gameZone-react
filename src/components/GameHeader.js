import React, { memo, useCallback, useState } from "react";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
import {
  FaBitcoin,
  FaAngleLeft,
  FaTimes,
  FaEllipsisV,
  FaCog,
} from "react-icons/fa";

const GameHeader = memo(
  ({
    title,
    walletAmount,
    onBack,
    onMenuClick,
    showCrossIcon = false,
    showSettingsIcon = false,
  }) => {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Modal visibility

    const onBackPress = useCallback(() => {
      if (onBack) onBack();
      else navigate(-1);
    }, [navigate, onBack]);

    const onMenuPress = useCallback(() => {
      if (onMenuClick) onMenuClick();
      else setIsSettingsOpen((p) => !p);
    }, [onMenuClick, setIsSettingsOpen]);

    return (
      <div className="flex items-center justify-between w-full px-4 py-3">
        {/* Back or Cross Icon */}
        <button
          onClick={onBackPress}
          className="text-2xl text-white flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-full"
        >
          {showCrossIcon ? <FaTimes /> : <FaAngleLeft />}
        </button>

        {/* Title (Only Visible if Available) */}
        {title ? (
          <h1 className="flex-1 text-center text-lg font-bold text-white">
            {title}
          </h1>
        ) : (
          <div className="flex-1"></div> // Keeps layout balanced when no title
        )}

        {/* Wallet and Menu Section */}
        <div className="flex items-center space-x-3">
          {/* Wallet Amount */}
          {!title && (
            <div className="flex items-center px-3 py-1 bg-white bg-opacity-10 rounded-full">
              <FaBitcoin className="text-yellow-500 text-lg" />
              <span className="ml-2 text-lg font-bold text-white">
                {walletAmount}
              </span>
            </div>
          )}

          {/* Menu Button */}
          <button
            onClick={onMenuPress}
            className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-full text-white text-2xl"
          >
            {showSettingsIcon ? <FaCog /> : <FaEllipsisV />}
          </button>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    );
  }
);

export default GameHeader;
