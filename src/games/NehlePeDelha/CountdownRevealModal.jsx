import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import useSoundEffects from "../../hooks/useSoundEffects";
import { useSelector } from "react-redux";
import ticking from "./audio/click.mp3";

const CountdownRevealModal = ({ isOpen, onReveal = () => {} }) => {
  const [count, setCount] = useState(3);
  const { soundEnabled, soundVolume, musicEnabled, musicVolume } = useSelector(
    (state) => state.app.soundSettings
  );
  const { initializeSound, playSound, updateSound, stopSound } =
    useSoundEffects();

  useEffect(() => {
    initializeSound("ticking", ticking, {
      volume: soundVolume / 100,
      loop: true,
    });
  }, [initializeSound]);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setCount(3);
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer);
            onReveal();
            return 0;
          }
          playSound("ticking");
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      stopSound("ticking");
    };
  }, [isOpen, onReveal]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative flex flex-col items-center justify-center  rounded-3xl p-6 w-[90%] max-w-sm">
          <p className="text-[#040404] font-semibold text-3xl mb-6">
            Revealing card in
          </p>
          <div className="flex items-center justify-center mb-6">
            <motion.div
              key={`count-number-${count}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="text-[#040404] text-[72px] font-bold leading-none">
                {count}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

CountdownRevealModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onReveal: PropTypes.func.isRequired,
};

export default CountdownRevealModal;
