import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionDetails: [],
  singleTransactionDetails: [],
  totalTransactionsCount: null,
  singleAccountTransactionDetails: null,
  singleAccountCompletedTransactionsCount: null,
  singleAccountTotalTransactionsCount: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getSingleTransactionSuccess(state, action) {
      state.singleTransactionDetails = action.payload;
    },

    getSingleAccountTransactionsSuccess(state, action) {
      const { transactions, completed_transactions, totalCount } =
        action.payload;

      state.singleAccountTransactionDetails = transactions;
      state.singleAccountCompletedTransactionsCount = completed_transactions;
      state.singleAccountTotalTransactionsCount = totalCount;

      console.log('SLICE transactions:', state.singleAccountTransactionDetails);
      console.log(
        'SLICE completed_transactions:',
        state.singleAccountCompletedTransactionsCount
      );
      console.log(
        'SLICE totalCount:',
        state.singleAccountTotalTransactionsCount
      );
    },

    getTransactionsSuccess(state, action) {
      const transactionDetails = action.payload;
      state.transactionDetails = transactionDetails.transactions;
      state.totalTransactionsCount = transactionDetails.totalCount;
    },

    clearTransactions(state) {
      state.transactionDetails = [];
      state.totalTransactionsCount = null;
      state.singleAccountTransactionDetails = null;
      state.singleTransactionDetails = [];
      state.singleAccountCompletedTransactionsCount = null;
      state.singleAccountTotalTransactionsCount = null;
    },
  },
});

export const {
  getSingleTransactionSuccess,
  clearTransactions,
  getSingleAccountTransactionsSuccess,
  getTransactionsSuccess,
} = transactionSlice.actions;

export default transactionSlice.reducer;
