import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ticking from "./audio/click.mp3";
import { useSelector } from "react-redux";

const CountdownRevealModal = ({ isOpen, onReveal }) => {
  const [count, setCount] = useState(3);
  const { musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );

  useEffect(() => {
    if (!isOpen) return;

    let timer;
    const audio = new Audio(ticking);
    audio.volume = musicVolume / 100;

    const playTickSound = () => {
      if (musicEnabled) {
        audio.pause();
        audio.currentTime = 0;
        audio.play().catch((err) => console.error("Audio play error:", err));
      }
    };

    setCount(3);
    playTickSound();

    timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          playTickSound();
          return prevCount - 1;
        } else {
          clearInterval(timer);
          setTimeout(onReveal, 100);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isOpen, onReveal, musicEnabled, musicVolume]);

  if (!isOpen || count === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <motion.div
          key={`count-number-${count}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-[72px] font-bold leading-none"
        >
          {count}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

CountdownRevealModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onReveal: PropTypes.func.isRequired,
};

export default CountdownRevealModal;
