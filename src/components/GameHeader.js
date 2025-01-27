import React, { memo, useCallback, useState } from "react";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaTimes, FaEllipsisV, FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { formatINRLocale } from '../utils'
import close from "../assets/Close.png";
import settings from "../assets/settings.png";
const defultThemeConfig = {
  bg: "#5C59F1",
  switchTogglerEnabledColor: "gray",
  switchTogglerDisabledColor: "gray",
  barColor: "gray",
  titleColor: "#ffffff",
  headingColor: "#ffffff",
};

const GameHeader = memo(
  ({
    title,
    onBack,
    onMenuClick,
    isBackButton = true,
    menuButton = true,
    showCrossIcon = false,
    showSettingsIcon = false,
    bgColor = null,
    bgImage = null,
    themeConfig = defultThemeConfig,
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
      ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
      : bgColor
        ? { backgroundColor: bgColor }
        : {};

    return (
      <div
        className="relative flex items-center justify-between w-screen px-4 py-3"
        style={backgroundStyle}
      >
        {/* Back Button */}
        {!!isBackButton && <button
          onClick={onBackPress}
          className="text-2xl text-white flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-xl"
        >
          {showCrossIcon ? <img src={close} alt="Close" className="w-6 h-6 object-contain" /> : <FaAngleLeft />}
        </button>}

        {!!title ? (
          <h1 className="flex-1 text-center text-sm font-bold text-white">
            {title}
          </h1>
        ) : (
          <div className="flex-1"></div> // Keeps layout balanced when no title
        )}

        <div className="flex items-center space-x-3">
          {!title && (
            <div className="flex items-center px-3 py-1 bg-white bg-opacity-10 rounded-full">
              <img
                src={images.coin}
                alt="Coin"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-2 text-lg font-bold text-white">
                {formatINRLocale(amountOnWallet)}
              </span>
            </div>
          )}
          {!!menuButton && (
            <button
              onClick={onMenuPress}
              className="text-2xl text-white flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-xl"

            >
              {showSettingsIcon ? <img src={settings} alt="Settings" className="w-6 h-6 object-contain" /> : <FaEllipsisV />}
            </button>
          )}
        </div>

        {/* Settings Modal */}
        <SettingsModal
          themeConfig={themeConfig}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    );
  }
);

export default GameHeader;
