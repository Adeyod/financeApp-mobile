import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access: null,
  token: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAuthSuccess(state, action) {
      const { access, token } = action.payload;

      state.access = access;
      state.token = token;
    },

    logoutAuthSuccess(state) {
      state.token = null;
      state.access = null;
    },

    removeAuthUser(state) {
      state.access = null;
      state.token = null;
    },
  },
});

export const { removeAuthUser, logoutAuthSuccess, loginAuthSuccess } =
  authSlice.actions;

export default authSlice.reducer;
