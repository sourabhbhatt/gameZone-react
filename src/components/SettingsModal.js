import React from "react";
import { FaVolumeUp, FaVolumeMute, FaMusic, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSound,
  toggleMusic,
  setSoundVolume,
  setMusicVolume,
} from "../redux/slices/appSlice";
import '../App.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: "-50%", scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "-50%", scale: 0.8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-80 bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* Modal Title */}
        <h2 className="text-center text-lg font-semibold text-black mb-6">
          Settings
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
                  <FaVolumeUp className="text-black text-lg" />
                ) : (
                  <FaVolumeMute className="text-gray-500 text-lg" />
                )}
              </div>
              <span className="text-sm font-medium text-black">Sound</span>
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="hidden"
                checked={soundEnabled}
                onChange={() => {
                  dispatch(toggleSound());
                  if (!soundEnabled) {
                    dispatch(setSoundVolume(50)); // Default volume to 50% when toggled on
                  } else {
                    dispatch(setSoundVolume(0)); // Set to 0 when toggled off
                  }
                }}
              />
              <div
                className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                  soundEnabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className={`w-4 h-4 bg-white rounded-full shadow ${
                    soundEnabled ? "translate-x-5" : ""
                  }`}
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
              className={`w-full ${
                soundEnabled
                  ? "bg-gradient-to-r from-green-500 to-green-700"
                  : "bg-black cursor-not-allowed"
              }`}
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
                  <FaMusic className="text-black text-lg" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19V6l12-2v13M9 13l-4 4m0 0l-4-4m4 4V6"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-black">Music</span>
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
                className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                  musicEnabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <motion.div
                  className={`w-4 h-4 bg-white rounded-full shadow ${
                    musicEnabled ? "translate-x-5" : ""
                  }`}
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
              className={`w-full ${
                musicEnabled
                ? "bg-gradient-to-r from-green-500 to-green-700"
                : "bg-black cursor-not-allowed"              }`}
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

export default React.memo(SettingsModal);
