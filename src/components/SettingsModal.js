import React from "react";
import { FaVolumeUp, FaMusic, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSound,
  toggleMusic,
  setSoundVolume,
  setMusicVolume,
} from "../redux/slices/appSlice";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative w-80 bg-gradient-to-b from-gray-100 to-white p-6 rounded-2xl shadow-lg"
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
              <FaVolumeUp className="text-black text-lg" />
            </div>
            <span className="text-sm font-medium text-black">Sound</span>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="hidden"
              checked={soundEnabled}
              onChange={() => dispatch(toggleSound())}
            />
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                soundEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform ${
                  soundEnabled ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>

        {/* Sound Volume */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
            <FaVolumeUp className="text-black text-lg" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={soundVolume}
            className="w-full accent-green-500"
            onChange={(e) => dispatch(setSoundVolume(parseInt(e.target.value)))}
          />
        </div>

        {/* Music Settings */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
              <FaMusic className="text-black text-lg" />
            </div>
            <span className="text-sm font-medium text-black">Music</span>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="hidden"
              checked={musicEnabled}
              onChange={() => dispatch(toggleMusic())}
            />
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                musicEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform ${
                  musicEnabled ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>

        {/* Music Volume */}
        <div className="flex items-center space-x-3">
          <div className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg">
            <FaMusic className="text-black text-lg" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={musicVolume}
            className="w-full accent-green-500"
            onChange={(e) => dispatch(setMusicVolume(parseInt(e.target.value)))}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(SettingsModal);
