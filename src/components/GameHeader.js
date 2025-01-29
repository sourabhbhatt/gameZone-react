import React, { memo, useCallback, useState } from "react";
import SettingsModal from "./SettingsModal";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaEllipsisV, FaCog } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { images } from "../assets/images";
import { formatINRLocale } from "../utils";
import cross2 from "../assets/Close.png";
import settings from "../assets/settings.png";
const defultThemeConfig = {
  bg: "#5C59F1",
  gradientBg: ["#4A2574", "#B277F5"],
  switchTogglerEnabledColor: "gray",
  switchTogglerDisabledColor: "gray",
  barColor: "gray",
  titleColor: "#ffffff",
  headingColor: "#ffffff",
  thumbEnabledColor: "#ffffff",
  thumbDisabledColor: "#ffffff",
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
    className = "",
    isGameScreen = false,
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
        className={`flex items-center justify-between w-full px-4 py-3 ${className}`}
        style={backgroundStyle}
      >
        {/* Back Button */}
        {!!isBackButton && (
          <button
            onClick={onBackPress}
            className={`text-4xl text-white flex items-center justify-center 
              w-[32px] h-[32px] bg-black bg-opacity-20 rounded-full border-[1px] border-[#0000001A] ${
                isBackButton ? "rounded-md" : "rounded-full"
              }
                ${isGameScreen ? "bg-white/10" : "bg-[#616161]"}
              `}
          >
            {showCrossIcon ? <img src={cross2} alt="cross" className="w-[26px] h-[26px] opacity-90" /> : <FaAngleLeft />}
          </button>
        )}

        {!!title ? (
          <h1 className="flex-1 text-center tracking-[2px] text-[12px] line-height-[16px] ml-[25px] font-bold font-outfit text-white">
            {title}
          </h1>
        ) : (
          <div className="flex-1"></div> // Keeps layout balanced when no title
        )}

        <div className="flex items-center space-x-3">
          {!title && (
            <div
              className={`flex items-center px-3 py-1 rounded-full ${
                isGameScreen ? "bg-white/10" : "bg-[#0000009E]"
              }`}
            >
              <img
                src={images.coin}
                alt="Coin"
                className="w-5 h-5 object-contain"
              />
              <span className="ml-2 text-lg font-bold text-white font-outfit">
                {formatINRLocale(amountOnWallet)}
              </span>
            </div>
          )}
          {!!menuButton && (
            <button
              onClick={onMenuPress}
              className={`text-4xl text-white flex items-center justify-center 
              w-[32px] h-[32px] bg-black bg-opacity-20 rounded-full border-[1px] border-[#0000001A] ${
                  isGameScreen ? "bg-white/10" : "bg-[#0000009E]"
                } ${
                  isBackButton ? "rounded-md" : "rounded-full"
                }`}
            >
              {showSettingsIcon ? (
               <img src={settings} alt="settings" className="w-[18px] h-[18px]" />
              ) : (
                <FaEllipsisV className="w-[18px] h-[18px]" />
              )}
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
