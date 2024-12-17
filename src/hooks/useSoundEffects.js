import { useEffect, useRef } from "react";

const useSoundEffects = () => {
  const soundsRef = useRef({});

  // Initialize or update a sound
  const initializeSound = (key, audioFile, config = {}) => {
    const { loop = false, volume = 1, autoplay = false } = config;

    if (!soundsRef.current[key]) {
      const audio = new Audio(audioFile);
      audio.loop = loop;
      audio.volume = volume;
      if (autoplay) {
        audio.play().catch((error) => {
          console.warn(`Autoplay blocked for ${key}:`, error);
        });
      }
      soundsRef.current[key] = audio;
    } else {
      // Update properties if sound already exists
      updateSound(key, config);
    }
  };

  // Play a sound if not already playing
  const playSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound && sound.paused) {
      sound.play().catch((error) => {
        console.error(`Error playing sound for ${key}:`, error);
      });
    }
  };

  // Pause a sound
  const pauseSound = (key) => {
    const sound = soundsRef.current[key];
    if (sound && !sound.paused) {
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
      if (config.volume !== undefined) sound.volume = config.volume;
      if (config.loop !== undefined) sound.loop = config.loop;
    }
  };

  const isSoundPlaying = (key) => {
    const sound = soundsRef.current[key];
    return sound && !sound.paused;
  };


  // Cleanup all sounds on unmount
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
    isSoundPlaying
  };
};

export default useSoundEffects;
