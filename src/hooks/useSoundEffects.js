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
      if (autoplay) {
        audio.play().catch((error) => {
          console.error(`Error playing audio for ${key}:`, error);
        });
      }
      soundsRef.current[key] = audio;
    }
  };

  // Play a sound
  const playSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound) {
      sound.play().catch((error) => {
        console.error(`Error playing sound for ${key}:`, error);
      });
    }
  };

  // Pause a sound
  const pauseSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound) {
      sound.pause();
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

  // Update sound properties dynamically
  const updateSound = (key, config = {}) => {
    const sound = soundsRef.current[key];
    if (sound) {
      if (config.volume !== undefined) {
        sound.volume = config.volume;
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
    pauseSound,
    stopSound,
    updateSound,
  };
};

export default useSoundEffects;
