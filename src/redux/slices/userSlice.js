import { createSlice } from "@reduxjs/toolkit";
// import userProfilePicture from "../assets/avatar.png";

const initialState = {
  wallet: 0,
  userDetails: {
    id: 1,
    name: "Sourabh",
    // profilePic: userProfilePicture || null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateWallet: (state, action) => {
        state.wallet = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload,
      };
    },
  },
});

export const { updateWallet, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
