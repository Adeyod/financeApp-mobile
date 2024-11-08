import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountDetails: null,
  singleAccountDetails: null,
};

// console.log('ACCOUNT SLICE:', initialState.accountDetails);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getAccountsSuccess(state, action) {
      const accountDetails = action.payload;

      state.accountDetails = accountDetails;

      // console.log('accountDetails', accountDetails);
    },

    getSingleAccountSuccess(state, action) {
      const singleAccountDetails = action.payload;
      state.singleAccountDetails = singleAccountDetails;
    },

    clearAccounts(state) {
      state.accountDetails = null;
      state.singleAccountDetails = null;
    },
  },
});

export const { getSingleAccountSuccess, getAccountsSuccess, clearAccounts } =
  accountSlice.actions;

export default accountSlice.reducer;
