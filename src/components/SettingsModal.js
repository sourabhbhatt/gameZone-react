import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSound,
  toggleMusic,
  setSoundVolume,
  setMusicVolume,
} from "../redux/slices/appSlice";
import "../App.css";
import { images } from "../assets/images";

const defultThemeConfig = {
  bg: "#5C59F1",
  gradientBg: [],
  switchTogglerEnabledColor: "gray",
  switchTogglerDisabledColor: "gray",
  barColor: "gray",
  titleColor: "#ffffff",
  headingColor: "#ffffff",
  thumbEnabledColor: "#ffffff",
  thumbDisabledColor: "#ffffff",
};

const SettingsModal = ({
  themeConfig = defultThemeConfig,
  isOpen = false,
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <motion.div
      className={`fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: "-50%", scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "-50%", scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-80 p-6 rounded-[32px] shadow-lg"
        style={{
          background:
            Array.isArray(themeConfig?.gradientBg) &&
            themeConfig?.gradientBg.length > 0
              ? `linear-gradient(${themeConfig.gradientBg.join(", ")})`
              : themeConfig?.bg || "#ffffff",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-[34px] left-[22px] text-xl hover:text-black`}
          style={{ color: themeConfig.headingColor }}
        >
          <img src={images.cross} className="h-[26px] w-[26px]" />
        </button>

        {/* Modal Title */}
        <h2
          style={{ color: themeConfig.headingColor }}
          className={`text-center text-[16px] font-outfit font-semibold mt-[10px] mb-[30px]`}
        >
          {"Settings"}
        </h2>

        {/* Sound Settings */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
                {soundEnabled ? (
                  <img
                    src={images.soundEnabled}
                    className="text-black text-lg"
                  />
                ) : (
                  <img
                    src={images.soundDisabled}
                    className="text-gray-500 text-lg"
                  />
                )}
              </div>
              <span
                className="text-[14px] font-outfit font-regular"
                style={{ color: themeConfig.titleColor }}
              >
                Sound
              </span>
            </div>
            <label className="inline-flex items-center ">
              <input
                type="checkbox"
                className="hidden"
                checked={soundEnabled}
                onChange={() => {
                  dispatch(toggleSound());
                  if (!soundEnabled) dispatch(setSoundVolume(50));
                  else dispatch(setSoundVolume(0));
                }}
              />
              <div
                className={`w-[47px] h-[24px] flex items-center rounded-full p-1 cursor-pointer transition-all ${
                  soundEnabled ? "bg-gray-500" : "bg-gray-300"
                }`}
                style={{
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  borderColor: "#D1D5DB",
                  backgroundColor: soundEnabled
                    ? themeConfig.switchTogglerEnabledColor
                    : themeConfig.switchTogglerDisabledColor,
                }}
              >
                <motion.div
                  className={`w-[20px] h-[20px] bg-white rounded-full shadow ${
                    soundEnabled ? "translate-x-5" : ""
                  }`}
                  style={{
                    backgroundColor: soundEnabled
                      ? themeConfig.thumbEnabledColor
                      : themeConfig.thumbDisabledColor,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </label>
          </div>

          {/* Sound Volume */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="range"
              min="0"
              max="100"
              value={soundEnabled ? soundVolume : 0}
              className="w-full range-slider"
              style={{
                "--slider-fill-color": soundEnabled
                  ? themeConfig.barColor
                  : "#fff",
                "--slider-value": `${soundEnabled ? soundVolume : 0}%`,
              }}
              disabled={!soundEnabled}
              onChange={(e) =>
                dispatch(setSoundVolume(parseInt(e.target.value)))
              }
            />
          </div>
        </motion.div>

        {/* Music Settings */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
                {musicEnabled ? (
                  <img
                    src={images.musicEnabled}
                    className="text-black text-lg"
                  />
                ) : (
                  <img
                    src={images.musicDisabled}
                    className="text-gray-500 text-lg"
                  />
                )}
              </div>
              <span
                style={{ color: themeConfig.titleColor }}
                className={`text-sm font-medium`}
              >
                Music
              </span>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="hidden"
                checked={musicEnabled}
                onChange={() => {
                  dispatch(toggleMusic());
                  if (!musicEnabled) {
                    dispatch(setMusicVolume(50)); // Default volume to 50% when toggled on
                  } else {
                    dispatch(setMusicVolume(0)); // Set to 0 when toggled off
                  }
                }}
              />
              <div
                className={`w-[47px] h-[24px] flex items-center rounded-full p-1 cursor-pointer transition-all`}
                style={{
                  borderWidth: "1.5px",
                  borderStyle: "solid",
                  borderColor: "#D1D5DB",
                  backgroundColor: musicEnabled
                    ? themeConfig.switchTogglerEnabledColor
                    : themeConfig.switchTogglerDisabledColor,
                }}
              >
                <motion.div
                  className={`w-[20px] h-[20px] bg-white rounded-full shadow ${
                    musicEnabled ? "translate-x-5" : ""
                  }`}
                  style={{
                    backgroundColor: musicEnabled
                      ? themeConfig.thumbEnabledColor
                      : themeConfig.thumbDisabledColor,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </label>
          </div>

          {/* Music Volume */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="range"
              min="0"
              max="100"
              value={musicEnabled ? musicVolume : 0}
              className="w-full range-slider"
              style={{
                "--slider-fill-color": musicEnabled
                  ? themeConfig.barColor
                  : "#fff",
                "--slider-value": `${musicEnabled ? musicVolume : 0}%`,
                cursor: musicEnabled ? "pointer" : "not-allowed",
              }}
              disabled={!musicEnabled}
              onChange={(e) =>
                dispatch(setMusicVolume(parseInt(e.target.value)))
              }
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;
