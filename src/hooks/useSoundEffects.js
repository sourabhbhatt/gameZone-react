import { useEffect, useRef } from "react";

const useSoundEffects = () => {
  const soundsRef = useRef({});

  // Initialize a sound
  const initializeSound = (key, audioFile, config = {}) => {
    if (!soundsRef.current[key]) {
      const { loop = false, volume = 1, autoplay = false } = config;
      const audio = new Audio(audioFile);
      audio.loop = loop;
      audio.volume = volume;
      soundsRef.current[key] = audio;

      if (autoplay) {
        audio.play().catch((error) => {
          console.error(`Error playing audio for ${key}:`, error);
        });
      }
    }
  };

  // Play an existing sound without restarting
  const playSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound && sound.paused) {
      sound.play().catch((error) => {
        console.error(`Error playing sound for ${key}:`, error);
      });
    }
  };

  // Stop and reset a sound
  const stopSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  // Dynamically update sound properties
  const updateSound = (key, config = {}) => {
    const sound = soundsRef.current[key];
    if (sound) {
      if (config.volume !== undefined && sound.volume !== config.volume) {
        sound.volume = config.volume; // Update volume without restarting
      }
      if (config.loop !== undefined) {
        sound.loop = config.loop;
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(soundsRef.current).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
      soundsRef.current = {};
    };
  }, []);

  return {
    initializeSound,
    playSound,
    stopSound,
    updateSound,
  };
};

export default useSoundEffects;
