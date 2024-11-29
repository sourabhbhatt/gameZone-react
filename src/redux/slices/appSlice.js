import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  soundSettings: {
    soundEnabled: true,
    soundVolume: 50,
    musicEnabled: true,
    musicVolume: 50,
  },
  connectionStatus: {
    isOnline: navigator.onLine, // Initial status based on browser API
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Sound settings reducers
    toggleSound(state) {
      state.soundSettings.soundEnabled = !state.soundSettings.soundEnabled;
    },
    toggleMusic(state) {
      state.soundSettings.musicEnabled = !state.soundSettings.musicEnabled;
    },
    setSoundVolume(state, action) {
      state.soundSettings.soundVolume = action.payload;
    },
    setMusicVolume(state, action) {
      state.soundSettings.musicVolume = action.payload;
    },

    // Internet connection reducers
    setConnectionStatus(state, action) {
      state.connectionStatus.isOnline = action.payload;
    },
  },
});

export const {
  toggleSound,
  toggleMusic,
  setSoundVolume,
  setMusicVolume,
  setConnectionStatus,
} = appSlice.actions;

export default appSlice.reducer;
