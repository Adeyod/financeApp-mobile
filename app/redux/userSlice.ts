import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  // access: null,
  // token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.currentUser = action.payload;
      // console.log('CURRENT USER:', state.currentUser);
    },

    logoutSuccess(state) {
      state.currentUser = null;
    },

    updateUser(state, action) {
      state.currentUser = action.payload;
    },

    removeUser(state) {
      state.currentUser = null;
    },
  },
});

export const { updateUser, removeUser, logoutSuccess, loginSuccess } =
  userSlice.actions;

export default userSlice.reducer;
